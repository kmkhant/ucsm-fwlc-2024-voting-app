import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import connectDB from "../../lib/connectDB";
import { NextResponse } from "next/server";
import Contestant from "@/models/Contestant";

export async function POST(request: Request) {
	try {
		await connectDB();
		await Coupon.collection.drop();
		await Contestant.collection.drop();
		return NextResponse.json(
			{ message: "Reset successful" },
			{ status: 200 }
		);
	} catch (e) {
		return NextResponse.json(
			{ message: "Oops! Something went wrong" },
			{ status: 500 }
		);
	}
}
