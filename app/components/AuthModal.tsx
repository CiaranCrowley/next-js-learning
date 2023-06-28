"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({ isSignedIn }: { isSignedIn: boolean }) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [inputs, setInputs] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		city: "",
		password: "",
	});

	useEffect(() => {
		if (isSignedIn) {
			if (inputs.password && inputs.email) {
				return setDisabled(false);
			}
		} else {
			if (
				inputs.first_name &&
				inputs.last_name &&
				inputs.email &&
				inputs.phone &&
				inputs.city &&
				inputs.password
			) {
				return setDisabled(false);
			}
		}
		setDisabled(true);
	}, [inputs]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const renderContent = (signInContent: string, signOutContent: string) => {
		return isSignedIn ? signInContent : signOutContent;
	};

	return (
		<div>
			<button
				className={`${renderContent(
					"bg-blue-400 text-white",
					""
				)} mr-3 rounded border  p-1 px-4 `}
				onClick={handleOpen}
			>
				{renderContent("Sign In", "Sign up")}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="h-[600px] p-2">
						<div className="mb-2 border-b pb-2 text-center font-bold uppercase">
							<p className="text sm">
								{renderContent("Sign In", "Create Account")}
							</p>
						</div>
						<div className="m-auto">
							<h2 className="text-center text-2xl font-light">
								{renderContent(
									"Log in",
									"Create Your OpenTable Account"
								)}
							</h2>
							<AuthModalInputs
								inputs={inputs}
								handleChange={handleChangeInput}
								isSignedIn={isSignedIn}
							/>
							<button
								className="mb-5 w-full rounded bg-red-600 p-3 text-sm uppercase text-white disabled:bg-gray-400"
								disabled={disabled}
							>
								{renderContent("Sign in", "Create Account")}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
