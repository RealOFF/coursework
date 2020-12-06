import { Router } from 'express';

import { AudienceRouter } from './audience/audience.router';
import { AudienceTypeRouter } from './audienceType/audienceType.router';
import { DepartmentRouter } from './department/department.router';
import { FacultyRouter } from './faculty/faculty.router';
import { GroupRouter } from './group/group.router';
import { IRouter } from './router.interface';
import { StudentRouter } from './student/student.router';
import { SubjectRouter } from './subject/subject.router';
import { TeacherRouter } from './teacher/teacher.router';

// Init router
export const router = Router();

export class BaseRouter implements IRouter {
	private audienceRouter: AudienceRouter;
	private audienceTypeRouter: AudienceTypeRouter;
	private departmentRouter: DepartmentRouter;
	private facultyRouter: FacultyRouter;
	private groupRouter: GroupRouter;
	private studentRouter: StudentRouter;
	private subjectRouter: SubjectRouter;
	private teacherRouter: TeacherRouter;

	constructor() {
		this.audienceRouter = new AudienceRouter();
		this.audienceTypeRouter = new AudienceTypeRouter();
		this.departmentRouter = new DepartmentRouter();
		this.facultyRouter = new FacultyRouter();
		this.groupRouter = new GroupRouter();
		this.studentRouter = new StudentRouter();
		this.subjectRouter = new SubjectRouter();
		this.teacherRouter = new TeacherRouter();
	}

	get routes() {
		router.use('/audiences', this.audienceRouter.routes);
		router.use('/audienceTypes', this.audienceTypeRouter.routes);
		router.use('/departments', this.departmentRouter.routes);
		router.use('/faculties', this.facultyRouter.routes);
		router.use('/groups', this.groupRouter.routes);
		router.use('/students', this.studentRouter.routes);
		router.use('/subject', this.subjectRouter.routes);
		router.use('/teachers', this.teacherRouter.routes);
		return router;
	}
}
