import axios from "axios";

const useAuth = () => {
	const signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const response = await axios.post(
				"http://localhost:8090/api/auth/signin",
				{
					email,
					password,
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const signUp = () => {};

	return { signIn, signUp };
};

export default useAuth;
