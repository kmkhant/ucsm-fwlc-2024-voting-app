import mongoose from "mongoose";

const Coupon = new mongoose.Schema({
	coupon: String,
	stats: {
		isGenerated: { type: Boolean, defaults: false },
		isKingVoted: { type: Boolean, defaults: false },
		isPrinceVoted: { type: Boolean, defaults: false },
		isQueenVoted: { type: Boolean, defaults: false },
		isPrincessVoted: { type: Boolean, defaults: false },
		isSingerVoted: { type: Boolean, defaults: false },
		isPerformanceVoted: { type: Boolean, defaults: false },
	},
});

export default mongoose.models.Coupon ||
	mongoose.model("Coupon", Coupon);
