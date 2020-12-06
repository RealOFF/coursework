import { EntityManager, getManager } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Department, Faculty } from '../../../models/entities';
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
} from './department.service.interface';

export class DepartmentService
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
		name,
		facultyId,
	}: ICreateArguments): Promise<Department | DatabaseError | Error> {
		try {
			const department = new Department();
			department.name = name;
			if (facultyId) {
				const faculty = await this.manager.findOne(Faculty, {
					id: Number(facultyId),
				});
				if (!faculty) {
					const error = new DatabaseError(
						`Faculty id ${facultyId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				department.faculty = faculty;
			}
			const savedDepartment = await this.manager.save(department);
			logger.info('success');
			return savedDepartment;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return await this.manager
				.createQueryBuilder(Department, 'department')
				.where({ id: Number(id) })
				.select([
					'department.id',
					'department.name',
					'faculty.id',
					'faculty.name',
				])
				.leftJoinAndSelect('department.faculty', 'faculty')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(
				Department,
				'department',
			);
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.select([
					'department.id',
					'department.name',
					'faculty.id',
					'faculty.name',
				])
				.leftJoinAndSelect('department.faculty', 'faculty')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(Department, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		facultyId,
	}: IUpdateArguments): Promise<Department | DatabaseError | Error> {
		try {
			const department = new Department();
			department.id = Number(id);
			department.name = name;
			if (facultyId) {
				const faculty = await this.manager.findOne(Faculty, {
					id: Number(facultyId),
				});
				if (!faculty) {
					const error = new DatabaseError(
						`Faculty id ${facultyId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				department.faculty = faculty;
			}
			const savedDepartment = await this.manager.save(department);
			logger.info('success');
			return savedDepartment;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
