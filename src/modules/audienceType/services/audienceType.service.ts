import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
import { AudienceType } from '../../../models/entities/AudienceType';
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
} from './audienceType.service.interface';

export class AudienceTypeService
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

	async create({ name }: ICreateArguments): Promise<AudienceType> {
		try {
			const audienceType = new AudienceType();
			audienceType.name = name;
			audienceType.audiences = [];
			audienceType.subjects = [];
			this.manager.save(audienceType);
			logger.info('success');
			return audienceType;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager.findOne(AudienceType, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			return this.manager
				.createQueryBuilder(AudienceType, 'audienceType')
				.offset(Number(offset))
				.limit(Number(limit))
				.select([
					'audienceType.id',
					'audienceType.name',
					'subject.id',
					'subject.name',
					'audience.id',
					'audience.name'
				])
				.leftJoinAndSelect('audienceType.subjects', 'subject')
				.leftJoinAndSelect('audienceType.audiences', 'audience')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return this.manager.delete(AudienceType, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({
		id,
		name,
		audiences,
		subjects,
	}: IUpdateArguments): Promise<AudienceType> {
		try {
			const audienceType = new AudienceType();
			audienceType.id = Number(id);
			audienceType.name = name;
			audienceType.audiences = audiences;
			audienceType.subjects = subjects;
			logger.info('success');
			return audienceType;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
