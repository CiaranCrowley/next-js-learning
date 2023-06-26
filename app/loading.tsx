import React from "react";
import Header from "./components/Header";

export default function Loading() {
	return (
		<main>
			<Header />
			<div className="mt-10 flex flex-wrap justify-center px-36 py-3">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
					<div
						key={num}
						className="m-3 h-72 w-64 animate-pulse cursor-pointer overflow-hidden rounded border bg-slate-200"
					></div>
				))}
			</div>
		</main>
	);
}
