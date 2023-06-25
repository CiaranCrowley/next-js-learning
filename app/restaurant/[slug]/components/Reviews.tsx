import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }: { reviews: Review[] }) {
	return (
		<div>
			<h1 className="mb-7 mt-10 border-b pb-5 text-3xl font-bold">
				What {reviews.length}
				{reviews.length > 1 ? " people are " : " person is "}
				saying
			</h1>
			<div>
				{reviews.map((review) => (
					<ReviewCard review={review} />
				))}
			</div>
		</div>
	);
}
