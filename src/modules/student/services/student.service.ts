//Uncomment the code in this file to see typeorm in work

import {
	ICreateArguments,
	IUpdateArguments,
} from './student.service.interface';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { logger } from '../../../helpers/logger';
import { Student } from '../../../models/entities/Student';
import { EntityManager, getManager } from 'typeorm';

export class StudentService
	implements
		ICreate<ICreateArguments>,
		IGetById,
		IGetSkipTake,
		IUpdate<IUpdateArguments>,
		IDeleteById {
	// eslint-disable-line

	private manager: EntityManager;
	constructor() {
		this.manager = getManager();
	}

	async create({
		firstName,
		lastName,
		patronymic,
	}: ICreateArguments): Promise<Student> {
		try {
			const student = new Student();
			student.firstName = firstName;
			student.lastName = lastName;
			student.patronymic = patronymic;
			student.groups = [];
			this.manager.save(student);
			logger.info('success');
			return student;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager.findOne(Student, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Student, {
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
			return this.manager.delete(Student, { id: Number(id) });
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
		groups,
	}: IUpdateArguments): Promise<Student> {
		try {
			const student = new Student();
			student.firstName = firstName;
			student.lastName = lastName;
			student.patronymic = patronymic;
			student.groups = groups;
			this.manager.update(
				Student,
				{ id },
				{ firstName, lastName, patronymic },
			);
			logger.info('success');
			return student;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
