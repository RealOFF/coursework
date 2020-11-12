//Uncomment the code in this file to see typeorm in work

import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
import { Teacher } from '../../../models/entities';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import {
	ICreateArguments,
	IUpdateArguments,
} from './teacher.service.interface';

export class TeacherService
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

	async create({
		firstName,
		lastName,
		patronymic,
	}: ICreateArguments): Promise<Teacher> {
		try {
			const teacher = new Teacher();
			teacher.firstName = firstName;
			teacher.lastName = lastName;
			teacher.patronymic = patronymic;
			teacher.deparments = [];
			this.manager.save(teacher);
			logger.info('success');
			return teacher;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager.findOne(Teacher, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Teacher, {
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
			return this.manager.delete(Teacher, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		firstName,
		lastName,
		patronymic,
		deparments,
	}: IUpdateArguments): Promise<Teacher> {
		try {
			const teacher = new Teacher();
			teacher.id = Number(id);
			teacher.firstName = firstName;
			teacher.lastName = lastName;
			teacher.patronymic = patronymic;
			teacher.deparments = deparments;
			this.manager.save(teacher);
			logger.info('success');
			return teacher;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
