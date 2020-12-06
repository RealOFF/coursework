import { EntityManager, getManager } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Group, GroupType } from '../../../models/entities';
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

	async create({ name, semester, typeId }: ICreateArguments): Promise<Group> {
		try {
			const group = new Group();
			group.name = name;
			group.semester = semester;
			group.students = [];
			if (typeId) {
				const type = await this.manager.findOne(GroupType, {
					id: Number(typeId),
				});
				if (!type) {
					const error = new DatabaseError(
						`Faculty id ${typeId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				group.type = type;
			}
			const savedGroup = await this.manager.save(group);
			logger.info('success');
			return savedGroup;
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
				.leftJoinAndSelect('group.type', 'type')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(Group, 'group');
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.leftJoinAndSelect('group.students', 'student')
				.leftJoinAndSelect('group.type', 'type')
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

	async update({ id, name, typeId, semester }: IUpdateArguments): Promise<Group> {
		try {
			const group = new Group();
			group.id = Number(id);
			group.name = name;
			group.semester = semester;
			if (typeId) {
				const type = await this.manager.findOne(GroupType, {
					id: Number(typeId),
				});
				if (!type) {
					const error = new DatabaseError(
						`Faculty id ${typeId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				group.type = type;
			}
			const savedGroup = await this.manager.save(group);
			logger.info('success');
			return savedGroup;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
