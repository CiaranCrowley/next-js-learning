import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";

const useAuth = () => {
	const { loading, data, error, setAuthState } = useContext(
		AuthenticationContext
	);

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
			console.log(response);
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

	const signUp = () => {};

	return { signIn, signUp };
};

export default useAuth;
