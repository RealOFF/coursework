import { Column, Entity, ManyToOne, ManyToMany } from 'typeorm';

import { Base } from '../Base';
import { Faculty } from './Faculty';
import { Teacher } from './Teacher';

@Entity()
export class Department extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToOne(() => Faculty, (faculty) => faculty.departments)
	faculty!: Faculty;

	@ManyToMany(() => Teacher, (teacher) => teacher.departments)
	teachers!: Teacher[];
}
