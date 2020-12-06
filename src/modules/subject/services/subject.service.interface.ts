export interface ICreateArguments {
	name: string;
	audienceTypeIds: string[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
