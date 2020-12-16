import { EntityManager, getManager, In } from 'typeorm';

import { logger, DatabaseError } from '../../../helpers';
import { SubjectSession, Subject, Teacher, Audience, Group } from '../../../models/entities';
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
} from './subjectSession.service.interface';
import { SUBJECT_SESSIONS_STATUSES } from '../../../config/constants';

export class SubjectSessionService
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
        startTime,
        endTime,
        audienceId,
        subjectId,
        teacherIds,
        groupIds,
	}: ICreateArguments): Promise<SubjectSession> {
		try {
			const subjectSession = new SubjectSession();
			subjectSession.startTime = new Date(startTime);
			subjectSession.endTime = new Date(endTime);
			subjectSession.status = SUBJECT_SESSIONS_STATUSES.PENDING;
            if (audienceId) {
				const audience = await this.manager.findOne(Audience, {
					id: Number(audienceId),
				});
				if (!audience) {
					const error = new DatabaseError(
						`Audience id ${audienceId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.audience = audience;
            }
            if (subjectId) {
				const subject = await this.manager.findOne(Subject, {
					id: Number(subjectId),
				});
				if (!subject) {
					const error = new DatabaseError(
						`Subject id ${subjectId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.subject = subject;
			}
			if (teacherIds?.length) {
				const teachers = await this.manager.find(Teacher, {
					// select: ['id', 'name'],
					where: { id: In(teacherIds.map(Number)) },
				});
				if (!teachers) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.teachers = teachers;
            }
            if (groupIds?.length) {
				const groups = await this.manager.find(Group, {
					where: { id: In(groupIds.map(Number)) },
				});
				if (!groups) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.groups = groups;
			}
			const savedSubjectSession = await this.manager.save(subjectSession);
			logger.info('success');
			return savedSubjectSession;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getById(id: string) {
		try {
			return this.manager
				.createQueryBuilder(SubjectSession, 'subjectSession')
				.where({ id: Number(id) })
				.leftJoinAndSelect('subjectSession.audienceType', 'audienceType')
				.getMany();
		} catch (error) {
			logger.error(error);
			return error;
		}
	}

	async getOffsetLimit(offset: string, limit: string) {
		try {
			const result = this.manager.createQueryBuilder(SubjectSession, 'subjectSession');
			offset && result.offset(Number(offset));
			limit && result.limit(Number(limit));

			return result
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

	async update({
		id,
		startTime,
        endTime,
        audienceId,
        subjectId,
        teacherIds,
        groupIds,
	}: IUpdateArguments): Promise<SubjectSession> {
		try {
			const subjectSession = new SubjectSession();
			subjectSession.id = Number(id);
			subjectSession.startTime = new Date(startTime);
            subjectSession.endTime = new Date(endTime);
            if (audienceId) {
				const audience = await this.manager.findOne(Audience, {
					id: Number(audienceId),
				});
				if (!audience) {
					const error = new DatabaseError(
						`Audience id ${audienceId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.audience = audience;
            }
            if (subjectId) {
				const subject = await this.manager.findOne(Subject, {
					id: Number(subjectId),
				});
				if (!subject) {
					const error = new DatabaseError(
						`Subject id ${subjectId} not found.`,
					);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.subject = subject;
			}
			if (teacherIds?.length) {
				const teachers = await this.manager.find(Teacher, {
					// select: ['id', 'name'],
					where: { id: In(teacherIds.map(Number)) },
				});
				if (!teachers) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.teachers = teachers;
            }
            if (groupIds?.length) {
				const groups = await this.manager.find(Group, {
					where: { id: In(groupIds.map(Number)) },
				});
				if (!groups) {
					const error = new DatabaseError(`Types not found.`);
					error.reason = DatabaseError.REASONS.NOT_FOUND;
					throw error;
				}
				subjectSession.groups = groups;
			}
			const savedSubjectSession = await this.manager.save(subjectSession);
			logger.info('success');
			return savedSubjectSession;
		} catch (error) {
			logger.error(error);
			return error;
		}
	}
}
