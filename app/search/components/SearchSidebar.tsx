import { Cuisine, ITEM_Price, Location } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function SearchSidebar({
	location,
	cuisine,
	searchParams,
}: {
	location: Location[];
	cuisine: Cuisine[];
	searchParams: { city?: string; cuisine?: string; price?: ITEM_Price };
}) {
	const prices = [
		{
			price: ITEM_Price.CHEAP,
			label: "$",
			className:
				"text-reg w-full text-center rounded-l border p-2 font-light",
		},
		{
			price: ITEM_Price.REGULAR,
			label: "$$",
			className:
				"text-reg w-full text-center border-b border-r border-t p-2 font-light",
		},
		{
			price: ITEM_Price.EXPENSIVE,
			label: "$$$",
			className:
				"text-reg w-full text-center rounded-r border-b border-r border-t p-2 font-light",
		},
	];

	return (
		<div className="w-1/5">
			<div className="border-b pb-4">
				<h1 className="mb-2">Region</h1>
				{location.map((location) => (
					<Link
						className="text-reg flex flex-col font-light capitalize"
						key={location.id}
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								city: location.name,
							},
						}}
					>
						{location.name}
					</Link>
				))}
			</div>
			<div className="mt-3 border-b pb-4">
				<h1 className="mb-2">Cuisine</h1>
				{cuisine.map((cuisine) => (
					<Link
						className="text-reg flex flex-col font-light capitalize"
						key={cuisine.id}
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								cuisine: cuisine.name,
							},
						}}
					>
						{cuisine.name}
					</Link>
				))}
			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					{prices.map(({ price, label, className }) => (
						<Link
							className={className}
							href={{
								pathname: "/search",
								query: {
									...searchParams,
									price,
								},
							}}
						>
							{label}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
