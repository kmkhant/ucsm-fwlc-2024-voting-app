import { NextResponse } from "next/server";

var serverOn: Boolean = false;

export async function POST(request: Request) {
	if (serverOn) {
		serverOn = false;
	} else {
		serverOn = true;
	}

	return NextResponse.json({
		message: "Server status changed",
		status: serverOn,
	});
}

export async function GET(request: Request) {
	return NextResponse.json({
		status: serverOn,
	});
}
