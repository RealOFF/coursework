import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';

import { Base } from '../Base';
import { AudienceType } from './AudienceType';

@Entity()
export class Subject extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@OneToMany(() => AudienceType, (audienceType) => audienceType.subject)
	@JoinColumn()
	audienceTypes!: AudienceType[];
}
