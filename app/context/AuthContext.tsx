"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	city: string;
}

interface State {
	loading: boolean;
	data: User | null;
	error: string | null;
}

interface AuthState extends State {
	setAuthState: React.Dispatch<State>;
}

export const AuthenticationContext = createContext<AuthState>({
	loading: false,
	data: null,
	error: null,
	setAuthState: () => {},
});

export default function AuthContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [authState, setAuthState] = useState<State>({
		loading: true,
		data: null,
		error: null,
	});

	const fetchUser = async () => {
		setAuthState({
			loading: true,
			data: null,
			error: null,
		});

		try {
			const jwt = getCookie("jwt");

			if (!jwt) {
				return setAuthState({
					loading: false,
					data: null,
					error: null,
				});
			}

			const response = await axios.get("http://localhost:8090/api/auth/me", {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

			setAuthState({
				loading: false,
				data: response.data,
				error: null,
			});
		} catch (error: any) {
			setAuthState({
				loading: false,
				data: null,
				error: error.response.data.errorMessage,
			});
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
