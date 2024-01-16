import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../lib/connectDB";

export async function POST(request: Request) {
	await connectDB();

	// console.log(coupon);

	// find a coupon that is not generated
	const currentCoupon = await Coupon.findOne({
		"stats.isGenerated": false,
	});

	if (!currentCoupon) {
		return new Response(
			JSON.stringify({ message: "No Coupon left" }),
			{
				headers: { "content-type": "application/json" },
				status: 400,
			}
		);
	}

	if (currentCoupon.stats.isGenerated) {
		return new Response(
			JSON.stringify({
				message: "Coupon already generated",
			}),
			{
				headers: { "content-type": "application/json" },
				status: 400,
			}
		);
	} else {
		currentCoupon.stats.isGenerated = true;
		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				coupon: currentCoupon.coupon,
			},
			{
				$set: {
					stats: currentCoupon.stats,
				},
			}
		);
	}

	return new Response(
		JSON.stringify({
			message: "Coupon Generation Success",
			coupon: currentCoupon.coupon,
		}),
		{
			headers: { "content-type": "application/json" },
			status: 200,
		}
	);
}
