import { Request, Response, Router } from 'express';
import { param, query, body, validationResult } from 'express-validator';

import { IRouter } from '../router.interface';
import { FacultyService } from './services/faculty.service';

const router = Router();

export class FacultyRouter implements IRouter {
	private facultyService: FacultyService;

	constructor() {
		this.facultyService = new FacultyService();
	}

	get routes() {
		router.get(
			'/all',
			[
				query('offset')
					.optional()
					.isNumeric(),
				query('limit')
					.optional()
					.isNumeric()
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.facultyService.getOffsetLimit(
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
			[param('id').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.facultyService.getById(
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
			[param('id').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.facultyService.deleteById(
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
			[
				body('name').isString(),
				body('departmentIds').isArray()
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.facultyService.create(req.body);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			}
		);

		router.put(
			'/',
			[
				body('id').isNumeric(),
				body('name').isString(),
				body('departmentIds').isArray()
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.facultyService.update(req.body);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			}
		);

		return router;
	}
}
