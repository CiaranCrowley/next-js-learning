import { reviewRatingAvg } from "@/utils/reviewRatingAvg";
import { Review } from "@prisma/client";
import React from "react";

export default function Rating({ reviews }: { reviews: Review[] }) {
	return (
		<div className="flex items-end">
			<div className="ratings mt-2 flex items-center">
				<p className="text-reg">{reviewRatingAvg(reviews).toFixed(1)}</p>
			</div>
			<div>
				<p className="text-reg ml-4">
					{reviews.length}
					{reviews.length > 1 ? " Reviews" : " Review"}
				</p>
			</div>
		</div>
	);
}
