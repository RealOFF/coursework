import { Request, Response, Router } from 'express';
import { param, query, body, validationResult } from 'express-validator';

import { USER_ROLES } from '../../config/constants';
import { rbacMiddleware } from '../../helpers/rbac';
import { IRouter } from '../router.interface';
import { SubjectService } from './services/subject.service';

const router = Router();

export class SubjectRouter implements IRouter {
	private subjectService: SubjectService;

	constructor() {
		this.subjectService = new SubjectService();
	}

	get routes() {
		router.get(
			'/all',
			rbacMiddleware([USER_ROLES.ADMIN, USER_ROLES.COMMON_USER]),
			[
				query('offset').optional().isNumeric(),
				query('limit').optional().isNumeric(),
			],
			rbacMiddleware([USER_ROLES.ADMIN, USER_ROLES.COMMON_USER]),
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.subjectService.getOffsetLimit(
						req.query.offset as string,
						req.query.limit as string,
					);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		router.get(
			'/:id',
			rbacMiddleware([USER_ROLES.ADMIN, USER_ROLES.COMMON_USER]),
			[param('id').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.subjectService.getById(
						req.params.id,
					);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		router.delete(
			'/:id',
			rbacMiddleware([USER_ROLES.ADMIN]),
			[param('id').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.subjectService.deleteById(
						req.params.id,
					);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		router.post(
			'/',
			rbacMiddleware([USER_ROLES.ADMIN]),
			[
				body('name').isString(),
				body('semester').isNumeric(),
				body('audienceTypeIds').optional().isArray(),
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.subjectService.create(req.body);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		router.put(
			'/',
			rbacMiddleware([USER_ROLES.ADMIN]),
			[
				body('id').isNumeric(),
				body('name').isString(),
				body('semester').isNumeric(),
				body('audienceTypeIds').optional().isArray(),
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.subjectService.update(req.body);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		return router;
	}
}
