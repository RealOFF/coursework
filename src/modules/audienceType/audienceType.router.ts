import { Request, Response, Router } from 'express';
import { param, validationResult } from 'express-validator';
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
			[param('skip').isNumeric(), param('take').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				try {
					const quote = await this.audienceTypeService.getSkipTake(
						req.params.skip,
						req.params.take,
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

		router.post('/', async (req: Request, res: Response) => {
			try {
				const quote = await this.audienceTypeService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put('/', async (req: Request, res: Response) => {
			try {
				const quote = await this.audienceTypeService.update(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		return router;
	}
}
