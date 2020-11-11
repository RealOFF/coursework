import { Request, Response, Router } from 'express';
import { param, validationResult } from 'express-validator';
import { IRouter } from '../router.interface';
import { DepartmentService } from './services/department.service';

const router = Router();

export class DepartmentRouter implements IRouter {
	private departmentService: DepartmentService;

	constructor() {
		this.departmentService = new DepartmentService();
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
					const quote = await this.departmentService.getSkipTake(
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
			[param('id').isNumeric()],
			async (req: Request, res: Response) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}
				// eslint-disable-next-line no-useless-catch
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

		router.post('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.departmentService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.departmentService.update(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		return router;
	}
}
