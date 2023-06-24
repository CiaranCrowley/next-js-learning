"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const router = useRouter();
	const [location, setLocation] = useState("");

	return (
		<div className="m-auto flex justify-center py-3 text-left text-lg">
			<input
				className="mr-3  w-[450px] rounded p-2"
				type="text"
				placeholder="State, city or town"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
			/>
			<button
				className="rounded bg-red-600 px-9 py-2 text-white"
				onClick={() => {
					if (location === "") return;
					router.push(`/search?city=${location}`);
					setLocation("");
				}}
			>
				Let's go
			</button>
		</div>
	);
}
