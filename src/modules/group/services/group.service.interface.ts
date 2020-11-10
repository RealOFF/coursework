export interface IGroupService {
	create(data: {name: string, typeName: string}): Promise<any>;
}
