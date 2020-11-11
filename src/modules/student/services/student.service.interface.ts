export interface ICreateArguments {
	firstName: string;
	lastName: string;
	patronymic?: string;
}

export interface IUpdateArguments extends ICreateArguments {
	id: number;
	groups: Array<any>;
}
