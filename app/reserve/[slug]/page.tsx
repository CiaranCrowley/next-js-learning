import React from "react";
import Header from "./components/Header";
import ReservationForm from "./components/ReservationForm";

export const metadata = {
	title: "Reserve | OpenTable",
	description: "4321",
};

export default function Reserve() {
	return (
		<div className="h-screen border-t">
			<div className="m-auto w-3/5 py-9">
				<Header />
				<ReservationForm />
			</div>
		</div>
	);
}
