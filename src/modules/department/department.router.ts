import { Request, Response, Router } from 'express';
import { param, query, body, validationResult } from 'express-validator';

import { USER_ROLES } from '../../config/constants';
import { DatabaseError } from '../../helpers';
import { rbacMiddleware } from '../../helpers/rbac';
import { IRouter } from '../router.interface';
import { DepartmentService } from './services/department.service';

const router = Router();

export class DepartmentRouter implements IRouter {
	private departmentService: DepartmentService;

	constructor() {
		this.departmentService = new DepartmentService();
	}

	get routes() {
		router.get(
			'/all',
			rbacMiddleware([USER_ROLES.ADMIN, USER_ROLES.COMMON_USER]),
			[
				query('offset').optional().isNumeric(),
				query('limit').optional().isNumeric(),
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.departmentService.getOffsetLimit(
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
					const quote = await this.departmentService.getById(
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
					const quote = await this.departmentService.deleteById(
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
			[body('name').isString(), body('facultyId').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.departmentService.create(req.body);

					if (
						quote instanceof DatabaseError &&
						quote.reason === DatabaseError.REASONS.NOT_FOUND
					) {
						return res.status(404).json({ message: quote.message });
					}

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
				body('facultyId').isNumeric(),
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.departmentService.update(req.body);

					if (
						quote instanceof DatabaseError &&
						quote.reason === DatabaseError.REASONS.NOT_FOUND
					) {
						return res.status(404).json({ message: quote.message });
					}
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		return router;
	}
}
