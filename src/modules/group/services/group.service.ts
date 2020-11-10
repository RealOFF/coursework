//Uncomment the code in this file to see typeorm in work

import { IGroupService } from './group.service.interface';
import { logger } from '../../../helpers/logger';
import { Group, GroupType } from "../../../models/entities";
import { EntityManager, getManager } from "typeorm";

class UserService implements IGroupService {
	// eslint-disable-line

	private manager: EntityManager;
	constructor() {
	    this.manager = getManager();
	}

	async create(): Promise<any> {
		try {
            // const group = new Group();
            // group.name = name;
			// group.students = [];

			// const type = await this.manager.findOne(GroupType, {name: typeName});
			// if (type) {
			// 	group.type = type;
			// } else {
			// 	throw Error('Group type is not exist.')
			// }

			// this.manager.save(group);
			logger.info('success');
			// return group;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}

export default new UserService();
