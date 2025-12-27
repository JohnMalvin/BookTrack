import mongoose, { Schema, models, Model } from "mongoose";

export interface FloorInterface {
	floorNumber: number;
	outlet: mongoose.Types.ObjectId;
	rooms: mongoose.Types.ObjectId[];
}

const FloorSchema = new Schema<FloorInterface>
	(
		{
			floorNumber: {
				type: Number,
				required: true,
			},
			
			outlet: {
				type: Schema.Types.ObjectId,
				ref: "Outlet",
				required: true,
			},

			rooms: [
			{
				type: Schema.Types.ObjectId,
				ref: "Room",
				required: true,
			},
			],
		},
		{
			timestamps: true,
		}
	);

FloorSchema.index(
	{ outlet: 1, floorNumber: 1},
	{ unique: true }
);

const Floor: Model<FloorInterface> =
models.Floor || mongoose.model<FloorInterface>("Floor", FloorSchema);

export default Floor;
