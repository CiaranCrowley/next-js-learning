import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import {
	PrismaClient,
	Cuisine,
	Location,
	ITEM_Price,
	Review,
} from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType {
	id: number;
	name: string;
	main_img: string;
	cuisine: Cuisine;
	location: Location;
	price: ITEM_Price;
	slug: string;
	reviews: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_img: true,
			cuisine: true,
			slug: true,
			location: true,
			price: true,
			reviews: true,
		},
	});

	return restaurants;
};

export default async function Home() {
	const restaurants = await fetchRestaurants();

	// console.log({ restaurants });

	return (
		<main>
			<Header />
			<div className="mt-10 flex flex-wrap justify-center px-36 py-3">
				{restaurants.map((restaurant) => (
					<RestaurantCard restaurant={restaurant} />
				))}
			</div>
		</main>
	);
}
