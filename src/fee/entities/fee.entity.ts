import { FeeCategory } from "src/enum/fee-category.enum";
import { Index, Column, ManyToOne } from "typeorm";

export class Fee {
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
