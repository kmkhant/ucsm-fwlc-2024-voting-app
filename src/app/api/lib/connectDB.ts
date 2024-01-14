import mongoose, { Mongoose } from "mongoose";

declare global {
	var mongoose: {
		conn: Mongoose | null;
		promise: Promise<Mongoose> | null;
	};
}

const DATABASE_URL = process.env.MONGO_URI || "";

if (!DATABASE_URL || DATABASE_URL === "") {
	throw new Error(
		"Please define the MONGO_URI environment variable inside .env.local"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		// const opts = {
		//   bufferCommands: false
		// }

		cached.promise = mongoose
			.connect(DATABASE_URL, { dbName: "fwlc2024" })
			.then((mongoose) => {
				return mongoose;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default connectDB;
