import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
import { GroupType } from '../../../models/entities/GroupType';
import {
	ICreate,
	IGetById,
	IGetOffsetLimit,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import {
	ICreateArguments,
	IUpdateArguments,
} from './groupType.service.interface';

export class GroupTypeService
	implements
		ICreate<ICreateArguments>,
		IGetById,
		IGetOffsetLimit,
		IUpdate<IUpdateArguments>,
		IDeleteById {
	private manager: EntityManager;
	constructor() {
		this.manager = getManager();
	}

	async create({ name }: ICreateArguments): Promise<GroupType> {
		try {
			const groupType = new GroupType();
			groupType.name = name;
			groupType.groups = [];
			const savedGroupType = await this.manager.save(groupType);
			logger.info('success');
			return savedGroupType;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return await this.manager
				.createQueryBuilder(GroupType, 'groupType')
				.where({ id: Number(id) })
				.select([
					'groupType.id',
					'groupType.name',
					'group.id',
					'group.name',
				])
				.leftJoinAndSelect('groupType.groups', 'group')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(
				GroupType,
				'groupType',
			);
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.select([
					'groupType.id',
					'groupType.name',
					'group.id',
					'group.name',
				])
				.leftJoinAndSelect('groupType.groups', 'group')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(GroupType, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({ id, name }: IUpdateArguments): Promise<GroupType> {
		try {
			const groupType = new GroupType();
			groupType.id = Number(id);
			groupType.name = name;
			const savedGroupType = await this.manager.save(groupType);
			logger.info('success');
			return savedGroupType;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
