//External Imports
import { NextFunction, Request, Response } from "express";

//Internal Imports
import { createJob } from "../../../controllers/jobs.controller";
import { Job, JobPriority, JobStatus, JobUpdateParameters } from "../../../types/types";

//Export the Endpoints Function
export default async function (req: Request, res: Response, next: NextFunction) {
	//Get the Job's Data from the Request Body
	const { description, location, priority }: JobUpdateParameters = req.body;

	//Check if the user did not provide the Description and respond with a 417
	if (!description) return res.status(417).json({ error: "description is required" });

	//Check if the user did not provide the Location and respond with a 417
	if (!location) return res.status(417).json({ error: "location is required" });

	//Check if the user did not provide the Priority and respond with a 417
	if (!priority) return res.status(417).json({ error: "priority is required" });

	//Check if the Priorit is not a Valid Priority ("low" | "medium" | "high")
	if (!Object.values(JobPriority).includes(priority))
		return res.status(417).json({ error: "priority is not valid" });

	//Setup the New Job
	const newJob: Job = {
		description: description,
		location: location,
		priority: priority,
		archived: false,
		status: JobStatus.SUBMITTED,
		submittedDate: new Date(),
	};

	//Create the New Job
	const createdJob = await createJob(newJob);

	//Check if the Job was not able to be Created and response with a 500 error
	if (!createdJob) return res.status(500).json({ error: "Failed to Create the Job" });

	//Return Successful Creation Status with a 201
	return res.status(201).send(createdJob);
}
