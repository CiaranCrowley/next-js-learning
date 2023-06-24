import Price from "@/app/components/Price";
import { Cuisine, ITEM_Price, Location } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Restaurant {
	id: number;
	name: string;
	main_img: string;
	price: ITEM_Price;
	cuisine: Cuisine;
	location: Location;
	slug: string;
}

export default function RestaurantCard({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
	return (
		<div className="flex border-b p-5">
			<img src={restaurant.main_img} alt="" className="h-36 w-44 rounded" />
			<div className="pl-5">
				<h2 className="text-3xl">{restaurant.name}</h2>
				<div className="flex items-start">
					<div className="mb-2 flex">*****</div>
					<p className="ml-2 text-sm">Awesome</p>
				</div>
				<div className="mb-9">
					<div className="text-reg flex font-light">
						<Price price={restaurant.price} />
						<p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
						<p className="mr-4 capitalize">{restaurant.location.name}</p>
					</div>
				</div>
				<div className="text-red-600 hover:underline">
					<Link href={`/restaurant/${restaurant.slug}`}>
						View more information
					</Link>
				</div>
			</div>
		</div>
	);
}
