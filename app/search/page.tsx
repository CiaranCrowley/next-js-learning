import React from "react";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";

export const metadata = {
	title: "Search | OpenTable",
	description: "4321",
};

export default function Search() {
	return (
		<>
			<Header />
			<div className="m-auto flex w-2/3 items-start justify-between py-4">
				<SearchSidebar />
				<div className="w-5/6">
					<RestaurantCard />
				</div>
			</div>
		</>
	);
}
