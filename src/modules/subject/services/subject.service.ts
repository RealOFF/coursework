import { EntityManager, getManager } from 'typeorm';

import { logger } from '../../../helpers/logger';
import { Subject } from '../../../models/entities/Subject';
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
} from './subject.service.interface';

export class SubjectService
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

	async create({ name }: ICreateArguments): Promise<Subject> {
		try {
			const subject = new Subject();
			subject.name = name;
			// TODO
			//subject.audienceTypes = ;
			await this.manager.save(subject);
			logger.info('success');
			return subject;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return await this.manager.findOne(Subject, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager
				.createQueryBuilder(Subject, 'subject')
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));
			
			return result
				.select([
					'subject.id',
					'subject.name',
					'audienceType.id',
					'audienceType.name',
				])
				.leftJoinAndSelect('subject.audienceTypes', 'audienceType')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async deleteById(id: string) {
		try {
			return await this.manager.delete(Subject, { id: Number(id) });
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async update({ id, name }: IUpdateArguments): Promise<Subject> {
		try {
			const subject = new Subject();
			subject.id = Number(id);
			subject.name = name;
			// TODO
			//subject.audienceTypes = ;
			this.manager.update(Subject, { id: Number(id) }, { name });
			// await this.manager.save(student);
			logger.info('success');
			return subject;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
