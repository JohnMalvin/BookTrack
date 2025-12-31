import { randomUUID } from "crypto";
import User from "@/models/User";

export const createRandomID = (): string => {
	return randomUUID();
}

export const apiValidator = async (
  	sessionID: unknown,
  	userID: unknown
) => {
  	if (typeof sessionID !== "string" || !sessionID) {
  	  	throw new Error("Session ID missing");
  	}

	if (typeof userID !== "string" || !userID) {
		throw new Error("User ID missing");
	}

  	await validateUserSession(sessionID);
};
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

export const getUserIDBySession = async (sessionID: string): Promise<string> => {
	const user = await User.findOne({ sessionID });
	if (!user) {
		throw new Error("User Not Found");
	}

	return String(user.userID);
}
export const validateUserSession = async (sessionID: string) => {
	const user = await User.findOne({ sessionID });
	if (!user) {
		throw new Error("Invalid session or user.");
	}
	return user;
}
// ================ BOOKING FUNCTIONS ================
