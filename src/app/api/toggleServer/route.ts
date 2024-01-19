import { NextResponse } from "next/server";

var show: Boolean = false;

export async function POST(request: Request) {
	if (show) {
		show = false;
	} else {
		show = true;
	}

	return NextResponse.json({
		message: "Server status changed",
		show,
	});
}

export async function GET(request: Request) {
	return NextResponse.json({
		show,
	});
}
