"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "@/hooks/useAuth";

export default function NavBar() {
	const { data, loading } = useContext(AuthenticationContext);
	const { signOut } = useAuth();

	return (
		<nav className="flex justify-between bg-white p-2">
			<Link href="/" className="text-2xl font-bold text-gray-700">
				OpenTable
			</Link>
			<div>
				{loading ? null : (
					<div className="flex">
						{data ? (
							<button
								className="mr-3 rounded border bg-blue-400 p-1  px-4 text-white"
								onClick={signOut}
							>
								Sign out
							</button>
						) : (
							<>
								<AuthModal isSignedIn={true} />
								<AuthModal isSignedIn={false} />
							</>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}
