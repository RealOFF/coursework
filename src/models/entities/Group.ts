import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from '../Base';
import { Student } from './Student';
import { GroupType } from './GroupType';

@Entity()
export class Group extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToMany(() => Student)
	@JoinColumn()
	students!: Student[];

	@ManyToOne(() => GroupType, (groupType) => groupType.groups)
	@JoinColumn()
	type!: GroupType;
}
