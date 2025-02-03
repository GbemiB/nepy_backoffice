import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { Permission } from "src/permission/entities/permission.entity";
import { BaseEntity } from "src/base/entities/base.entity";

@Entity()
export class Role  extends BaseEntity {
    @Index()
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @ManyToMany(() => Admin, admin => admin.roles)
    admins: Admin[];

    @OneToMany(() => Permission, (permission) => permission.role, { eager: true })
    permissions: Permission[];
      
}
