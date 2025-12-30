import mongoose, { Schema, models, Model } from "mongoose";

export enum PaymentStatus {
	PAID = "PAID",
	UNPAID = "UNPAID",
}

export enum StayStatus {
	RESERVED = "RESERVED",
	INHOUSE = "INHOUSE",
	COMPLETED = "COMPLETED",
}

export interface BookInterface {
	booker: mongoose.Types.ObjectId;
	outlet: mongoose.Types.ObjectId;
	floor: mongoose.Types.ObjectId;
	room: mongoose.Types.ObjectId;

	checkInDate: Date;
	checkOutDate: Date;
	bookingDate: Date;
	
	stayStatus: StayStatus,
	paymentStatus: PaymentStatus,
}

const BookSchema = new Schema<BookInterface>
	(
		{
			booker: {
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},

			outlet: {
				type: Schema.Types.ObjectId,
				ref: "Outlet",
				required: true,
			},

			floor: {
				type: Schema.Types.ObjectId,
				ref: "Floor",
				required: true,
			},

			room: {
				type: Schema.Types.ObjectId,
				ref: "Room",
				required: true,
			},

			checkInDate: {
				type: Date,
				required: true,
			},

			checkOutDate: {
				type: Date,
				required: true,
			},

			bookingDate: {
				type: Date,
				required: true,
			},

			stayStatus: {
				type: String,
				enum: Object.values(StayStatus),
				default: StayStatus.RESERVED,
			},

			paymentStatus: {
				type: String,
				enum: Object.values(PaymentStatus),
				default: PaymentStatus.UNPAID,
			},
		},
		{
			timestamps: true,
		}
	);

const Book: Model<BookInterface> =
models.Book || mongoose.model<BookInterface>("Book", BookSchema);

export default Book;
