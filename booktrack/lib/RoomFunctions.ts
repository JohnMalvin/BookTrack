// import "server-only";
import mongoose from "mongoose";
import { connectDB } from "./mongoose";
import Room, { RoomStatus, RoomTypes } from "@/models/Room";

export async function createRoom(
	outletID: mongoose.Types.ObjectId
): Promise<mongoose.Types.ObjectId> {
	
	await connectDB();
	const room = await Room.create({
		floor: 0,
		outlet: outletID,
		roomNumber: 0,
		bookings: [],
		roomType: RoomTypes.UNASSIGNED,
		status: RoomStatus.AVAILABLE,
		price: 0,
		numOfBeds: 0,
		numOfToilets: 0,
		numOfOccupants: 0,
		checkInDate: "",
		checkOutDate: "",
	});

	console.log(`Room Created: ${room._id}`);
	return room._id;
}
