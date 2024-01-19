import mongoose from "mongoose";

const Coupon = new mongoose.Schema({
	coupon: String,
	stats: {
		isGenerated: { type: Boolean, defaults: false },
		king: {
			votedKing: {
				type: String,
				default: "",
			},
			isKingVoted: { type: Boolean, defaults: false },
		},
		prince: {
			votedPrince: {
				type: String,
				default: "",
			},
			isPrinceVoted: { type: Boolean, defaults: false },
		},
		queen: {
			votedQueen: {
				type: String,
				default: "",
			},
			isQueenVoted: { type: Boolean, defaults: false },
		},
		princess: {
			votedPrincess: {
				type: String,
				default: "",
			},
			isPrincessVoted: { type: Boolean, defaults: false },
		},
		isSingerVoted: { type: Boolean, defaults: false },
		isPerformanceVoted: { type: Boolean, defaults: false },
	},
});

export default mongoose.models.Coupon ||
	mongoose.model("Coupon", Coupon);
