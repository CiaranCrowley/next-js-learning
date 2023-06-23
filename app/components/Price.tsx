import { ITEM_Price } from "@prisma/client";
import React from "react";
import { render } from "react-dom";

export default function Price({ price }: { price: ITEM_Price }) {
	const renderPrice = () => {
		if (price === ITEM_Price.CHEAP) {
			return (
				<>
					<span>$$</span> <span className="text-gray-400">$$</span>
				</>
			);
		} else if (price === ITEM_Price.REGULAR) {
			return (
				<>
					<span>$$$</span> <span className="text-gray-400">$</span>
				</>
			);
		} else if (price === ITEM_Price.EXPENSIVE) {
			return (
				<>
					<span>$$$$</span>
				</>
			);
		}
	};

	return <p className="mr-3 flex">{renderPrice()}</p>;
}
