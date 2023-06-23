import React from "react";
import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationsCard from "./components/ReservationsCard";

export default function RestaurantDetails() {
	return (
		<>
			<div className="w-[70%] rounded bg-white p-3 shadow">
				<RestaurantNavBar />
				<Title />
				<Rating />
				<Description />
				<Images />
				<Reviews />
			</div>
			<div className="text-reg relative w-[27%]">
				<ReservationsCard />
			</div>
		</>
	);
}
