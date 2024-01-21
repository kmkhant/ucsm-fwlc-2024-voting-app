import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../../lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await connectDB();

	// Contestants
	const contestants: (typeof Contestant)[] = [
		// KINGS AND PRINCES
		new Contestant({
			contestantId: "FWLC-KP-#1",
			name: "Yan Shin",
			role: {
				candidateForKing: true,
				candidateForPrince: true,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-KP-#2",
			name: "Zin Min Thet",
			role: {
				candidateForKing: true,
				candidateForPrince: true,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-KP-#3",
			name: "Htoo Annt Naing",
			role: {
				candidateForKing: true,
				candidateForPrince: true,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-KP-#4",
			name: "Aung Chan Myae Kyaw",
			role: {
				candidateForKing: true,
				candidateForPrince: true,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-KP-#5",
			name: "La Min Htwe",
			role: {
				candidateForKing: true,
				candidateForPrince: true,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		// QUEEN AND PRINCESSES
		new Contestant({
			contestantId: "FWLC-QP-#1",
			name: "Ei Thazin Aung",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#2",
			name: "May Thin Khaing",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#3",
			name: "Cho Nay Linn",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#4",
			name: "Kay Thi Aung",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#5",
			name: "Yoon Thiri Ko Ko",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#6",
			name: "Sandar Htun",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#7",
			name: "Khun Sint Than Thar",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#8",
			name: "Khin Hnin Yu",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#9",
			name: "May Phuu Thwe",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#10",
			name: "Hnin Pwint Phyu",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#11",
			name: "Swe Khaing Win",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-QP-#12",
			name: "May Myat Noe",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: true,
				candidateForPrincess: true,
				candidateForPerformance: false,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),

		// Singers
		new Contestant({
			contestantId: "FWLC-S-#1",
			name: "Ma Bobby Soxer",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: true,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-S-#2",
			name: "Mg Hlawn Paing",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: false,
				candidateForSinger: true,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-P-#1",
			name: "KPOP Dance Group",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: true,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
		new Contestant({
			contestantId: "FWLC-P-#2",
			name: "Yein Aka",
			role: {
				candidateForKing: false,
				candidateForPrince: false,
				candidateForQueen: false,
				candidateForPrincess: false,
				candidateForPerformance: true,
				candidateForSinger: false,
			},
			votes: {
				king: 0,
				prince: 0,
				queen: 0,
				princess: 0,
				performance: 0,
				singer: 0,
			},
		}),
	];

	try {
		await Contestant.insertMany(contestants);
		return NextResponse.json(
			{ message: "Added Contestants" },
			{ status: 200 }
		);
	} catch (e) {
		return NextResponse.json(
			{ message: "Something Went Wrong" },
			{ status: 500 }
		);
	}
}
