import { Column, Entity } from 'typeorm';

import { Base } from '../Base';

@Entity()
export class User extends Base {
	@Column({ length: 250, nullable: false })
	email!: string;

	@Column({ length: 250, nullable: false })
	password!: string;

	@Column({ length: 250, nullable: false })
	role!: string;
}
