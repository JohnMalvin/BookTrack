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
export const checkUserExistByID = async (userID: string): Promise<boolean> => {
	const exist = await User.findOne({ userID });
	return (exist !== null);
}

export const validateUserByUsername = async (username: string, password: string): Promise<string> => {
	const user = await User.findOne({ username, password });
	if (user) {
		return user.userID;
	}
	throw new Error("Either username or password is incorrect");
}

export const validateUserByEmail = async (email: string, password: string): Promise<string> => {
	const user = await User.findOne({ email, password });
	if (user) {
		return user.userID;
	}
	throw new Error("Either username or email is incorrect");
}
// ================ BOOKING FUNCTIONS ================
