//Internal Imports
import { JobPriority, JobStatus } from "../types";

//Setup the Job Interface
export interface Job {
	_id?: string;
	description: string;
	location: string;
	priority: JobPriority;
	status: JobStatus;
	archived: boolean;
	submittedDate: Date;
	lastUpdatedDate?: Date;
}
