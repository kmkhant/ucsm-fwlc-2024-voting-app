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
		name: "Yan Shin",
		image: "/images/fwlc-kp-1.jpg",
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#2",
		name: "Zin Min Thet",
		image: "/images/fwlc-kp-2.jpg",
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#3",
		name: "Htoo Annt Naing",
		image: "/images/fwlc-kp-3.jpg",
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#4",
		name: "Aung Chan Myae Kyaw",
		image: "/images/fwlc-kp-4.jpg",
		isMale: true,
	},
	{
		contestantId: "FWLC-KP-#5",
		name: "La Min Htwe",
		image: "/images/fwlc-kp-5.jpg",
		isMale: true,
	},

	// Queen and Princesses
	{
		contestantId: "FWLC-QP-#1",
		name: "Ei Thazin Aung",
		image: "/images/fwlc-qp-1.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#2",
		name: "May Thin Khaing",
		image: "/images/fwlc-qp-2.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#3",
		name: "Cho Nay Linn",
		image: "/images/fwlc-qp-3.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#4",
		name: "Kay Thi Aung",
		image: "/images/fwlc-qp-4.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#5",
		name: "Yoon Thiri Ko Ko",
		image: "/images/fwlc-qp-5.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#6",
		name: "Sandar Htun",
		image: "/images/fwlc-qp-6.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#7",
		name: "Khun Sint Than Thar",
		image: "/images/fwlc-qp-7.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#8",
		name: "Khin Hnin Yu",
		image: "/images/fwlc-qp-8.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#9",
		name: "May Phuu Thwe",
		image: "/images/fwlc-qp-9.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#10",
		name: "Hnin Pwint Phyu",
		image: "/images/fwlc-qp-10.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#11",
		name: "Swe Khaing Win",
		image: "/images/fwlc-qp-11.jpg",
		isFemale: true,
	},
	{
		contestantId: "FWLC-QP-#12",
		name: "May Myat Noe",
		image: "/images/fwlc-qp-12.jpg",
		isFemale: true,
	},
];

export const dataOthers: ICard[] = [
	// singers
	{
		contestantId: "FWLC-S-#1",
		name: "Su Myat Hnin - Solo",
		image: "/images/singer/fwlc-s-1-su-myat-hnin.jpg",
		isSinger: true,
		description: "တတိယမြောက်ရည်းစားစကားနိဒါန်း",
	},
	{
		contestantId: "FWLC-S-#2",
		name: "Khaing Kyaw Kyaw - Solo",
		image:
			"/images/singer/fwlc-s-2-KhaingKyawKyaw-solo-min.jpg",
		isSinger: true,
		description: "solo သီချင်း",
	},
	{
		contestantId: "FWLC-S-#3",
		name: "Khaing Kyaw Kyaw & Su Myat Hnin",
		image:
			"/images/singer/fwlc-s-3-KhaingKyawKyaw&SuMyatHnin-ngar-bayin-ma-min.jpg",
		isSinger: true,
		description: "ငါဘုရင်မ",
	},
	{
		contestantId: "FWLC-S-#4",
		name: "Trio Singers",
		image:
			"/images/singer/fwlc-s-4-thuma-nint-aein-mat.jpg",
		isSinger: true,
		description: "သူမနှင့်အိပ်မက်",
	},
	{
		contestantId: "FWLC-S-#5",
		name: "May Yamin Khin",
		image: PlaceHolderImage,
		isSinger: true,
		description: "သူသိသွားပြီ",
	},
	{
		contestantId: "FWLC-S-#6",
		name: "SE Major",
		image: PlaceHolderImage,
		isSinger: true,
		description: "အလွမ်းရယ်မပြေ",
	},
	{
		contestantId: "FWLC-S-#7",
		name: "May Pannyaung Ko Ko",
		image: PlaceHolderImage,
		isSinger: true,
		description: "That Should Be Me",
	},
	{
		contestantId: "FWLC-S-#8",
		name: "Ei Thazin Aung",
		image: PlaceHolderImage,
		isSinger: true,
		description: "တာဝန်အရ",
	},
	{
		contestantId: "FWLC-S-#9",
		name: "May Yamin Khin",
		image: PlaceHolderImage,
		isSinger: true,
		description: "Say Yes to Heaven",
	},
	{
		contestantId: "FWLC-S-#10",
		name: "Ei Thu Win",
		image: PlaceHolderImage,
		isSinger: true,
		description: "Solo Song",
	},
	{
		contestantId: "FWLC-S-#11",
		name: "Sai Sithu Htun",
		image: PlaceHolderImage,
		isSinger: true,
		description: "Solo Song",
	},
	{
		contestantId: "FWLC-S-#12",
		name: "Au Thawdar Moe",
		image: PlaceHolderImage,
		isSinger: true,
		description: "Strawberry and Cigraettes",
	},
	{
		contestantId: "FWLC-S-#13",
		name: "Sai Sithu Htun",
		image: PlaceHolderImage,
		isSinger: true,
		description: "Waiting for You",
	},

	// Performance Contestants
	{
		contestantId: "FWLC-P-#1",
		name: "Congrats My EX",
		image:
			"/images/performance/fwlc-p-1-congrats-my-ex-india-dance.jpg",
		isPerformance: true,
		description: "India Dance",
	},
	{
		contestantId: "FWLC-P-#2",
		name: "Radha",
		image:
			"/images/performance/fwlc-p-2-radha-india-dance-couple.jpg",
		isPerformance: true,
		description: "India Couple Dance",
	},
	{
		contestantId: "FWLC-P-#3",
		name: "အာဝါဟ",
		image: "/images/performance/fwlc-p-3-ar-wa-ha.jpg",
		isPerformance: true,
		description: "Performance သီချင်း",
	},
	{
		contestantId: "FWLC-P-#4",
		name: "Final Year Dance Group",
		image:
			"/images/performance/fwlc-p-4-final-year-dance-group.jpg",
		isPerformance: true,
		description: "Dance & Performance",
	},
	{
		contestantId: "FWLC-P-#5",
		name: "Picture",
		image:
			"/images/performance/fwlc-p-5-picture-kpop-dance.jpg",
		isPerformance: true,
		description: "KPOP Dance",
	},
	{
		contestantId: "FWLC-P-#6",
		name: "နပန်းစံ",
		image: "/images/performance/fwlc-p-6-napan-san.jpg",
		isPerformance: true,
		description: "Dance & Performance",
	},
	{
		contestantId: "FWLC-P-#7",
		name: "Happiness",
		image: "/images/performance/fwlc-p-7-happiness.jpg",
		isPerformance: true,
		description: "Dance & Performance",
	},

	{
		contestantId: "FWLC-P-#8",
		name: "Project",
		image: "/images/performance/fwlc-p-8-project.jpg",
		isPerformance: true,
		description: "Project",
	},
	{
		contestantId: "FWLC-P-#9",
		name: "တောင်ယာဝင်ချိန်",
		image:
			"/images/performance/fwlc-p-9-taung-yar-win-chain.jpg",
		isPerformance: true,
		description: "Dance & Performance",
	},
	{
		contestantId: "FWLC-P-#10",
		name: "မူယာကျော့",
		image: PlaceHolderImage,
		isPerformance: true,
		description: "မြန်မာအက",
	},
	{
		contestantId: "FWLC-P-#11",
		name: "မှုံရွှေရည်",
		image: PlaceHolderImage,
		isPerformance: true,
		description: "မြန်မာအက",
	},
	{
		contestantId: "FWLC-P-#12",
		name: "မီးနဲ့ရေ",
		image: PlaceHolderImage,
		isPerformance: true,
		description: "Dance & Performance",
	},
];

function Card({
	contestantId,
	name,
	image,
	isMale,
	isFemale,
	isSinger,
	isPerformance,
	description,
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
		<div className="p-4 rounded-md backdrop-blur-xl shadow-2xl my-4">
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
				<p>{contestantId}</p>
				{description && (
					<p className="text-sm text-gray-500">
						{description}
					</p>
				)}
			</div>
			<div className={`${isMale ? "block" : "hidden"}`}>
				<div className="flex items-center">
					<input
						type="radio"
						name="radio-1"
						className="radio radio-primary"
						value="king"
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
						onChange={(e) => {
							setIsKingOrPrince(
								e.target.value.toLowerCase().toString()
							);
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
