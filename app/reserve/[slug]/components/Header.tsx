import { displayTimes, Time } from "@/utils/displayTimes";
import { format } from "date-fns";
import React from "react";

export default function Header({
	image,
	name,
	date,
	people,
}: {
	image: string;
	name: string;
	date: string;
	people: string;
}) {
	const [day, time] = date.split("T");

	return (
		<div>
			<h3 className="font-bold">You're almost done!</h3>
			<div className="mt-5 flex">
				<img src={image} alt="" className="h-18 w-32 rounded" />
				<div className="ml-4">
					<h1 className="text-3xl font-bold">{name}</h1>
					<div className="mt-3 flex">
						<p className="mr-6">{format(new Date(date), "ccc, LLL d")}</p>
						<p className="mr-6">{displayTimes(time as Time)}</p>
						<p className="mr-6">
							{people} {parseInt(people) === 1 ? "person" : "people"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
