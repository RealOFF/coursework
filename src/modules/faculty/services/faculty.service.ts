import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Faculty, Department } from '../../../models/entities';
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
} from './faculty.service.interface';

export class FacultyService
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
		name,
	}: // facultyId
	ICreateArguments): Promise<Faculty> {
		try {
			const faculty = new Faculty();
			faculty.name = name;
			faculty.departments = [];
			this.manager.save(faculty);
			logger.info('success');
			return faculty;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager
				.createQueryBuilder(Faculty, 'faculty')
				.where({ id: Number(id) })
				.select([
					'faculty.id',
					'faculty.name',
					'department.id',
					'department.name',
				])
				.leftJoinAndSelect('faculty.departments', 'department')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager
				.createQueryBuilder(Faculty, 'faculty')
				.offset(Number(skip))
				.limit(Number(take))
				.select([
					'faculty.id',
					'faculty.name',
					'department.id',
					'department.name',
				])
				.leftJoinAndSelect('faculty.departments', 'department')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(Faculty, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		departmentIds,
	}: IUpdateArguments): Promise<Faculty> {
		try {
			const faculty = new Faculty();
			faculty.id = Number(id);
			faculty.name = name;
			const departments = await this.manager.find(Department, {
				select: ['id', 'name', 'createdAt'],
				where: { id: In(departmentIds.map(Number)) },
			});
			if (!departments) {
				const error = new DatabaseError(`Departments not found.`);
				error.reason = DatabaseError.REASONS.NOT_FOUND;
				throw error;
			}
			faculty.departments = departments;
			this.manager.save(faculty);
			logger.info('success');
			return faculty;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
