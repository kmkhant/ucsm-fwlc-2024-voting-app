import mongoose from "mongoose";

const ServerStatus = new mongoose.Schema({
	open: { type: Boolean, default: false },
});

export default mongoose.models.ServerStatus ||
	mongoose.model("ServerStatus", ServerStatus);
