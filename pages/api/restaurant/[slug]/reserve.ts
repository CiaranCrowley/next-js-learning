import { findTables } from "@/services/restaurant/findTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug, day, time, partySize } = req.query as {
		slug: string;
		day: string;
		time: string;
		partySize: string;
	};

	const restaurant = await prisma.restaurant.findUnique({
		where: { slug },
		select: {
			tables: true,
			open_time: true,
			close_time: true,
		},
	});

	if (!restaurant) {
		return res.status(400).json({
			errorMessage: "Restaurant not found",
		});
	}

	if (
		new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
		new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
	) {
		return res.status(400).json({
			errorMessage: "Restaurant is not open at that time",
		});
	}

	const searchTimesWithTables = await findTables({
		day,
		time,
		res,
		restaurant,
	});

	if (!searchTimesWithTables) {
		return res.status(400).json({
			errorMessage: "Invalid data provided",
		});
	}

	const searchTimeWthTables = searchTimesWithTables.find((t) => {
		return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
	});

	if (!searchTimeWthTables) {
		return res.status(400).json({
			errorMessage: "Nothing is available, cannot book",
		});
	}

	const tablesCount: {
		2: number[];
		4: number[];
	} = { 2: [], 4: [] };

	searchTimeWthTables.tables.forEach((table) => {
		if (table.seats === 2) {
			tablesCount[2].push(table.id);
		} else {
			tablesCount[4].push(table.id);
		}
	});

	const tableToBooks: number[] = [];
	let seatsRemaining = parseInt(partySize);

	while (seatsRemaining > 0) {
		if (seatsRemaining >= 3) {
			if (tablesCount[4].length) {
				tableToBooks.push(tablesCount[4][0]);
				tablesCount[4].shift();
				seatsRemaining = seatsRemaining - 4;
			} else {
				tableToBooks.push(tablesCount[2][0]);
				tablesCount[2].shift();
				seatsRemaining = seatsRemaining - 2;
			}
		} else {
			if (tablesCount[2].length) {
				tableToBooks.push(tablesCount[2][0]);
				tablesCount[2].shift();
				seatsRemaining = seatsRemaining - 2;
			} else {
				tableToBooks.push(tablesCount[4][0]);
				tablesCount[4].shift();
				seatsRemaining = seatsRemaining - 4;
			}
		}
	}

	return res.json({ tableToBooks });
}

// http://localhost:8090/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-02-03&time=15:00:00.000Z&partySize=8
