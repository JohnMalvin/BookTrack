// import "server-only";
import mongoose from "mongoose";
import { connectDB } from "./mongoose";
import User from "@/models/User";

export async function createUser(
	username: string,
	email: string,
	password: string,
): Promise<mongoose.Types.ObjectId> {
	await connectDB();
	const user = await User.create({
		userID: "user_001",
		sessionID: "sess_001",
		username,
		email,
		password,
		nationality: "USA",
		phoneNumber: {
			countryCode: 1,
			number: 1234567890,
		},
		bookings: [],
	});

	console.log(`User created: ${user._id}`);
	return user._id;
}
