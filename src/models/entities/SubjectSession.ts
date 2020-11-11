import { Column, Entity, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { Base } from '../Base';
import { Subject } from './Subject';
import { Teacher } from './Teacher';
import { Audience } from './Audience';
import { Group } from './Group';

@Entity()
export class SubjectSession extends Base {
	@Column({ nullable: false })
	startTime!: Date;

	@Column({ nullable: false })
	endTime!: Date;

	@ManyToOne(() => Audience)
	audience!: Audience;

	@ManyToOne(() => Subject)
	subject!: Subject;

	@ManyToMany(() => Teacher)
	@JoinColumn()
	teachers!: Teacher[];

	@ManyToMany(() => Group)
	@JoinColumn()
	groups!: Group[];
}
