import NavBar from "./components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "OpenTable",
	description: "1234",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen w-screen bg-gray-100">
					<main className="m-auto max-w-screen-2xl bg-white">
						<NavBar />
						{children}
					</main>
				</main>
			</body>
		</html>
	);
}
