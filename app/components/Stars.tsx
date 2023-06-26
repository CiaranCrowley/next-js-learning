import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { reviewRatingAvg } from "@/utils/reviewRatingAvg";
import React from "react";

export default function Stars({
	reviews,
	rating,
}: {
	reviews: Review[];
	rating?: number;
}) {
	const reviewRating = rating || reviewRatingAvg(reviews);

	const renderStars = () => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			const difference = parseFloat((reviewRating - i).toFixed());
			if (difference >= 1) {
				stars.push(fullStar);
			} else if (difference < 1 && difference > 0) {
				if (difference <= 0.2) {
					stars.push(emptyStar);
				} else if (difference > 0.2 && difference <= 0.6) {
					stars.push(halfStar);
				} else stars.push(fullStar);
			} else stars.push(emptyStar);
		}

		return stars.map((star) => (
			<Image src={star} alt="" className="mr-1 h-4 w-4" />
		));
	};

	return <div className="flex items-center">{renderStars()}</div>;
}
