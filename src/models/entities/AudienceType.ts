import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';

import { Base } from '../Base';
import { Audience } from './Audience';
import { Subject } from './Subject';

@Entity()
export class AudienceType extends Base {
	@Column({ length: 250, nullable: false })
	name!: string;

	@ManyToMany(() => Audience)
	@JoinTable()
	audiences!: Audience[];

	@ManyToOne(() => Subject, (subject) => subject.audienceTypes)
	subjects!: Subject[];
}
