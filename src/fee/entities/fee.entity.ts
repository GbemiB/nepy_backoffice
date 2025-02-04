import { BaseEntity } from "src/base/entities/base.entity";
import { FeeCategory } from "src/enum/fee-category.enum";
import { Index, Column, Entity } from "typeorm";

@Entity()
export class Fee extends BaseEntity{
    @Index()
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({
        type: 'enum',
        enum: FeeCategory,
        default: FeeCategory.TRANSACTION,
    })
    category: string;

    @Column({ type: 'varchar' })
    amount: string;
}
