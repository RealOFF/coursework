import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import groupService from './services/group.service';
const router = Router();

class StudentRouter implements IRouter {
	// eslint-disable-line
	get routes() {
		router.post('/', async (req: Request, res: Response) => {
			// eslint-disable-next-line no-useless-catch
			try {
				// const quote = await groupService.create(req.body);
				// return res.send(quote);
			} catch (err) {
				throw err;
			}
		});
		return router;
	}
}

export default new StudentRouter();
