import React from "react";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";
import { ITEM_Price, PrismaClient } from "@prisma/client";

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

const fetchLocations = async () => {
	return prisma.location.findMany();
};

const fetchCuisines = async () => {
	return prisma.cuisine.findMany();
};

export default async function Search({
	searchParams,
}: {
	searchParams: { city?: string; cuisine?: string; price?: ITEM_Price };
}) {
	const restaurants = await fetchRestaurantsByCity(searchParams.city);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className="m-auto flex w-2/3 items-start justify-between py-4">
				<SearchSidebar
					location={locations}
					cuisine={cuisines}
					searchParams={searchParams}
				/>
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
