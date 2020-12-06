import { GroupType } from '../../../models/entities';

export interface ICreateArguments {
	name: string;
	semester: number;
	typeId: GroupType;
}

export interface IUpdateArguments extends ICreateArguments {
	id: string;
}
