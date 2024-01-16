import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import connectDB from "../../lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await connectDB();

	const codes = voucher_codes.generate({
		prefix: "fwlc-",
		length: 6,
		count: 5,
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
					isKingVoted: false,
					isPrinceVoted: false,
					isQueenVoted: false,
					isPrincessVoted: false,
					isSingerVoted: false,
					isPerformanceVoted: false,
				},
			})
		);
	});

	await Coupon.insertMany(coupons);

	return NextResponse.json({ codes }, { status: 200 });
}
