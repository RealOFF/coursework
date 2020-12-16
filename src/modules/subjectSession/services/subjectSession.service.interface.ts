export interface ICreateArguments {
	startTime: string;
	endTime: string;
	audienceId: string;
	subjectId: string;
	teacherIds: string[];
	groupIds: string[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
