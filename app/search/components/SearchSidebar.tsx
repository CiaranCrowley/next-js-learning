import { Cuisine, Location } from "@prisma/client";
import React from "react";

export default function SearchSidebar({
	location,
	cuisine,
}: {
	location: Location[];
	cuisine: Cuisine[];
}) {
	console.log(location);
	return (
		<div className="w-1/5">
			<div className="border-b pb-4">
				<h1 className="mb-2">Region</h1>
				{location.map((location) => (
					<p className="text-reg font-light capitalize" key={location.id}>
						{location.name}
					</p>
				))}
			</div>
			<div className="mt-3 border-b pb-4">
				<h1 className="mb-2">Cuisine</h1>
				{cuisine.map((cuisine) => (
					<p className="text-reg font-light capitalize" key={cuisine.id}>
						{cuisine.name}
					</p>
				))}
			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					<button className="text-reg w-full rounded-l border p-2 font-light">
						$
					</button>
					<button className="text-reg w-full border-b border-r border-t p-2 font-light">
						$$
					</button>
					<button className="text-reg w-full rounded-r border-b border-r border-t p-2 font-light">
						$$$
					</button>
				</div>
			</div>
		</div>
	);
}
