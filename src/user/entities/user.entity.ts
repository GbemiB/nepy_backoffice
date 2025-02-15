import { Exclude } from "class-transformer";
import { Account } from "src/account/entities/account.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { SEX } from "src/enum/sex.enum";
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 50 })
  middlename: string;

  @Index()
  @Column({ type: 'varchar', length: 50, unique: true }) // Makes email unique
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 50 })
  dob: string;

  @Column({ type: 'varchar', length: 50 })
  nationality: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: SEX,
    default: SEX.FEMALE
  })
  sex: string;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];

  @OneToMany(() => Customer, customer => customer.referral)
  customers: Customer[];
}