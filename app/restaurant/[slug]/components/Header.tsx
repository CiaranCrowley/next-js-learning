import React from "react";

export default function Header({ name }: { name: string }) {
	const renderName = () => {
		const nameArray = name.split("-");

		nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;

		return nameArray.join(" ");
	};

	return (
		<div className="h-96 overflow-hidden">
			<div className="flex h-full items-center justify-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] bg-center">
				<h1 className="text-shadow text-center text-7xl capitalize text-white">
					{renderName()}
				</h1>
			</div>
		</div>
	);
}
