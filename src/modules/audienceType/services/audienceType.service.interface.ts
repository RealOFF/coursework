export interface ICreateArguments {
	name: string;
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
	audiences: any[];
	subjects: any[];
}
