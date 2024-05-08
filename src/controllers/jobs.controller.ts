//Internal Imports
import { FilterQuery } from "mongoose";
import { Job, JobModel } from "../types/types";

//Get a List of Jobs (Filtered by Status if Provided)
export async function getJobs(
	status?: string,
	includeArchived?: boolean
): Promise<Array<Job> | null> {
	//Setup the Filter
	const filter: FilterQuery<Job> = {};

	//Check if the Filter Status is Provided
	if (status) filter.status = status;

	//Check if the Include Archived Flag was Not Provided
	if (!includeArchived) filter.archived = false;

	//Get the List of Jobs, Sorting by Status and Submitted Date
	const jobs = await JobModel.find(filter)
		.sort({ status: 1, submittedDate: 1 })
		.catch(err => {
			return null;
		});

	//Return the List of Jobs
	return jobs;
}

//Creates a New Job using the Job Data
export async function createJob(jobData: Job): Promise<Job | null> {
	//Create the Job
	const newJob = await JobModel.create(jobData).catch(err => {
		console.log(err);
		return false;
	});

	//Check if the Job was not able to be Created
	if (!newJob) return null;

	//Check if Data was not Provided
	if (typeof newJob == "boolean") return null;

	//Return the New Job
	return newJob;
}

//Finds a Job by it's ID
export async function getJobById(jobID: string): Promise<Job | null> {
	//Find the Job
	const job = await JobModel.findById(jobID).catch(err => {
		console.log(err);
		return false;
	});

	//Check if the Job does not Exist
	if (typeof job == "boolean") return null;

	//Return the Job
	return job;
}

//Updates an Existing Job
export async function updateJob(jobID: string, updatedData: Job): Promise<boolean> {
	//Update the Last Updated Timestamp
	updatedData.lastUpdatedDate = new Date();

	//Update the Job
	const updatedJob = await JobModel.findByIdAndUpdate(jobID, updatedData).catch(err => {
		console.log(err);
		return false;
	});

	//Return the Update Status
	return !!updatedJob;
}

//Archives a Job in the Database
export async function archiveJob(jobID: string): Promise<boolean> {
	//Archives the Job in the Database
	const archivedJob = await JobModel.findByIdAndUpdate(jobID, { archived: true }).catch(err => {
		console.log(err);
		return false;
	});

	//Check if the Job could not be Archived and return unsuccessful
	if (!archivedJob) return false;

	//Mark the Archival as successful
	return true;
}

//Deletes a Job from the Database
export async function deleteJob(jobID: string): Promise<boolean> {
	//Delete the Job from the Database
	const deletedJob = await JobModel.deleteOne({ _id: jobID }).catch(err => {
		console.log(err);
		return false;
	});

	//Check if the Job could not be deleted and return unsuccessful
	if (!deletedJob) return false;

	//Mark the Deletion as successful
	return true;
}

//Checks if a Job Exists
export async function jobExists(jobID: string): Promise<boolean> {
	//Check if the Job Exists in the Dabase
	const jobExists = await JobModel.exists({ _id: jobID }).catch(err => {
		console.log(err);
		return false;
	});

	//Return the Existence Status of the Job
	return !!jobExists;
}
