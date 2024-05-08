//External Imports
import { NextFunction, Request, Response } from "express";

//Internal Imports
import { jobExists, archiveJob } from "../../../controllers/jobs.controller";

//Export the Endpoints Function
export default async function (req: Request, res: Response, next: NextFunction) {
	//Get the Job ID from the Query Parameters
	const jobID = req.query.id as string | undefined;

	//Check if no Job ID was provided and return a 417
	if (jobID == undefined || jobID.length < 1)
		return res.status(417).send({ error: "Job ID is required" });

	//Setup the Variable to Check if the Job Exists
	const jobExistStatus = await jobExists(jobID);

	//Check if the Request Job could not be Found
	if (!jobExistStatus) return res.status(404).send({ error: "Job Not Found" });

	//Archive the Job
	const result = await archiveJob(jobID);

	//Check if the Job was not able to be Archived and response with a 500 error
	if (!result) return res.status(500).json({ error: "Failed to Archive the Job" });

	//Return with a 200 Response
	return res.status(200).send({ message: "Job Archived successfully" });
}
