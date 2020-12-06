//Uncomment the code in this file to see typeorm in work

import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Teacher, Department } from '../../../models/entities';
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
} from './teacher.service.interface';

export class TeacherService
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

	async create({
		firstName,
		lastName,
		patronymic,
		departmentIds,
	}: ICreateArguments): Promise<Teacher> {
		try {
			const teacher = new Teacher();
			teacher.firstName = firstName;
			teacher.lastName = lastName;
			teacher.patronymic = patronymic;
			if (departmentIds?.length) {
				const departments = await this.manager.find(Department, {
					select: ['id', 'name'],
					where: { id: In(departmentIds.map(Number)) },
				});
				if (!departments) {
					const error = new DatabaseError(`Departments not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				teacher.departments = departments;
			}
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
			return this.manager
				.createQueryBuilder(Teacher, 'techer')
				.where({ id: Number(id) })
				.leftJoinAndSelect('techer.departments', 'department')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(Teacher, 'teacher');
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.select([
					'teacher.id',
					'teacher.name',
					'department.id',
					'department.name',
				])
				.leftJoinAndSelect('teacher.departments', 'department')
				.getMany();
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
		departmentIds,
	}: IUpdateArguments): Promise<Teacher> {
		try {
			const teacher = new Teacher();
			teacher.id = Number(id);
			teacher.firstName = firstName;
			teacher.lastName = lastName;
			teacher.patronymic = patronymic;
			if (departmentIds?.length) {
				const departments = await this.manager.find(Department, {
					select: ['id', 'name'],
					where: { id: In(departmentIds.map(Number)) },
				});
				if (!departments) {
					const error = new DatabaseError(`Departments not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				teacher.departments = departments;
			}

			this.manager.save(teacher);
			logger.info('success');
			return teacher;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
