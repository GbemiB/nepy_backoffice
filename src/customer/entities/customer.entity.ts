import { SEX } from "src/enum/sex.enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    firstname: string

    @Column({ type: 'varchar', length: 50 })
    lastname: string

    @Column({ type: 'varchar', length: 50 })
    middlename: string

    @Column({ type: 'varchar', length: 50 })
    dob: string

    @Column({ type: 'varchar', length: 50 })
    nationality: string;

    @Column({ type: 'varchar', length: 50 })
    address: string;

    @Index()
    @Column({ type: 'varchar', length: 50, unique: true }) // Makes email unique
    email: string;

    @Column({ type: 'varchar', length: 50 })
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: SEX,
        default: SEX.FEMALE
    })
    sex: string;

    @ManyToOne(() => User, user => user.customers)
    referral: User;
}
