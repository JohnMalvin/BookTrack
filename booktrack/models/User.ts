import "server-only";
import mongoose, { Schema, models, Model } from "mongoose";

interface phoneNumberType {
	countryCode: number;
	number: number;
	verified: boolean;
}

export interface UserInterface {
	userID: string;
	sessionID: string;
	username: string;
	email: string;
	password: string;
	phoneNumber: phoneNumberType;
	nationality: string;
	bookings: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<UserInterface>
	(
		{
			userID: {
				type: String,
				required: true,
			},

			sessionID: {
				type: String,
				required: true,
			},

			username: {
				type: String,
				required: true,
			},

			email: {
				type: String,
				required: true,
			},

			phoneNumber: {
				countryCode: {
					type: Number,
					required: true,
				},
				number: {
					type: Number,
					required: true,
				},
				verified: {
					type: Boolean,
					default: false,
				}
			},

			nationality: {
				type: String,
				required: true,
			},

			password: {
				type: String,
				required: true,
			},
			
			bookings: [
			{
				type: Schema.Types.ObjectId,
				ref: "Book",
				required: true,
			},
			],
		},
		{
			timestamps: true,
		}
	);

UserSchema.index(
	{ userID: 1, sessionID: 1},
	{ unique: true }
);

const User: Model<UserInterface> =
models.User || mongoose.model<UserInterface>("User", UserSchema);

export default User;
