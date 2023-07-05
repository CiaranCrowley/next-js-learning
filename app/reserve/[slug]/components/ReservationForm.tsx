"use client";

import React, { useEffect, useState } from "react";

export default function ReservationForm() {
	const [disabled, setDisabled] = useState(true);
	const [inputs, setInputs] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		occasion: "",
		requests: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		if (inputs.first_name && inputs.last_name && inputs.phone && inputs.email) {
			return setDisabled(false)
		} else return setDisabled(true)
	}, [inputs]);

	return (
		<div className="mt-10 flex w-[660px] flex-wrap justify-between">
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="First name"
				name="first_name"
				value={inputs.first_name}
				onChange={handleChange}
			/>
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="Last name"
				name="last_name"
				value={inputs.last_name}
				onChange={handleChange}
			/>
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="Phone number"
				name="phone"
				value={inputs.phone}
				onChange={handleChange}
			/>
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="Email"
				name="email"
				value={inputs.email}
				onChange={handleChange}
			/>
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="Occasion (optional)"
				name="occasion"
				value={inputs.occasion}
				onChange={handleChange}
			/>
			<input
				type="text"
				className="mb-4 w-80 rounded border p-3"
				placeholder="Requests (optional)"
				name="requests"
				value={inputs.requests}
				onChange={handleChange}
			/>
			<button disabled={disabled} className="w-full rounded bg-red-600 p-3 font-bold text-white disabled:bg-gray-300">
				Complete reservation
			</button>
			<p className="mt-4 text-sm">
				By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Standard text message
				rates may apply. You may opt out of receiving text messages at any time.
			</p>
		</div>
	);
}
