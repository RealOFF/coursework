import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../Base';
import { Faculty } from './Faculty';

@Entity()
export class Department extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToOne(() => Faculty, (faculty) => faculty.departments)
	faculty!: Faculty;
}
