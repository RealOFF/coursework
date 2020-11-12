import { EntityManager, getManager } from 'typeorm';
import {
	ICreateArguments,
	IUpdateArguments,
} from './department.service.interface';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { logger, DatabaseError } from '../../../helpers';
import { Department, Faculty } from '../../../models/entities';

export class DepartmentService
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
		name,
		facultyId
	}: ICreateArguments): Promise<Department|DatabaseError|Error> {
		try {
			const department = new Department();
			department.name = name;
			const faculty = await this.manager.findOne(Faculty, { id: Number(facultyId)});
			if (!faculty) {
				const error = new DatabaseError(`Faculty id ${facultyId} not found.`);
				error.reason = DatabaseError.REASONS.NOT_FOUND;
				throw error;
			}
			department.faculty = faculty;
			this.manager.save(department);
			logger.info('success');
			return department;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager.findOne(Department, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Department, {
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
	}: IUpdateArguments): Promise<Department|DatabaseError|Error> {
		try {
			const department = new Department();
			department.id = Number(id);
			department.name = name;
			const faculty = await this.manager.findOne(Faculty, { id: Number(facultyId)});
			if (!faculty) {
				const error = new DatabaseError(`Faculty id ${facultyId} not found.`);
				error.reason = DatabaseError.REASONS.NOT_FOUND;
				throw error;
			}
			department.faculty = faculty;
			await this.manager.save(department);
			logger.info('success');
			return department;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
