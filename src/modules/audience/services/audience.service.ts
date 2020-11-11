import {
	ICreateArguments,
	IUpdateArguments,
} from './audience.service.interface';
import {
	ICreate,
	IGetById,
	IGetSkipTake,
	IUpdate,
	IDeleteById,
} from '../../base.service.interface';
import { logger } from '../../../helpers/logger';
import { Audience } from '../../../models/entities/Audience';
import { EntityManager, getManager } from 'typeorm';

export class AudienceService
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
		name
	}: ICreateArguments): Promise<Audience> {
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

	async getSkipTake(skip: string, take: string) {
		try {
			return this.manager.find(Audience, {
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
		deparments
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
