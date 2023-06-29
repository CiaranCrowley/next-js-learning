import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
	const { setAuthState } = useContext(AuthenticationContext);

	const signIn = async (
		{
			email,
			password,
		}: {
			email: string;
			password: string;
		},
		handleClose: () => void
	) => {
		setAuthState({
			loading: true,
			data: null,
			error: null,
		});

		try {
			const response = await axios.post(
				"http://localhost:8090/api/auth/signin",
				{
					email,
					password,
				}
			);
			setAuthState({
				loading: false,
				data: response.data,
				error: null,
			});
			handleClose();
		} catch (error: any) {
			setAuthState({
				loading: false,
				data: null,
				error: error.response.data.errorMessage,
			});
		}
	};

	const signUp = async (
		{
			first_name,
			last_name,
			email,
			password,
			city,
			phone,
		}: {
			first_name: string;
			last_name: string;
			email: string;
			password: string;
			city: string;
			phone: string;
		},
		handleClose: () => void
	) => {
		setAuthState({
			loading: true,
			data: null,
			error: null,
		});

		try {
			const response = await axios.post(
				"http://localhost:8090/api/auth/signup",
				{
					first_name,
					last_name,
					email,
					password,
					city,
					phone,
				}
			);
			setAuthState({
				loading: false,
				data: response.data,
				error: null,
			});
			handleClose();
		} catch (error: any) {
			setAuthState({
				loading: false,
				data: null,
				error: error.response.data.errorMessage,
			});
		}
	};

	const signOut = () => {
		deleteCookie("jwt");

		setAuthState({
			loading: false,
			data: null,
			error: null,
		});
	};

	return { signIn, signUp, signOut };
};

export default useAuth;
