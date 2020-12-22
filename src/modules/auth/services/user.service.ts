import { EntityManager, getManager } from 'typeorm';

import { USER_ROLES } from '../../../config/constants';
import { logger } from '../../../helpers/logger';
import { User } from '../../../models/entities';
import { ICreateArguments } from './user.service.interface';

export class UserService {
	private manager: EntityManager;
	constructor() {
		this.manager = getManager();
	}

	async getByEmail(email: string) {
		try {
			return await this.manager.findOne(User, { email: email });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async create({ email, password }: ICreateArguments) {
		try {
			const user = new User();
			user.email = email;
			user.password = password;
			user.role = USER_ROLES.COMMON_USER;
			const savedUser = await this.manager.save(user);
			logger.info('success');
			return savedUser;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
