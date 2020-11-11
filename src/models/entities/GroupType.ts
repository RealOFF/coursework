import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';

import { Base } from '../Base';
import { Group } from './Group';

@Entity()
export class GroupType extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@OneToMany(() => Group, (group) => group.type)
	@JoinColumn()
	groups!: Group[];
}
