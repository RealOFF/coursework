import { Request, Response, Router } from 'express';
import { param, query, validationResult } from 'express-validator';

import { IRouter } from '../router.interface';
import { StudentService } from './services/student.service';

const router = Router();

export class StudentRouter implements IRouter {
	private studentService: StudentService;

	constructor() {
		this.studentService = new StudentService();
	}

	get routes() {
		router.get(
			'/all',
			[query('offset').isNumeric(), query('limit').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.studentService.getOffsetLimit(
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
					const quote = await this.studentService.getById(
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
					const quote = await this.studentService.deleteById(
						req.params.id,
					);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			},
		);

		router.post('/', async (req: Request, res: Response) => {
			try {
				const quote = await this.studentService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put('/', async (req: Request, res: Response) => {
			try {
				const quote = await this.studentService.update(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		return router;
	}
}
