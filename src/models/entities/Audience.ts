import { Column, Entity, ManyToMany, JoinColumn } from 'typeorm';

import { Base } from '../Base';
import { AudienceType } from './AudienceType';
import { Department } from './Department';

@Entity()
export class Audience extends Base {
    @Column({ length: 250, nullable: false })
    name!: string;
    
    @ManyToMany(() => AudienceType)
    @JoinColumn()
    types!: AudienceType[];

    @ManyToMany(() => Department)
    @JoinColumn()
	deparments!: Department[];
}
