import { Router } from 'express';
import { IRouter } from './router.interface';
import { GroupRouter } from './group/group.router';
import { StudentRouter } from './student/student.router';
import { TeacherRouter } from './teacher/teacher.router';

// Init router
export const router = Router();

export class BaseRouter implements IRouter {
	private groupRouter: GroupRouter;
	private studentRouter: StudentRouter;
	private teacherRouter: TeacherRouter;

	constructor() {
		this.groupRouter = new GroupRouter();
		this.studentRouter = new StudentRouter();
		this.teacherRouter = new TeacherRouter();
	}
	// eslint-disable-line
	get routes() {
		router.use('/groups', this.groupRouter.routes);
		router.use('/students', this.studentRouter.routes);
		router.use('/teachers', this.teacherRouter.routes);
		return router;
	}
}
