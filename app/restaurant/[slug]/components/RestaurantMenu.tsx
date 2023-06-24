import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

export default function RestaurantMenu({ menu }: { menu: Item[] }) {
	return (
		<main className="mt-5 bg-white">
			<div>
				<div className="mb-1 mt-4 pb-1">
					<h1 className="text-4xl font-bold">Menu</h1>
				</div>

				{menu.length ? (
					<div className="flex flex-wrap justify-between">
						{menu.map((item) => (
							<MenuCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<p>This restaurant does not have a menu.</p>
				)}
			</div>
		</main>
	);
}
