import React from "react";
import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
	restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
	return (
		<Link href={`/restaurant/${restaurant.slug}`}>
			<div className="m-3 h-72 w-64 cursor-pointer overflow-hidden rounded border">
				<img src={restaurant.main_img} alt="" className="h-36 w-full" />
				<div className="p-1">
					<h3 className="mb-2 text-2xl font-bold">{restaurant.name}</h3>
					<div className="flex items-start">
						<Stars reviews={restaurant.reviews} />
						<p className="ml-2">
							{restaurant.reviews.length} review
							{restaurant.reviews.length > 1 ? "s" : ""}
						</p>
					</div>
					<div className="text-reg flex font-light capitalize">
						<p className=" mr-3">{restaurant.cuisine.name}</p>
						<Price price={restaurant.price} />
						<p>{restaurant.location.name}</p>
					</div>
					<p className="mt-1 text-sm font-bold">Booked 3 times today</p>
				</div>
			</div>
		</Link>
	);
}
