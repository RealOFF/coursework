import {
	ICreateArguments,
	IUpdateArguments,
} from './faculty.service.interface';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { logger } from '../../../helpers/logger';
import { Faculty } from '../../../models/entities/Faculty';
import { EntityManager, getManager } from 'typeorm';

export class FacultyService
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
	}: ICreateArguments): Promise<Faculty> {
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
			return this.manager.findOne(Faculty, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Faculty, {
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
			return this.manager.delete(Faculty, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		// departments,
	}: IUpdateArguments): Promise<Faculty> {
		try {
			const faculty = new Faculty();
			faculty.id = Number(id);
			faculty.name = name;
			// TODO
			// faculty.departments = ;
			logger.info('success');
			return faculty;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
