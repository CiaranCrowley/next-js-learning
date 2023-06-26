"use client";

import Image from "next/image";
import errorImage from "../../public/icons/error.png";

export default function NotFound({ error }: { error: Error }) {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-200">
			<Image src={errorImage} alt="error" className="mb-8 w-56" />
			<div className="rounded bg-white px-9 py-14 shadow">
				<h3 className="text-3xl font-bold">Something went wrong...</h3>
				<p className="text-reg font-bold">
					We couldn't find that restaurant
				</p>
				<p className="mt-6 text-sm font-light">Error Code: 404</p>
			</div>
		</div>
	);
}
