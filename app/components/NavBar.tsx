import React from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";

export default function NavBar() {
	return (
		<nav className="flex justify-between bg-white p-2">
			<Link href="/" className="text-2xl font-bold text-gray-700">
				OpenTable
			</Link>
			<div>
				<div className="flex">
					<AuthModal isSignedIn={true} />
					<AuthModal isSignedIn={false} />
				</div>
			</div>
		</nav>
	);
}
