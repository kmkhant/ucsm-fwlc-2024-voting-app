import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(request: Request) {
	var showKV: Boolean | null = await kv.get("show");

	if (showKV) {
		// toggle show if exists
		await kv.set("show", !showKV);
		const showResult = await kv.get("show");

		return NextResponse.json({
			message: "Server status changed",
			show: showResult,
		});
	} else {
		// set show to true and store if exists
		await kv.set("show", true);
		const showResult = await kv.get("show");
		return NextResponse.json({
			message: "Server status changed",
			show: showResult,
		});
	}
}

export async function GET(request: Request) {
	var show: Boolean | null = await kv.get("show");
	return NextResponse.json({
		show,
	});
}
