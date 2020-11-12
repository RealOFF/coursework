import { ICreateArguments, IUpdateArguments } from './group.service.interface';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { logger } from '../../../helpers/logger';
import { Group } from '../../../models/entities/Group';
import { EntityManager, getManager } from 'typeorm';

export class GroupService
	implements
		ICreate<ICreateArguments>,
		IGetById,
		IGetSkipTake,
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
			return this.manager.findOne(Group, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Group, {
				skip: Number(skip),
				take: Number(take),
			});
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
