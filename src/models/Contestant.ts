import mongoose from "mongoose";

const Contestant = new mongoose.Schema({
	contestantId: String,
	name: String,
	role: {
		candidateForKing: Boolean,
		candidateForPrince: Boolean,
		candidateForQueen: Boolean,
		candidateForPrincess: Boolean,
		candidateForPerformance: Boolean,
		candidateForSinger: Boolean,
	},
	votes: {
		king: Number,
		prince: Number,
		queen: Number,
		princess: Number,
		performance: Number,
		singer: Number,
	},
});

export default mongoose.models.Contestant ||
	mongoose.model("Contestant", Contestant);
