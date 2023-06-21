import React from "react";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantMenu from "../components/RestaurantMenu";

export default function Menu() {
	return (
		<>
			
				<div className="bg-white w-[100%] rounded p-3 shadow">
					<RestaurantNavBar />
					<RestaurantMenu />
				</div>
			
		</>
	);
}
