"use client";

import React from "react";

export default function AuthModalInputs() {
	return (
		<div>
			<div className="just-between my-3 flex text-sm">
				<input
					type="text"
					className="mr-1 w-[50%] rounded border p-2 py-3"
					placeholder="First Name"
				/>
				<input
					type="text"
					className="w-[50%] rounded border p-2 py-3"
					placeholder="Last Name"
				/>
			</div>
			<div className="just-between my-3 flex text-sm">
				<input
					type="email"
					className="w-full rounded border p-2 py-3"
					placeholder="Email"
				/>
			</div>
			<div className="just-between my-3 flex text-sm">
				<input
					type="text"
					className="mr-1 w-[50%] rounded border p-2 py-3"
					placeholder="Phone"
				/>
				<input
					type="text"
					className="w-[50%] rounded border p-2 py-3"
					placeholder="City"
				/>
			</div>
			<div className="just-between my-3 flex text-sm">
				<input
					type="password"
					className="w-full rounded border p-2 py-3"
					placeholder="Password"
				/>
			</div>
		</div>
	);
}
