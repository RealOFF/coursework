import { Request, Response, Router } from 'express';
import {param, validationResult} from 'express-validator';
import { IRouter } from '../router.interface';
import { StudentService } from './services/student.service';

const router = Router();

export class StudentRouter implements IRouter {
	private studentService: StudentService;

	constructor() {
		this.studentService = new StudentService();
	}
	// eslint-disable-line
	get routes() {
		router.get('/all', [param('skip').isNumeric(), param('take').isNumeric()], async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
			  return res.status(400).json({ errors: errors.array() });
			}
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.studentService.getSkipTake(req.params.skip, req.params.take);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.get('/:id', [param('id').isNumeric()], async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
			  return res.status(400).json({ errors: errors.array() });
			}
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.studentService.getById(req.params.id);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.delete('/:id', [param('id').isNumeric()], async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
			  return res.status(400).json({ errors: errors.array() });
			}
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.studentService.deleteById(req.params.id);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.post('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				const quote = await this.studentService.create(req.body);
				return res.send(quote);
			} catch (err) {
				throw err;
			}
		});

		router.put('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
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
