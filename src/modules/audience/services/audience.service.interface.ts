export interface ICreateArguments {
	name: string;
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
	types: any[];
	deparments: any[];
}
