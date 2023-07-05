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
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Restaurant {
	id: number;
	name: string;
	description: string;
	open_time: string;
	close_time: string;
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
			open_time: true,
			close_time: true,
		},
	});

	if (!restaurant) notFound();

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
				<ReservationsCard
					open_time={restaurant.open_time}
					close_time={restaurant.close_time}
					slug={restaurant.slug}
				/>
			</div>
		</>
	);
}
