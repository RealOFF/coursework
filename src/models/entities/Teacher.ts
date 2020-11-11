import { Column, Entity, ManyToMany, JoinColumn } from 'typeorm';

import { Base } from '../Base';
import { Department } from './Department';

@Entity()
export class Teacher extends Base {
	@Column({ length: 250, nullable: false })
	firstName!: string;

	@Column({ length: 250, nullable: false })
	lastName!: string;

	@Column({ length: 250, nullable: true })
	patronymic!: string;

	@ManyToMany(() => Department)
	@JoinColumn()
	deparments!: Department[];
}
