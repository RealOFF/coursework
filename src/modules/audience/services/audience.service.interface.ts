export interface ICreateArguments {
	name: string;
	typeIds: string[];
	departmentIds: string[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
