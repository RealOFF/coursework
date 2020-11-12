import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { Base } from '../Base';
import { Group } from './Group';

@Entity()
export class Student extends Base {
	@Column({ length: 250, name: 'first_name', nullable: false })
	firstName!: string;

	@Column({ length: 250, name: 'last_name', nullable: false })
	lastName!: string;

	@Column({ length: 250, nullable: true })
	patronymic!: string;

	@ManyToMany(() => Group, (group) => group.students)
	@JoinTable()
	groups!: Group[];
}
