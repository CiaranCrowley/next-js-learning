import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { reviewRatingAvg } from "@/utils/reviewRatingAvg";
import { Cuisine, ITEM_Price, Location, Review } from "@prisma/client";
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
	reviews: Review[];
}

export default function RestaurantCard({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
	const ratingText = () => {
		const rating = reviewRatingAvg(restaurant.reviews);

		if (rating > 4) return "Awesome";
		else if (rating <= 4 && rating > 3) return "Good";
		else if (rating <= 3 && rating > 0) return "Average";
		else "";
	};

	return (
		<div className="flex border-b p-5">
			<img src={restaurant.main_img} alt="" className="h-36 w-44 rounded" />
			<div className="pl-5">
				<h2 className="text-3xl">{restaurant.name}</h2>
				<div className="flex items-start">
					<div className="mb-2 flex">
						<Stars reviews={restaurant.reviews} />
					</div>
					<p className="ml-2 text-sm">{ratingText()}</p>
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
