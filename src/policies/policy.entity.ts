import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Claim } from '../claims/claim.entity';

@Entity({ name: 'policies' })
export class Policy {
  @PrimaryGeneratedColumn({ type: 'number' })
  policyId: number;

  @ManyToOne(() => User, (user) => user.policies, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 100 })
  insurer: string;

  @Column({ type: 'varchar', length: 50 })
  policyType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  premiumAmt: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ length: 20 })
  status: string;

  @OneToMany(() => Claim, (claim) => claim.policy)
  claims: Claim[];
}
