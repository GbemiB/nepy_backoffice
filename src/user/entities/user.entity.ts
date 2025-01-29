import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

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
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  /**
   * m - male
   * f - female
   */
  sex: string;

  // @OneToMany(() => OtherEntity, otherEntity => otherEntity.user)
  // otherEntities: OtherEntity[];
}