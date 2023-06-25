"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const router = useRouter();
	const [location, setLocation] = useState("");

	const something = (event: { keyCode: number }) => {
		if (event.keyCode === 13) {
			if (location === "") return;
			router.push(`/search?city=${location}`);
			setLocation("");
		}
	};

	return (
		<div className="m-auto flex justify-center py-3 text-left text-lg">
			<input
				id="search-bar-input"
				className="mr-3  w-[450px] rounded p-2"
				type="text"
				placeholder="State, city or town"
				value={location}
				onChange={(e) => {
					setLocation(e.target.value);
					console.log(e.target.value);
				}}
				onKeyDown={(e) => something(e)}
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
