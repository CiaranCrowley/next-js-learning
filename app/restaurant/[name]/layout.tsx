import React from "react";
import Header from "./components/Header";

export const metadata = {
	title: "Restaurant name | OpenTable",
	description: "4321",
};

export default function RestaurantLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<Header />
			<div className="0 m-auto -mt-11 flex w-2/3 items-start justify-between">
				{children}
			</div>
		</main>
	);
}
