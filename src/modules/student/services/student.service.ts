import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Student, Group } from '../../../models/entities';
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
} from './student.service.interface';

export class StudentService
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
		groupIds,
	}: ICreateArguments): Promise<Student> {
		try {
			const student = new Student();
			student.firstName = firstName;
			student.lastName = lastName;
			student.patronymic = patronymic;
			if (groupIds?.length) {
				const groups = await this.manager.find(Group, {
					select: ['id', 'name'],
					where: { id: In(groupIds.map(Number)) },
				});
				if (!groups) {
					const error = new DatabaseError(`Groups not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				student.groups = groups;
			}
			const savedStudent = await this.manager.save(student);
			logger.info('success');
			return savedStudent;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager
				.createQueryBuilder(Student, 'student')
				.where({ id: Number(id) })
				.leftJoinAndSelect('student.groups', 'group')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(Student, 'student');
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.leftJoinAndSelect('student.groups', 'group')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return await this.manager.delete(Student, { id: Number(id) });
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
		groupIds,
	}: IUpdateArguments): Promise<Student> {
		try {
			const student = new Student();
			student.id = Number(id);
			student.firstName = firstName;
			student.lastName = lastName;
			student.patronymic = patronymic;
			if (groupIds?.length) {
				const groups = await this.manager.find(Group, {
					select: ['id', 'name'],
					where: { id: In(groupIds.map(Number)) },
				});
				if (!groups) {
					const error = new DatabaseError(`Groups not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				student.groups = groups;
			}
			const savedStudent = await this.manager.save(student);
			logger.info('success');
			return savedStudent;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
