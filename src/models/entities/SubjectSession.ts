import { Column, Entity, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { Base } from '../Base';
import { Subject } from './Subject';
import { Teacher } from './Teacher';
import { Audience } from './Audience';
import { Group } from './Group';

@Entity()
export class SubjectSession extends Base {
    @Column({ length: 250, name: 'start_time', nullable: false })
	startTime!: Date;

	@Column({ length: 250, name: 'end_time', nullable: false })
    endTime!: Date;
    
    @ManyToOne(() => Audience)
    @JoinColumn()
    audience!: Audience;

    @ManyToOne(() => Subject)
    @JoinColumn()
    subject!: Subject;

	@ManyToMany(() => Teacher)
    @JoinColumn()
    teachers!: Teacher[];
    
    @ManyToMany(() => Group)
    @JoinColumn()
    groups!: Group[];
}
