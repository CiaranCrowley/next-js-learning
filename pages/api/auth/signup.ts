import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { first_name, last_name, email, phone, city, password } = req.body;

		const errors: string[] = [];

		const validationSchema = [
			{
				valid: validator.isLength(first_name, {
					min: 1,
				}),
				errorMessage: "First name is invalid",
			},
			{
				valid: validator.isLength(last_name, {
					min: 1,
				}),
				errorMessage: "Last name is invalid",
			},
			{
				valid: validator.isEmail(email),
				errorMessage: "Email is invalid",
			},
			{
				valid: validator.isMobilePhone(phone),
				errorMessage: "Phone number is invalid",
			},
			{
				valid: validator.isLength(city, {
					min: 1,
				}),
				errorMessage: "City is invalid",
			},
			{
				valid: validator.isStrongPassword(password),
				errorMessage: "Password is invalid",
			},
		];

		validationSchema.forEach((check) => {
			if (!check.valid) {
				errors.push(check.errorMessage);
			}
		});

		if (errors.length) {
			return res.status(400).json({ errorMessage: errors[0] });
		}

		const userWithEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userWithEmail) {
			return res
				.status(400)
				.json({ errorMessage: "Email is associated with another account" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone: phone,
				city: city,
				password: hashedPassword,
			},
		});

		res.status(200).json({
			hello: user,
		});
	} else {
		res.status(200).json({
			hello: "world",
		});
	}
}
