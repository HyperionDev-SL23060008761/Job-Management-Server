//External Imports
import { NextFunction, Request, Response } from "express";

//Internal Imports
import { getJobById, updateJob } from "../../../controllers/jobs.controller";
import { JobPriority, JobStatus, JobUpdateParameters } from "../../../types/types";

//Export the Endpoints Function
export default async function (req: Request, res: Response, next: NextFunction) {
	//Get the Job ID from the Query Parameters
	const jobID = req.query.id as string | undefined;

	//Get the Job's Data from the Request Body
	const { description, location, priority, status }: JobUpdateParameters = req.body;

	//Check if the ID was not Provided
	if (!jobID) return res.status(417).json({ error: "ID is required" });

	//Check if no Update Data was Provided and respond with a 417
	if (!description && !location && !priority && !status)
		return res.status(417).json({ error: "No Update Data Provided" });

	//Get the Requested Job
	const job = await getJobById(req.query.id as string);

	//Check if the Requested Job does not Exist
	if (!job) return res.status(404).send({ error: "Job Not Found" });

	//Check if the Job Priority is not Valid
	if (priority && !Object.values(JobPriority).includes(priority))
		return res.status(417).json({ error: "Priority is not valid" });

	//Check if the Job Status is not Valid
	if (status && !Object.values(JobStatus).includes(status))
		return res.status(417).json({ error: "Status is not valid" });

	//Update the Job's Data
	if (description) job.description = description;
	if (location) job.location = location;
	if (priority) job.priority = priority;
	if (status) job.status = status;

	//Update the Job
	const response = await updateJob(jobID, job);

	//Check if The Job Could not be Updated and respond with a 500 error
	if (!response) return res.status(500).send({ error: "Job could not be updated" });

	//Return the Updated Job
	return res.status(200).json(job);
}
