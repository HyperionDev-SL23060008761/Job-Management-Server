//Internal Imports
import { Schema, model } from "mongoose";

//Internal Imports
import { Job, JobStatus } from "../types";

//Setup the Schema
const jobSchema = new Schema<Job>({
	description: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: JobStatus.SUBMITTED,
	},
	archived: {
		type: Boolean,
		default: false,
	},
	submittedDate: {
		type: Date,
		default: new Date(),
	},
	lastUpdatedDate: {
		type: Date,
		default: new Date(),
	},
});

//Export the Model
export const JobModel = model("Job", jobSchema);
