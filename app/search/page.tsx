import React from "react";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

export const metadata = {
	title: "Search | OpenTable",
	description: "4321",
};

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string | undefined) => {
	const select = {
		id: true,
		name: true,
		main_img: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true,
	};

	if (!city) return prisma.restaurant.findMany({ select });

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: city.toLowerCase(),
				},
			},
		},
		select,
	});
};

export default async function Search({
	searchParams,
}: {
	searchParams: { city: string };
}) {
	const restaurants = await fetchRestaurantsByCity(searchParams.city);

	return (
		<>
			<Header />
			<div className="m-auto flex w-2/3 items-start justify-between py-4">
				<SearchSidebar />
				<div className="ml-4 w-5/6">
					{restaurants.length ? (
						<>
							{restaurants.map((restaurant) => (
								<RestaurantCard restaurant={restaurant} />
							))}
						</>
					) : (
						<p>There are no restaurant in {searchParams.city}</p>
					)}
				</div>
			</div>
		</>
	);
}
