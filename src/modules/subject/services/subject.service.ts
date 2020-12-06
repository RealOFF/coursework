import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { Subject, AudienceType } from '../../../models/entities';
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

	async create({ name, audienceTypeIds }: ICreateArguments): Promise<Subject> {
		try {
			const subject = new Subject();
			subject.name = name;
			if (audienceTypeIds?.length) {
				const audienceTypes = await this.manager.find(AudienceType, {
					select: ['id', 'name'],
					where: { id: In(audienceTypeIds.map(Number)) },
				});
				if (!audienceTypes) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subject.audienceTypes = audienceTypes;

			}
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
			return this.manager
				.createQueryBuilder(Subject, 'subject')
				.where({ id: Number(id) })
				.leftJoinAndSelect('subject.audienceType', 'audienceType')
				.getMany();
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

	async update({ id, name, audienceTypeIds }: IUpdateArguments): Promise<Subject> {
		try {
			const subject = new Subject();
			subject.id = Number(id);
			subject.name = name;
			if (audienceTypeIds?.length) {
				const audienceTypes = await this.manager.find(AudienceType, {
					select: ['id', 'name'],
					where: { id: In(audienceTypeIds.map(Number)) },
				});
				if (!audienceTypes) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subject.audienceTypes = audienceTypes;

			}
			await this.manager.save(subject);
			logger.info('success');
			return subject;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
