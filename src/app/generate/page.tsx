"use client";

import {
	useMutation,
	useQuery,
	useQueryClient,
} from "react-query";
import instance from "@/utils/axios";
import axios from "axios";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import md5 from "md5";
import { toast } from "react-toastify";
import { set } from "mongoose";

function Generate() {
	// Access Query Client
	const queryClient = useQueryClient();

	const [authorized, setAuthorized] =
		useState<boolean>(false);

	const [show, setShow] = useState<boolean | undefined>(
		false
	);

	const inputRef = useRef<HTMLInputElement>(null);

	const generateCoupon = async () => {
		try {
			const resp = await instance.post(
				"/fwlc-gE4okB-generate"
			);

			const { data } = resp;

			return data.coupon;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				throw new Error(e.response?.data?.message);
			} else {
				console.log("UNKNOWN ERROR");
			}
			return undefined;
		}
	};

	const getServerStatus = async () => {
		try {
			const resp = await instance.get("/toggleServer");
			const { data } = resp;
			setShow(data.show);
		} catch (e) {
			console.log(e);
			return undefined;
		}
	};

	const toggleServer = async () => {
		instance
			.post("/toggleServer", {
				secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
			})
			.then((res) => {
				toast.success(
					"Show votes option changed. " + res.data.show
				);
				setShow(res.data.show);
				return res.data.show;
			})
			.catch((e) => {
				toast.success("Something went wrong :(");
				console.log(e);
			});
	};

	const getResults = async () => {
		try {
			const results = await instance.post("/results", {
				secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
			});

			const { data } = results;
			return data;
		} catch (e) {
			console.log(e);
			return undefined;
		}
	};

	// Queries

	const {
		status: showDataStatus,
		refetch: refetchShow,
		isFetching: isShowFetching,
	} = useQuery("serverStatus", getServerStatus);

	const { status, data, refetch, isFetching } = useQuery(
		"coupons",
		generateCoupon,
		{ enabled: false, retry: false }
	);

	const {
		data: resultsData,
		status: resultsStatus,
		isFetching: isResultsFetching,
		refetch: refetchResults,
	} = useQuery("results", getResults, {
		enabled: false,
		retry: false,
	});

	// Mutations
	const mutation = useMutation(toggleServer, {
		onSuccess: async () => {
			refetchShow();
			queryClient.invalidateQueries("serverStatus");
		},
	});

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
							disabled={isFetching}
							onClick={() => refetch()}
						>
							{isFetching
								? "Fetching Coupon..."
								: "Generate"}
						</button>
					</div>
				</div>
			</div>
			<div className="min-h-screen mx-8">
				<h1 className="text-center text-2xl font-bold text-primary">
					ADMINISTRATION
				</h1>
				<div className="mt-4">
					<div className="flex justify-center mb-4">
						<div>
							{showDataStatus === "success" &&
								!isShowFetching && (
									<span
										className={`${
											show
												? "text-green-500"
												: "text-red-500"
										}`}
									>
										Showing Votes
									</span>
								)}

							{showDataStatus === "loading" && (
								<span
									className={`${
										show ? "text-green-500" : "text-red-500"
									}`}
								>
									Fetching Server Status
								</span>
							)}

							{isShowFetching && <span>Toggling...</span>}
						</div>
					</div>
					<div className="flex justify-center">
						<div className="ml-4">
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={show}
								onChange={() => mutation.mutate()}
								value={"show"}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-screen">
				<h1 className="text-center text-2xl font-bold text-primary">
					RESULTS
				</h1>
				<div className="mt-4">
					<div className="flex justify-center text-white">
						<button
							className="btn btn-primary"
							onClick={() => refetchResults()}
						>
							Get Results
						</button>
					</div>
					<div className="flex justify-center">
						<div className="text-center my-4 text-lg">
							{resultsStatus === "success" ? (
								<>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Fresher King{" "}
										</h1>
										id:{" "}
										{resultsData.fresherKing.contestantId}{" "}
										<br />
										name: {
											resultsData.fresherKing.name
										}{" "}
										<br />
										votes:{
											resultsData.fresherKing.votes
										}{" "}
										<br />
									</div>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Fresher Queen{" "}
										</h1>
										id:{" "}
										{resultsData.fresherQueen.contestantId}{" "}
										<br />
										name: {
											resultsData.fresherQueen.name
										}{" "}
										<br />
										votes:{
											resultsData.fresherQueen.votes
										}{" "}
										<br />
									</div>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Fresher Prince{" "}
										</h1>
										id:{" "}
										{resultsData.fresherPrince.contestantId}{" "}
										<br />
										name: {
											resultsData.fresherPrince.name
										}{" "}
										<br />
										votes:{
											resultsData.fresherPrince.votes
										}{" "}
										<br />
									</div>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Fresher Princess{" "}
										</h1>
										id:{" "}
										{
											resultsData.fresherPrincess
												.contestantId
										}{" "}
										<br />
										name: {
											resultsData.fresherPrincess.name
										}{" "}
										<br />
										votes:
										{resultsData.fresherPrincess.votes}{" "}
										<br />
									</div>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Best Singer{" "}
										</h1>
										id:{" "}
										{resultsData.bestSinger.contestantId}{" "}
										<br />
										name: {resultsData.bestSinger.name}{" "}
										<br />
										votes:{
											resultsData.bestSinger.votes
										}{" "}
										<br />
									</div>
									<div className="text-center my-4 text-lg">
										<h1 className="text-2xl font-bold text-primary">
											Best Performance{" "}
										</h1>
										id:{" "}
										{
											resultsData.bestPerformance
												.contestantId
										}{" "}
										<br />
										name: {
											resultsData.bestPerformance.name
										}{" "}
										<br />
										votes:
										{resultsData.bestPerformance.votes}{" "}
										<br />
									</div>
								</>
							) : (
								"No Results, get results first"
							)}
						</div>
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
