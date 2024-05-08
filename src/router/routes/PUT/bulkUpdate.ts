//External Imports
import { NextFunction, Request, Response } from "express";

//Internal Imports
import { getJobById, updateJob } from "../../../controllers/jobs.controller";
import { JobPriority, JobStatus, Job, JobUpdateParameters } from "../../../types/types";

//Export the Endpoints Function
export default async function (req: Request, res: Response, next: NextFunction) {
	//Get the Updated Jobs from the Body
	const updatedJobs = req.body as Array<Job>;

	//Check if the Updated Jobs was not Provided
	if (!updatedJobs) return res.status(417).json({ error: "List of Updated Jobs are Required" });

	//Setup the Error Holder
	let error = false;

	//Loop through the Updated Jobs
	for (const updatedJob of updatedJobs) {
		//Update the Requested Job
		const job = await updateJob(updatedJob._id!, updatedJob);

		//Check if the Job Could not be Updated
		if (!job) error = true;
	}

	//Check if The Job Could not be Updated and respond with a 500 error
	if (error) return res.status(500).send({ error: "Some Jobs could not be Updated" });

	//Return the Updated Job
	return res.status(200).json("Jobs Updated Successfully");
}
