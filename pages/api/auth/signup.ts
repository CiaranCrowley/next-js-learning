import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

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

		const alg = "HS256";
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);

		const token = await new jose.SignJWT({ email: user.email })
			.setProtectedHeader({ alg })
			.setExpirationTime("24h")
			.sign(secret);

		setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

		return res.status(200).json({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			city: user.city,
		});
	}
	return res.status(404).json("Unknown endpoint");
}
