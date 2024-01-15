import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware only available on Edge Runtime Sadge (default: nodejs runtime for budget):(
export async function middleware(req: NextRequest) {
	const { secret } = await req.json();
	console.log("PASSING MIDDLEWARE");
	if (secret !== process.env.API_SECRET) {
		return new Response(
			JSON.stringify({
				message: "WISH :P",
			}),
			{
				headers: { "content-type": "application/json" },
				status: 401,
			}
		);
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: "/migration/:path*",
};
