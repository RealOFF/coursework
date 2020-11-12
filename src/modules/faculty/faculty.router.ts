import { Request, Response, Router } from 'express';
import { param, validationResult } from 'express-validator';
import { IRouter } from '../router.interface';
import { FacultyService } from './services/faculty.service';

const router = Router();

export class FacultyRouter implements IRouter {
	private facultyService: FacultyService;

	constructor() {
		this.facultyService = new FacultyService();
	}
	// eslint-disable-line
	get routes() {
		router.get(
			'/all',
			[param('skip').isNumeric(), param('take').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}
				// eslint-disable-next-line no-useless-catch
				try {
					const quote = await this.facultyService.getSkipTake(
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
				// eslint-disable-next-line no-useless-catch
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
				// eslint-disable-next-line no-useless-catch
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

		router.post('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.facultyService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.facultyService.update(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		return router;
	}
}