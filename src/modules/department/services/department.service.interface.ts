export interface ICreateArguments {
	name: string;
	facultyId?: number;
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
