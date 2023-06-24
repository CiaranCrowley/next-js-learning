import React from "react";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantMenu from "../components/RestaurantMenu";
import { PrismaClient } from "@prisma/client";

export const metadata = {
	title: "Menu | OpenTable",
	description: "4321",
};

const prisma = new PrismaClient();

const fetchMenu = async (slug: string) => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			items: true,
		},
	});

	if (!restaurant) throw new Error();

	return restaurant.items;
};

export default async function Menu({ params }: { params: { slug: string } }) {
	const menu = await fetchMenu(params.slug);
	// console.log(menu);

	return (
		<>
			<div className="w-[100%] rounded bg-white p-3 shadow">
				<RestaurantNavBar slug={params.slug} />
				<RestaurantMenu menu={menu}/>
			</div>
		</>
	);
}
