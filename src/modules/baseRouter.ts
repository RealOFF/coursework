import { Router } from 'express';

import { authMiddleware } from '../helpers/auth';
import { AudienceRouter } from './audience/audience.router';
import { AudienceTypeRouter } from './audienceType/audienceType.router';
import { AuthRouter } from './auth/auth.router';
import { DepartmentRouter } from './department/department.router';
import { FacultyRouter } from './faculty/faculty.router';
import { GroupRouter } from './group/group.router';
import { GroupTypeRouter } from './groupType/groupType.router';
import { IRouter } from './router.interface';
import { StudentRouter } from './student/student.router';
import { SubjectRouter } from './subject/subject.router';
import { SubjectSessionRouter } from './subjectSession/subjectSession.router';
import { TeacherRouter } from './teacher/teacher.router';
import { ExportRouter } from './export/export.router';

// Init router
export const router = Router();

export class BaseRouter implements IRouter {
	private audienceRouter: AudienceRouter;
	private audienceTypeRouter: AudienceTypeRouter;
	private authRouter: AuthRouter;
	private departmentRouter: DepartmentRouter;
	private facultyRouter: FacultyRouter;
	private groupRouter: GroupRouter;
	private groupTypeRouter: GroupTypeRouter;
	private studentRouter: StudentRouter;
	private subjectRouter: SubjectRouter;
	private subjectSessionRouter: SubjectSessionRouter;
	private teacherRouter: TeacherRouter;
	private exportRouter: ExportRouter;

	constructor() {
		this.audienceRouter = new AudienceRouter();
		this.audienceTypeRouter = new AudienceTypeRouter();
		this.authRouter = new AuthRouter();
		this.departmentRouter = new DepartmentRouter();
		this.facultyRouter = new FacultyRouter();
		this.groupRouter = new GroupRouter();
		this.groupTypeRouter = new GroupTypeRouter();
		this.studentRouter = new StudentRouter();
		this.subjectRouter = new SubjectRouter();
		this.subjectSessionRouter = new SubjectSessionRouter();
		this.teacherRouter = new TeacherRouter();
		this.exportRouter = new ExportRouter();
	}

	get routes() {
		router.use('/audiences', authMiddleware, this.audienceRouter.routes);
		router.use(
			'/audienceTypes',
			authMiddleware,
			this.audienceTypeRouter.routes,
		);
		router.use('/auth', this.authRouter.routes);
		router.use(
			'/departments',
			authMiddleware,
			this.departmentRouter.routes,
		);
		router.use('/faculties', authMiddleware, this.facultyRouter.routes);
		router.use('/groups', authMiddleware, this.groupRouter.routes);
		router.use('/groupTypes', authMiddleware, this.groupTypeRouter.routes);
		router.use('/students', authMiddleware, this.studentRouter.routes);
		router.use('/subjects', authMiddleware, this.subjectRouter.routes);
		router.use(
			'/subjectSessions',
			authMiddleware,
			this.subjectSessionRouter.routes,
		);
		router.use('/teachers', authMiddleware, this.teacherRouter.routes);
		router.use('/export', this.exportRouter.routes);
		return router;
	}
}
