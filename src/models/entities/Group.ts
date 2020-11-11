import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from '../Base';
import { Student } from './Student';
import { GroupType } from './GroupType';

@Entity()
export class Group extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToMany(() => Student, (student) => student.groups)
	students!: Student[];

	@ManyToOne(() => GroupType, (groupType) => groupType.groups)
	type!: GroupType;
}
