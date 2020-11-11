import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from '../Base';
import { Department } from './Department';

@Entity()
export class Faculty extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@OneToMany(() => Department, (department) => department.faculty)
	departments!: Department[];
}
