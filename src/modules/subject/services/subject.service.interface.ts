export interface ICreateArguments {
	name: string;
	semester: number;
	audienceTypeIds: string[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
