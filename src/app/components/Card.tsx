"use client";

import PlaceHolderImage from "@/app/assets/images/placeholder.webp";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { ICard } from "@/app/types/interfaces";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import instance from "@/utils/axios";
import axios from "axios";

export const dataSelections: ICard[] = [
	// king and princes
	{
		contestantId: "FWLC-KP-#1",
		name: "Mg Nay Toe",
		description: "Contestant #1",
		image: PlaceHolderImage,
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#2",
		name: "Mg Aung Ye Lin",
		description: "Contestant #2",
		image: PlaceHolderImage,
		isMale: true,
	},

	// Queen and Princesses
	{
		contestantId: "FWLC-QP-#1",
		name: "Ma Soe Pyae Thazin",
		description: "Contestant #1",
		image: PlaceHolderImage,
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#2",
		name: "Ma Moe Hay Ko",
		description: "Contestant #2",
		image: PlaceHolderImage,
		isFemale: true,
	},
];

export const dataOthers: ICard[] = [
	{
		contestantId: "FWLC-S-#1",
		name: "Ma Bobby Soxer",
		description: "Singer #1",
		image: PlaceHolderImage,
		isSinger: true,
	},
	{
		contestantId: "FWLC-S-#2",
		name: "Mg Hlawn Paing",
		description: "Singer #2",
		image: PlaceHolderImage,
		isSinger: true,
	},
	{
		contestantId: "FWLC-P-#1",
		name: "KPOP Dance Group",
		description: "Performance #1",
		image: PlaceHolderImage,
		isPerformance: true,
	},
	{
		contestantId: "FWLC-P-#2",
		name: "Yein Aka",
		description: "Performance #2",
		image: PlaceHolderImage,
		isPerformance: true,
	},
];

function Card({
	contestantId,
	name,
	description,
	image,
	isMale,
	isFemale,
	isSinger,
	isPerformance,
}: ICard) {
	const [loading, setLoading] = useState<boolean>(false);

	const handleClick = async () => {
		// fetch coupon from input
		if (inputRef.current) {
			const coupon = inputRef.current.value;

			if (coupon === "") {
				toast.error("Please enter coupon code");
				return;
			}

			if (isMale) {
				// check if king or prince is selected
				if (isKingOrPrince === "") {
					toast.error("Please select King or Prince");
					return;
				}

				// check if king or prince
				if (isKingOrPrince === "king") {
					// vote for king
					setLoading(true);
					try {
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForKing: true,
						});
						toast.success(data.message);
						setLoading(false);
						setIsKingOrPrince("");
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
						setLoading(false);
						setIsKingOrPrince("");
					}
				} else {
					// vote for prince
					setLoading(true);
					try {
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForPrince: true,
						});
						toast.success(data.message);
						setLoading(false);
						setIsKingOrPrince("");
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
						setLoading(false);
						setIsKingOrPrince("");
					}
				}
			}

			if (isFemale) {
				// check if queen or princess is selected
				if (isQueenOrPrincess === "") {
					toast.error("Please select Queen or Princess");
					return;
				}
				// check if queen or princess
				if (isQueenOrPrincess === "queen") {
					// vote for queen
					try {
						setLoading(true);
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForQueen: true,
						});
						toast.success(data.message);
						setLoading(false);
						setQueenOrPrincess("");
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
						setLoading(false);
						setQueenOrPrincess("");
					}
				} else {
					// vote for princess
					try {
						setLoading(true);
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForPrincess: true,
						});
						toast.success(data.message);
						setLoading(false);
						setQueenOrPrincess("");
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
						setLoading(false);
						setQueenOrPrincess("");
					}
				}
			}

			if (isSinger) {
				// vote for singer
				try {
					setLoading(true);
					const { data } = await instance.post("/vote", {
						contestantId,
						coupon,
						candidateForSinger: true,
					});
					toast.success(data.message);
					setLoading(false);
				} catch (e) {
					if (axios.isAxiosError(e)) {
						toast.error(e.response?.data?.message);
					} else {
						toast.error("Oops! Something went wrong");
					}
					setLoading(false);
				}
			}

			if (isPerformance) {
				// vote for singer
				try {
					setLoading(true);
					const { data } = await instance.post("/vote", {
						contestantId,
						coupon,
						candidateForPerformance: true,
					});
					toast.success(data.message);
					setLoading(false);
				} catch (e) {
					if (axios.isAxiosError(e)) {
						toast.error(e.response?.data?.message);
					} else {
						toast.error("Oops! Something went wrong");
					}
					setLoading(false);
				}
			}
		}
	};

	const [isKingOrPrince, setIsKingOrPrince] =
		useState<string>("");
	const [isQueenOrPrincess, setQueenOrPrincess] =
		useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="p-4 rounded-md backdrop-blur-xl shadow-2xl mt-4">
			<div className="">
				<Image
					src={image}
					alt={name}
					width={300}
					height={300}
				/>
			</div>
			<div className="py-4">
				<h2 className="font-bold capitalize text-lg">
					{name}
				</h2>
				<p>{description}</p>
			</div>
			<div className={`${isMale ? "block" : "hidden"}`}>
				<div className="flex items-center">
					<input
						type="radio"
						name="radio-1"
						className="radio radio-primary"
						value="king"
						checked={isKingOrPrince === "king"}
						onChange={(e) =>
							setIsKingOrPrince(
								e.target.value.toLowerCase().toString()
							)
						}
					/>
					<label
						htmlFor="king"
						className="font-semibold pl-4"
					>
						King
					</label>
				</div>
				<div className="flex items-center mt-4">
					<input
						type="radio"
						name="radio-1"
						className="radio radio-primary"
						value="prince"
						checked={isKingOrPrince === "prince"}
						onChange={(e) =>
							setIsKingOrPrince(
								e.target.value.toLowerCase().toString()
							)
						}
					/>
					<label
						htmlFor="prince"
						className="font-semibold pl-4"
					>
						Prince
					</label>
				</div>
			</div>
			<div className={`${isFemale ? "block" : "hidden"}`}>
				<div className="flex items-center">
					<input
						type="radio"
						name="radio-1"
						className="radio radio-primary"
						value="queen"
						checked={isQueenOrPrincess === "queen"}
						onChange={(e) =>
							setQueenOrPrincess(
								e.target.value.toLowerCase().toString()
							)
						}
					/>
					<label
						htmlFor="queen"
						className="font-semibold pl-4"
					>
						Queen
					</label>
				</div>
				<div className="flex items-center mt-4">
					<input
						type="radio"
						name="radio-1"
						className="radio radio-primary"
						value="princess"
						checked={isQueenOrPrincess === "princess"}
						onChange={(e) =>
							setQueenOrPrincess(
								e.target.value.toLowerCase().toString()
							)
						}
					/>
					<label
						htmlFor="princess"
						className="font-semibold pl-4"
					>
						Princess
					</label>
				</div>
			</div>
			<div className="my-4">
				<input
					type="text"
					placeholder="Enter Coupon Code"
					ref={inputRef}
					className="input input-bordered w-full max-w-xs focus:outline-none bg-slate-100 text-slate-900"
				/>
			</div>

			<button
				className={`btn btn-primary w-full text-lg text-white font-normal disabled:bg-neutral`}
				onClick={() => handleClick()}
				disabled={loading}
			>
				{loading ? "Voting..." : "Vote"}
			</button>
		</div>
	);
}

export default Card;
