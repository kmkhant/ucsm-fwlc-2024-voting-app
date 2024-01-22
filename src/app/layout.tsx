"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { OptionStateContext } from "./context/OptionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	QueryClient,
	QueryClientProvider,
} from "react-query";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient();

	return (
		<html lang="en" data-theme="atom">
			<body className={inter.className}>
				<OptionStateContext>
					<QueryClientProvider client={queryClient}>
						<Navbar />
						{children}
					</QueryClientProvider>
				</OptionStateContext>
				<ToastContainer />
				<footer className="text-center text-sm py-4">
					<h6>Made with ❤️</h6>
					<h6>&copy; Khaing Myel Khant - 2024</h6>
				</footer>
			</body>
		</html>
	);
}
