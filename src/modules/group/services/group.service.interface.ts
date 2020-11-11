import { GroupType } from '../../../models/entities';

export interface ICreateArguments {
	name: string;
	type: GroupType;
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
	students: any[];
}
