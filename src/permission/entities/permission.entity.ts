import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/role/entities/role.entity";
import { BaseEntity } from "src/base/entities/base.entity";

@Entity()
export class Permission extends BaseEntity {

    @Index()
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @ManyToOne(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' })
    role: Role;
    
}
