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
		name: "Mg Soe Moe",
		description: "Contestant #2",
		image: PlaceHolderImage,
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#3",
		name: "Mg Kaung Thant",
		description: "Contestant #3",
		image: PlaceHolderImage,
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#4",
		name: "Mg Min Thant",
		description: "Contestant #4",
		image: PlaceHolderImage,
		isMale: true,
	},

	// Queen and Princesses
	{
		contestantId: "FWLC-QP-#1",
		name: "Ma Ei Ei Aung",
		description: "Contestant #1",
		image: PlaceHolderImage,
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#2",
		name: "Ma Soe Moe",
		description: "Contestant #2",
		image: PlaceHolderImage,
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#3",
		name: "Ma Moe Moe",
		description: "Contestant #3",
		image: PlaceHolderImage,
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#4",
		name: "Ma Soe Moe Shwe Yee",
		description: "Contestant #4",
		image: PlaceHolderImage,
		isFemale: true,
	},
];

export const dataOthers: ICard[] = [
	{
		contestantId: "FWLC-S-#1",
		name: "Kyaw Nay Min",
		description: "Singer #1",
		image: PlaceHolderImage,
		isSinger: true,
	},
	{
		contestantId: "FWLC-S-#2",
		name: "Min Thura Kyaw",
		description: "Singer #2",
		image: PlaceHolderImage,
		isSinger: true,
	},
	{
		contestantId: "FWLC-P-#1",
		name: "Yes We Purple",
		description: "Performance #1",
		image: PlaceHolderImage,
		isPerformance: true,
	},
	{
		contestantId: "FWLC-P-#2",
		name: "KPOPPERS",
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
				if (isKing === undefined) {
					toast.error("Please select King or Prince");
					return;
				}

				// check if king or prince
				if (isKing) {
					// vote for king
					try {
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForKing: true,
						});
						toast.success(data.message);
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
					}
				} else {
					// vote for prince
					try {
						const { data } = await instance.post("/vote", {
							contestantId,
							coupon,
							candidateForPrince: true,
						});
						toast.success(data.message);
					} catch (e) {
						if (axios.isAxiosError(e)) {
							toast.error(e.response?.data?.message);
						} else {
							toast.error("Oops! Something went wrong");
						}
					}
				}
			}

			if (isFemale) {
				// check if queen or princess is selected
				if (isQueen === undefined) {
					toast.error("Please select Queen or Princess");
					return;
				}
				// check if queen or princess
				if (isQueen) {
					// vote for queen
				} else {
					// vote for princess
				}
			}

			if (isSinger) {
				// vote for singer
			}

			if (isPerformance) {
				// vote for performance
			}
		}
	};

	const [isKing, setIsKing] = useState<boolean | undefined>(
		undefined
	);
	const [isQueen, setIsQueen] = useState<
		boolean | undefined
	>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="p-4 rounded-md backdrop-blur-xl shadow-2xl">
			<div>
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
						onClick={() => {
							setIsKing(true);
						}}
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
						onClick={() => {
							setIsKing(false);
						}}
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
						onClick={() => {
							setIsQueen(true);
						}}
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
						onClick={() => {
							setIsQueen(false);
						}}
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
				className="btn btn-primary w-full text-lg text-white font-normal"
				onClick={() => handleClick()}
			>
				Vote
			</button>
		</div>
	);
}

export default Card;
