import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class ContentEntity {
    @Column()
    total: number;

    @Column()
    totalNotFiltered: number;

    //@OneToMany(type => User, user => user.isActive)
    @Column()
    rows: any;
}