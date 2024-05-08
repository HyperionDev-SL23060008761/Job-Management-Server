//External Imports
import { NextFunction, Request, Response } from "express";

//Internal Imports
import { getJobs, getJobById } from "../../../controllers/jobs.controller";

//Export the Endpoints Function
export default async function (req: Request, res: Response, next: NextFunction) {
	//Get the Job ID from the Query Parameters
	const jobID = req.query.id as string | undefined;

	//Get the Job Status from the Query Parameters
	const jobStatus = req.query.status as string | undefined;

	//Get the Include Archived Flag from the Query Parameters
	const includeArchived = req.query.archived == "true" ? true : false;

	//Get the Job using the Job ID (Or list of Jobs if no ID was provided)
	const jobs = jobID ? await getJobById(jobID) : await getJobs(jobStatus, includeArchived);

	//Check if no Job could be Found
	if (!jobs) return res.status(404).send({ error: "Job Not Found" });

	//Return the Jobs
	return res.status(200).json(jobs);
}
