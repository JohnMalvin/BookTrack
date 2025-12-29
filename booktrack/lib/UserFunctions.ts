// import "server-only";
import mongoose from "mongoose";
import { connectDB } from "./mongoose";
import User from "@/models/User";
import { createSessionID, createUserID } from "./helper";

export async function createUser(
	username: string,
	email: string,
	password: string,
	nationality: string,
	countryCode: string,
	number: number
): Promise<mongoose.Types.ObjectId> {

	await connectDB();
	const userID = await createUserID();
	const sessionID = await createSessionID();

	const user = await User.create({
		userID,
		sessionID,
		username,
		email,
		password,
		nationality,
		phoneNumber: {
			countryCode,
			number,
			verified: false
		},
		bookings: [],
	});

	console.log(`User created: ${user._id}`);
	return user._id;
}
