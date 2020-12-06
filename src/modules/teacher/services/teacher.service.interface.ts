export interface ICreateArguments {
	firstName: string;
	lastName: string;
	patronymic?: string;
	departmentIds: any[];
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
