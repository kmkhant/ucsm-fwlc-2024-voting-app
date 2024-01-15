"use client";

import { useQuery, useQueryClient } from "react-query";
import instance from "@/utils/axios";
import axios from "axios";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import md5 from "md5";

function Generate() {
	const [authorized, setAuthorized] =
		useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const { status, data, refetch } = useQuery(
		"coupons",
		async () => {
			try {
				const resp = await instance.get("/generate");

				const { data } = resp;

				return data.coupon;
			} catch (e) {
				if (axios.isAxiosError(e)) {
					throw new Error(e.response?.data?.message);
				} else {
					console.log("UNKNOWN ERROR");
				}
			}
		},
		{ enabled: false, retry: false }
	);

	// console.log(md5("fwlcadminiscute"));

	const validateInput = () => {
		if (inputRef.current) {
			if (
				md5(inputRef.current.value) ===
				"f188b112c1931b48210681c4ba0a3539"
			) {
				setAuthorized(true);
			} else {
				alert("Bad Wish :(");
			}
		}
	};

	return authorized ? (
		<section className="">
			<div className="flex flex-col min-h-screen items-center justify-center h-full">
				<div>
					{status === "success" && data && (
						<div className="text-center my-4 font-bold text-2xl">
							{data || "Generate a coupon"}
							<br />
							<div className="flex justify-center">
								<QRCode
									value={data}
									size={256}
									viewBox="0 0 256 256"
								/>
							</div>
						</div>
					)}

					{status === "idle" && !data && (
						<div className="text-center my-4 text-primary font-bold text-2xl">
							Generate Coupon
						</div>
					)}

					{status === "loading" && (
						<div className="text-center my-4 text-primary font-bold text-2xl">
							Fetching Coupon Code...
						</div>
					)}

					{status === "error" && (
						<div className="text-center my-4 text-red-500 font-bold text-2xl">
							NO COUPON LEFT
						</div>
					)}

					<div className="flex justify-center">
						<button
							className={`btn btn-primary text-center text-sm text-white disabled:btn-disabled`}
							disabled={status === "loading"}
							onClick={() => refetch()}
						>
							Generate
						</button>
					</div>
				</div>
			</div>
		</section>
	) : (
		<div className="min-h-screen">
			<div>
				<h1 className="text-xl text-center">
					MAKE A WISH :P
				</h1>
			</div>
			<div className="flex justify-center">
				<input
					type="password"
					placeholder="Enter Your Wish"
					className="input focus:outline-none w-[75%] my-4 bg-gray-400 bg-opacity-20"
					ref={inputRef}
				/>
			</div>

			<div className="flex justify-center">
				<button
					className="btn btn-primary px-8"
					onClick={() => validateInput()}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default Generate;
