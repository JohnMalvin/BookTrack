import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	throw new Error("Please define MONGO_URI in .env.local");
}

const uri: string = MONGO_URI;

interface MongooseCache {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export async function connectDB(): Promise<Mongoose> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(uri);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
