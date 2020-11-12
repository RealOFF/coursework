import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
import { Group } from '../../../models/entities/Group';
import {
	ICreate,
	IGetById,
	IGetOffsetLimit,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { ICreateArguments, IUpdateArguments } from './group.service.interface';

export class GroupService
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

	async create({ name, type }: ICreateArguments): Promise<Group> {
		try {
			const group = new Group();
			group.name = name;
			group.type = type;
			group.students = [];
			this.manager.save(group);
			logger.info('success');
			return group;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager
				.createQueryBuilder(Group, 'group')
				.where({ id: Number(id) })
				.leftJoinAndSelect('group.students', 'student')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			return this.manager
				.createQueryBuilder(Group, 'group')
				.offset(Number(offset))
				.limit(Number(limit))
				.leftJoinAndSelect('group.students', 'student')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(Group, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		type,
		students,
	}: IUpdateArguments): Promise<Group> {
		try {
			const group = new Group();
			group.id = Number(id);
			group.name = name;
			group.type = type;
			group.students = students;
			logger.info('success');
			return group;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
