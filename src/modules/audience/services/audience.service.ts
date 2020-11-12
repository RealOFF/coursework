import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
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

	async create({ name }: ICreateArguments): Promise<Audience> {
		try {
			const audience = new Audience();
			audience.name = name;
			audience.types = [];
			audience.deparments = [];
			this.manager.save(audience);
			logger.info('success');
			return audience;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager.findOne(Audience, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			return this.manager
			.createQueryBuilder(Audience, 'audience')
			.offset(Number(offset))
			.limit(Number(limit))
			.select([
				'audience.id',
				'audience.name',
				'type.id',
				'type.name',
			])
			.leftJoinAndSelect('audience.types', 'type')
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
		types,
		deparments,
	}: IUpdateArguments): Promise<Audience> {
		try {
			const audience = new Audience();
			audience.id = Number(id);
			audience.name = name;
			audience.types = types;
			audience.deparments = deparments;
			logger.info('success');
			return audience;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
