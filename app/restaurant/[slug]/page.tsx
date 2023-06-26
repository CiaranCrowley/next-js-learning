import React from "react";
import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationsCard from "./components/ReservationsCard";
import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
	id: number;
	name: string;
	description: string;
	images: string[];
	slug: string;
	reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			slug: true,
			reviews: true,
		},
	});

	if (!restaurant) throw new Error("Cannot find restaurant");

	return restaurant;
};

export default async function RestaurantDetails({
	params,
}: {
	params: { slug: string };
}) {
	const restaurant = await fetchRestaurantBySlug(params.slug);
	// console.log(restaurant);

	return (
		<>
			<div className="w-[70%] rounded bg-white p-3 shadow">
				<RestaurantNavBar slug={restaurant.slug} />
				<Title name={restaurant.name} />
				<Rating reviews={restaurant.reviews} />
				<Description desc={restaurant.description} />
				<Images images={restaurant.images} />
				<Reviews reviews={restaurant.reviews} />
			</div>
			<div className="text-reg relative w-[27%]">
				<ReservationsCard />
			</div>
		</>
	);
}
