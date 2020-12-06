import { Request, Response, Router } from 'express';
import { param, query, body, validationResult } from 'express-validator';

import { IRouter } from '../router.interface';
import { AudienceTypeService } from './services/audienceType.service';

const router = Router();

export class AudienceTypeRouter implements IRouter {
	private audienceTypeService: AudienceTypeService;

	constructor() {
		this.audienceTypeService = new AudienceTypeService();
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
					const quote = await this.audienceTypeService.getOffsetLimit(
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
					const quote = await this.audienceTypeService.getById(
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
					const quote = await this.audienceTypeService.deleteById(
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
			],
			async (req: Request, res: Response) => {
			try {
				const quote = await this.audienceTypeService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put(
			'/',
			[
				body('id').isNumeric(),
				body('name').isString(),
			],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.audienceTypeService.update(req.body);
					return res.send(quote);
				} catch (err) {
					throw err;
				}
			}
		);

		return router;
	}
}
