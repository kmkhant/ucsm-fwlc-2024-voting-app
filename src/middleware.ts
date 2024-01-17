import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware only available on Edge Runtime Sadge (default: nodejs runtime for budget):(
export async function middleware(req: NextRequest) {
	try {
		const { secret } = await req.json();

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
	} catch (e) {
		return NextResponse.json(
			{ message: "WISH :P" },
			{ status: 401 }
		);
	}
}

export const config = {
	matcher: ["/api/migration/:path*", "/api/results/:path*"],
};
