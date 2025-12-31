// import "server-only";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

type UserDetails = {
	username: string;
	email: string;
	nationality: string;
	phoneNumber: {
		countryCode: number;
		number: number;
		verified: boolean;
	};
}

export const getUserDetails = async (userID: string, sessionID: string): Promise<UserDetails> => {
	const user = await User.findOne({ userID, sessionID });
	if (!user) {
		throw new Error("User not found or session expired");
	}

	return {
		username: user.username,
		email: user.email,
		nationality: user.nationality,
		phoneNumber: {
			countryCode: user.phoneNumber.countryCode,
			number: user.phoneNumber.number,
			verified: user.phoneNumber.verified,
		}

	}
}

type UpdateUserDetailsInput = {
	username?: string;
	email?: string;
	nationality?: string;
	phoneNumber?: {
		countryCode?: number;
		number?: number;
		verified?: boolean;
	};
}

export const updateUserDetails = async (
	userID: string,
	details: UpdateUserDetailsInput
) => {
	if (!userID) {
		throw new Error("User Not Found");
  	}

	if (!details) {
  		throw new Error("No details provided");
	}
	const updatedUser = await User.findOneAndUpdate(
		{ userID },
		{ $set: details },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedUser) {
		throw new Error("Updated User not found");
	}

  	return {
		success: true,
		user: {
			username: updatedUser.username,
			email: updatedUser.email,
			nationality: updatedUser.nationality,
			phoneNumber: updatedUser.phoneNumber,
		},
	};
}

export const updateUserPassword = async (
	userID: string,
	currentPassword: string,
	newPassword: string
) => {

	try {
		const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

		if (!saltRounds) {
			throw new Error("Invalid bcrypt salt rounds");
		}

		const user = await User.findById(userID).select("+password");
		if (!user) {
			throw new Error("User not found");
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) {
			throw new Error("Current password is incorrect");
		}
		
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		user.password = hashedPassword;
		await user.save();

		return {
			success: true,
			message: "Password updated successfully",
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Failed to update password";
		throw new Error(errorMessage);
	}
}

export const addBookingToUser = async (userID: string, bookingID: mongoose.Types.ObjectId) => {
	const updatedUser = await User.findOneAndUpdate(
		{ userID },
		{ $addToSet: { bookings: bookingID } },
		{ new: true }
	);

	if (!updatedUser) {
		throw new Error("User not found");
	}

	return updatedUser;
}
