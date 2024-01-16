import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
	redis: kv,
	// 5 requests from the same IP in 10 seconds
	limiter: Ratelimit.slidingWindow(5, "10 s"),
});

// Middleware only available on Edge Runtime Sadge (default: nodejs runtime for budget):(
export async function middleware(req: NextRequest) {
	const ip = req.ip ?? "127.0.0.1";
	const { success, pending, limit, reset, remaining } =
		await ratelimit.limit(ip);
	if (success) {
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
	} else {
		return NextResponse.redirect(
			new URL("/blocked", req.url)
		);
	}
}

export const config = {
	matcher: "/api/migration/:path*",
};
