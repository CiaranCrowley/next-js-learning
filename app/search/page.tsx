import React from "react";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";
import { ITEM_Price, PrismaClient } from "@prisma/client";

export const metadata = {
	title: "Search | OpenTable",
	description: "4321",
};
interface SearchParams {
	city?: string;
	cuisine?: string;
	price?: ITEM_Price;
}

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
	const where: any = {};

	if (searchParams.city) {
		const location = {
			name: {
				equals: searchParams.city.toLowerCase(),
			},
		};
		where.location = location;
	}
	if (searchParams.cuisine) {
		const cuisine = {
			name: {
				equals: searchParams.cuisine.toLowerCase(),
			},
		};
		where.cuisine = cuisine;
	}
	if (searchParams.price) {
		const price = {
			equals: searchParams.price,
		};
		where.price = price;
	}

	const select = {
		id: true,
		name: true,
		main_img: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true,
		reviews: true,
	};

	return prisma.restaurant.findMany({
		where,
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
	searchParams: SearchParams;
}) {
	const restaurants = await fetchRestaurantsByCity(searchParams);
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
