import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from '../Base';
import { AudienceType } from './AudienceType';

@Entity()
export class Subject extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@Column({ nullable: false })
	semester!: number;

	@OneToMany(() => AudienceType, (audienceType) => audienceType.subjects)
	audienceTypes!: AudienceType[];
}
