import { AccountType } from "src/enum/account-type.enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.SAVINGS,
    })
    accountType: string;

    @Column({ type: 'varchar', length: 50 })
    accountNumber: string;

    @Column({ type: 'varchar' })
    balance: string;

     @ManyToOne(() => User, user => user.accounts)
      user: User;
}
