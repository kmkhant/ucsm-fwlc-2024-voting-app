import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import connectDB from "../../lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await connectDB();

	const codes = voucher_codes.generate({
		prefix: "fwlc-",
		length: 6,
		count: 300,
		postfix: "-2024",
	});

	// Coupon Generation
	const coupons: (typeof Coupon)[] = [];

	codes.map((code) => {
		coupons.push(
			new Coupon({
				coupon: code,
				stats: {
					isGenerated: false,
					king: {
						votedKing: "",
						isKingVoted: false,
					},
					queen: {
						votedQueen: "",
						isQueenVoted: false,
					},
					prince: {
						votedPrince: "",
						isPrinceVoted: false,
					},
					princess: {
						votedPrincess: "",
						isPrincessVoted: false,
					},
					isSingerVoted: {
						votedSinger: "",
						isSingerVoted: false,
					},
					isPerformanceVoted: {
						votedPerformance: "",
						isPerformanceVoted: false,
					},
				},
			})
		);
	});

	await Coupon.insertMany(coupons);

	return NextResponse.json({ codes }, { status: 200 });
}
