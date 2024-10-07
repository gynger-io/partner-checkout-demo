import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  amountPennies!: number;

  @Column({ nullable: true })
  offerId!: string;

  @Column()
  checkoutId!: string;

  @Column({ nullable: true })
  accountId!: string;

  @Column()
  offerStatus!: string;

  @Column({ nullable: true })
  accountStatus!: string;
}
