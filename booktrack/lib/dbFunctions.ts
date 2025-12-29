// import "server-only";
import { connectDB } from "./mongoose";
import User from "@/models/User";

export async function createUser() {
	console.log("before connectDB");

	await connectDB();

	console.log("after connectDB");

	await User.create({
		userID: "user_001",
		sessionID: "sess_001",
		username: "john",
		email: "john@example.com",
		password: "hashed_password",
		nationality: "USA",
		phoneNumber: {
			countryCode: 1,
			number: 1234567890,
		},
		bookings: [],
	});

	console.log("User created");
}
