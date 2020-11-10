import { Router } from 'express';
import { IRouter } from './router.interface';
import { StudentRouter } from './student/student.router';
import userRouter from './user/userRouter';

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
		router.use('/users', userRouter.routes);
		return router;
	}
}
