import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { Base } from '../Base';
import { AudienceType } from './AudienceType';
import { Department } from './Department';

@Entity()
export class Audience extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToMany(() => AudienceType, (type) => type.audiences)
	@JoinTable()
	types!: AudienceType[];

	@ManyToMany(() => Department)
	@JoinTable()
	departments!: Department[];
}
