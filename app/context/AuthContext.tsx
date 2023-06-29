"use client";

import React, { useState, createContext } from "react";

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
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
		loading: false,
		data: null,
		error: null,
	});

	return (
		<AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
