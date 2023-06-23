import React from "react";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantMenu from "../components/RestaurantMenu";

export const metadata = {
	title: "Menu | OpenTable",
	description: "4321",
};

export default function Menu() {
	return (
		<>
			<div className="w-[100%] rounded bg-white p-3 shadow">
				<RestaurantNavBar />
				<RestaurantMenu />
			</div>
		</>
	);
}
