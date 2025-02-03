import { Column, Entity, Index, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/role/entities/role.entity";
import { BaseEntity } from "src/base/entities/base.entity";

@Entity()
export class Admin extends BaseEntity{

    @Index()
    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @ManyToMany(() => Role, role => role.admins)
    @JoinTable()
    roles: Role[];
}
