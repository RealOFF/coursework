export interface ICreateArguments {
	name: string;
	departmentIds: number[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
