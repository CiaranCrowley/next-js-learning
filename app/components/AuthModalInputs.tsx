"use client";

import React from "react";

interface Props {
	inputs: {
		first_name: string;
		last_name: string;
		email: string;
		phone: string;
		city: string;
		password: string;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isSignedIn: boolean;
}

export default function AuthModalInputs({
	inputs,
	handleChange,
	isSignedIn,
}: Props) {
	return (
		<div>
			{isSignedIn ? null : (
				<div className="just-between my-3 flex text-sm">
					<input
						type="text"
						className="mr-1 w-[50%] rounded border p-2 py-3"
						placeholder="First Name"
						value={inputs.first_name}
						onChange={handleChange}
						name="first_name"
					/>
					<input
						type="text"
						className="w-[50%] rounded border p-2 py-3"
						placeholder="Last Name"
						value={inputs.last_name}
						onChange={handleChange}
						name="last_name"
					/>
				</div>
			)}
			<div className="just-between my-3 flex text-sm">
				<input
					type="email"
					className="w-full rounded border p-2 py-3"
					placeholder="Email"
					value={inputs.email}
					onChange={handleChange}
					name="email"
				/>
			</div>

			{isSignedIn ? null : (
				<div className="just-between my-3 flex text-sm">
					<input
						type="text"
						className="mr-1 w-[50%] rounded border p-2 py-3"
						placeholder="Phone"
						value={inputs.phone}
						onChange={handleChange}
						name="phone"
					/>
					<input
						type="text"
						className="w-[50%] rounded border p-2 py-3"
						placeholder="City"
						value={inputs.city}
						onChange={handleChange}
						name="city"
					/>
				</div>
			)}
			<div className="just-between my-3 flex text-sm">
				<input
					type="password"
					className="w-full rounded border p-2 py-3"
					placeholder="Password"
					value={inputs.password}
					onChange={handleChange}
					name="password"
				/>
			</div>
		</div>
	);
}
