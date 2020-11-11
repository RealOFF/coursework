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
import { logger } from '../../../helpers/logger';
import { Department } from '../../../models/entities/Department';
import { EntityManager, getManager } from 'typeorm';

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
		// facultyId
	}: ICreateArguments): Promise<Department> {
		try {
			const department = new Department();
			department.name = name;
			// TODO
			// department.faculty = ;
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
		// facultyId,
	}: IUpdateArguments): Promise<Department> {
		try {
			const department = new Department();
			department.id = Number(id);
			department.name = name;
			// TODO
			// department.faculty = ;
			logger.info('success');
			return department;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
