export interface ICreateArguments {
	firstName: string;
	lastName: string;
	patronymic?: string;
	groupIds?: number[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
