import { randomUUID } from "crypto";
import User from "@/models/User";

export const createRandomID = (): string => {
	return randomUUID();
}
// ================ USER FUNCTIONS ================

export const createUserID = async (): Promise<string> => {
	let userID = createRandomID();

	let exists = await User.findOne({ userID });
	while (exists) {
		userID = createRandomID();
		exists = await User.findOne({ userID });
	}
	return String(userID);
}

export const createSessionID = async (): Promise<string> => {
	let sessionID = createRandomID();
	
	let exists = await User.findOne({ sessionID });
	while (exists) {
		sessionID = createRandomID();
		exists = await User.findOne({ sessionID });
	}
	return String(sessionID);
}


// ================ BOOKING FUNCTIONS ================
