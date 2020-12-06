import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Department, AudienceType } from '../../../models/entities';
import { Audience } from '../../../models/entities/Audience';
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
} from './audience.service.interface';

export class AudienceService
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
		typeIds,
		departmentIds,
	}: ICreateArguments): Promise<Audience> {
		try {
			const audience = new Audience();
			audience.name = name;
			if (typeIds?.length) {
				const types = await this.manager.find(AudienceType, {
					select: ['id', 'name'],
					where: { id: In(typeIds.map(Number)) },
				});
				if (!types) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				audience.types = types;
			}
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
				audience.departments = departments;
			}
			await this.manager.save(audience);
			logger.info('success');
			return audience;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return await this.manager
				.createQueryBuilder(Audience, 'audience')
				.where({ id: Number(id) })
				.leftJoinAndSelect('audience.types', 'type')
				.leftJoinAndSelect('audience.departments', 'department')
				.select([
					'audience.id',
					'audience.name',
					'type.id',
					'type.name',
					'department.id',
					'department.name',
				])
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(
				Audience,
				'audience',
			);
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
				.leftJoinAndSelect('audience.types', 'type')
				.leftJoinAndSelect('audience.departments', 'department')
				.select([
					'audience.id',
					'audience.name',
					'type.id',
					'type.name',
					'department.id',
					'department.name',
				])
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(Audience, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		typeIds,
		departmentIds,
	}: IUpdateArguments): Promise<Audience> {
		try {
			const audience = new Audience();
			audience.id = Number(id);
			audience.name = name;
			if (typeIds?.length) {
				const types = await this.manager.find(AudienceType, {
					select: ['id', 'name'],
					where: { id: In(typeIds.map(Number)) },
				});
				if (!types) {
					const error = new DatabaseError(`Departments not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				audience.types = types;
			}
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
				audience.departments = departments;
			}
			await this.manager.save(audience);
			logger.info('success');
			return audience;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
