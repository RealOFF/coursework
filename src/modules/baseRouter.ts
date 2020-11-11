import { Router } from 'express';
import { IRouter } from './router.interface';
import { StudentRouter } from './student/student.router';

// Init router
export const router = Router();

export class BaseRouter implements IRouter {
	private studentRouter: StudentRouter;

	constructor() {
		this.studentRouter = new StudentRouter();
	}
	// eslint-disable-line
	get routes() {
		router.use('/students', this.studentRouter.routes);
		return router;
	}
}
