import axios from "axios";
import { useState } from "react";

export default function useReservation() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const createReservation = async ({
		slug,
		partySize,
		day,
		time,
      first_name,
		last_name,
		phone,
		email,
		occasion,
		requests,
	}: {
		slug: string;
		partySize: string;
		day: string;
		time: string;
		first_name: string;
		last_name: string;
		phone: string;
		email: string;
		occasion: string;
		requests: string;
	}) => {
		console.log({ slug, partySize, day, time });

		setLoading(true);
		try {
			const response = await axios.post(
				`http://localhost:8090/api/restaurant/${slug}/reserve`,
				{ first_name, last_name, phone, email, occasion, requests },
				{
					params: {
						day,
						time,
						partySize,
					},
				}
			);
			// console.log(response);
			setLoading(false);
         return response.data
		} catch (error: any) {
			setLoading(false);
			setError(error.response.data.errorMessage);
		}
	};

	return { loading, error, createReservation };
}
