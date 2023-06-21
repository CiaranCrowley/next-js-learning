import Link from 'next/link';
import React from 'react';

export default function RestaurantNavBar() {
	return (
		<nav className="flex text-reg border-b pb-2">
			<Link href="/restaurant/name" className="mr-7">
				Overview
			</Link>
			<Link href="/restaurant/name/menu" className="mr-7">
				Menu
			</Link>
		</nav>
	);
}