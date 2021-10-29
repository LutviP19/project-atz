import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleItem {
    PROMO = "promo",
    SPECIAL = "special",
    BEST = "best",
    BREED = "breed",
    JUNIOR = "junior",
    DEFAULT = "default"
}

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    itemCode: string;

    @Column({
        type: "enum",
        enum: RoleItem,
        default: RoleItem.DEFAULT
    })
    roleItem: string;

    @Column()
    contentName: string;

    @Column()
    label: string;

    @Column({type: "tinytext", nullable: true})
    urlPhoto: string;

    @Column({type: "tinytext", nullable: true})
    urlAction: string;

    @Column({type: "tinytext", nullable: true})
    description: string;

    @Column({default: 1})
    isActive: number;

    @Column({type: "timestamp",nullable: true , onUpdate: "CURRENT_TIMESTAMP"})
    lastUpdated: string;
}