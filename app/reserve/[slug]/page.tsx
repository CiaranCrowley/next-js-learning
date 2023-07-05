import React from "react";
import Header from "./components/Header";
import ReservationForm from "./components/ReservationForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Reserve | OpenTable",
	description: "4321",
};

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
	const response = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
	});

	if (!response) {
		return notFound();
	}

	return response;
};

export default async function Reserve({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { data: string; partySize: string };
}) {
	const restaurant = await fetchRestaurantBySlug(params.slug);

	return (
		<div className="h-screen border-t">
			<div className="m-auto w-3/5 py-9">
				<Header
					image={restaurant.main_img}
					name={restaurant.name}
					date={searchParams.data}
					people={searchParams.partySize}
				/>
				<ReservationForm
					slug={params.slug}
					date={searchParams.data}
					partySize={searchParams.partySize}
				/>
			</div>
		</div>
	);
}
