import mongoose, { Schema, models, Model } from "mongoose";

export interface OutletInterface {
	address: string;
	availability: mongoose.Types.ObjectId;
	rooms: mongoose.Types.ObjectId[];
	floors: mongoose.Types.ObjectId[];
	numOfRooms: number;
	numOfFloors: number;
}

const OutletSchema = new Schema<OutletInterface>
	(
		{
			address: {
				type: String,
				required: true,
			},

			availability: 
			{
				type: Schema.Types.ObjectId,
				ref: "Vacancy",
			},

			rooms: [
			{
				type: Schema.Types.ObjectId,
					ref: "Room",
					required: true,
				},
			],
			
			floors: [
			{
				type: Schema.Types.ObjectId,
				ref: "Floor",
				required: true,
			},
			],

			numOfRooms: {
				type: Number,
				required: true,
				default: 0,
			},

			numOfFloors: {
				type: Number,
				required: true,
				default: 0,
			}
		},
		{
			timestamps: true,
		}
	);

OutletSchema.index(
	{ outlet: 1, OutletNumber: 1},
	{ unique: true }
);

const Outlet: Model<OutletInterface> =
models.Outlet || mongoose.model<OutletInterface>("Outlet", OutletSchema);

export default Outlet;
