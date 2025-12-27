import mongoose, { Schema, models, Model } from "mongoose";
import { RoomTypes } from "./Room";

interface VacancyTypeEntry {
	count: number;
	rooms: mongoose.Types.ObjectId[];
}

export interface VacancyInterface {
	outlet: mongoose.Types.ObjectId;
	types: Map<RoomTypes, VacancyTypeEntry>;
}

const VacancyTypeSchema = new Schema(
	{
		count: {
			type: Number,
			required: true,
			default: 0,
		},
		rooms: [
			{
				type: Schema.Types.ObjectId,
				ref: "Room",
			},
		],
	},
	{ _id: false }
);

const VacancySchema = new Schema<VacancyInterface>(
	{
		outlet: {
			type: Schema.Types.ObjectId,
			ref: "Outlet",
			required: true,
			unique: true,
		},

		types: {
			type: Map,
			of: VacancyTypeSchema,
			default: {},
		},
	},
	{
		timestamps: true,
	}
);

const Vacancy: Model<VacancyInterface> =
	models.Vacancy || mongoose.model("Vacancy", VacancySchema);

export default Vacancy;