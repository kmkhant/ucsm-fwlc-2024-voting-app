import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../lib/connectDB";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
	await connectDB();

	const codes = voucher_codes.generate({
		prefix: "fwlc-",
		length: 6,
		count: 5,
		postfix: "-2024",
	});

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
		new Contestant({
			contestantId: "FWLC-QP-#3",
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
			contestantId: "FWLC-QP-#4",
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
	];

	// await Contestant.insertMany(contestants);

	// Coupon Generation
	const coupons: (typeof Coupon)[] = [];

	codes.map((code) => {
		coupons
			.push
			// new Coupon({
			// 	coupon: code,
			// 	stats: {
			// 		isGenerated: false,
			// 		isKingVoted: false,
			// 		isPrinceVoted: false,
			// 		isQueenVoted: false,
			// 		isPrincessVoted: false,
			// 		isSingerVoted: false,
			// 		isPerformanceVoted: false,
			// 	},
			// })
			();
	});

	// await Coupon.insertMany(coupons);

	return NextResponse.json({
		message: "Migration Done!",
	});
}
