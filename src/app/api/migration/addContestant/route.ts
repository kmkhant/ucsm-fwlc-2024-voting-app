import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../../lib/connectDB";
import { NextResponse } from "next/server";

// made this route run on edge
export const runtime = "edge";

export async function GET(request: Request) {
	await connectDB();

	// Contestants
	const contestants: (typeof Contestant)[] = [
		// KINGS AND PRINCES
		new Contestant({
			contestantId: "FWLC-KP-#1",
			name: "Mg Nay Toe",
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
			name: "Mg Aung Ye Lin",
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
			name: "Ma Soe Pyae Thazin",
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
			name: "Ma Moe Hay Ko",
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
	];

	try {
		// await Contestant.insertMany(contestants);
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
