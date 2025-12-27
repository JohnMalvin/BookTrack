import mongoose, {Schema, Model, models} from "mongoose"

export enum RoomTypes {
	SINGLE = "SINGLE",
	DOUBLE = "DOUBLE",
	SUITE = "SUITE",
	FAMILY = "FAMILY",
	REGULAR = "REGULAR"
}

export enum RoomStatus {
	AVAILABLE = "AVAILABLE",
	BOOKED = "BOOKED",
	OCCUPIED = "OCCUPIED",
}

export interface RoomInterface {
	floor: number;
	outlet: mongoose.Types.ObjectId;
	roomNumber: number;
	bookings: Date[];

	roomType: RoomTypes;
	status: RoomStatus;
	price: number;

	numOfBeds: number;
	numOfToilets: number;
	numOfOccupants: number;

	checkInDate?: Date;
	checkOutDate?: Date;
}

const RoomSchema = new Schema<RoomInterface>(
  	{
		floor: {
			type: Number,
			required: true,
		},

		outlet: {
			type: Schema.Types.ObjectId,
			ref: "Outlet",
			required: true,
		},

		roomNumber: {
			type: Number,
			required: true,
		},

		bookings: [
			{
				type: Date,
			},
		],

		roomType: {
			type: String,
			enum: Object.values(RoomTypes),
			required: true,
		},

		status: {
			type: String,
			enum: Object.values(RoomStatus),
			default: RoomStatus.AVAILABLE,
		},

		price: {
			type: Number,
			required: true,
		},

  	  	numOfBeds: {
			type: Number,
			required: true,
			default: 0
		},
		
  	  	numOfToilets: {
			type: Number,
			required: true,
			default: 0
		},
		
  	  	numOfOccupants: {
			type: Number,
			required: true,
			default: 0
		},
		

  	  	checkInDate: Date,
  	  	checkOutDate: Date,
  	},
  	{
  	  timestamps: true,
  	}
);

RoomSchema.index(
	{ outlet: 1, roomNumber: 1 },
	{ unique: true }
);

export default mongoose.models.Room || mongoose.model<RoomInterface>("Room", RoomSchema);