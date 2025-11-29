import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Policy } from '../policies/policy.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'claims' })
export class Claim {
  @PrimaryGeneratedColumn({ type: 'number' })
  claimId: number;

  @ManyToOne(() => Policy, (policy) => policy.claims, { onDelete: 'CASCADE' })
  policy: Policy;

  @ManyToOne(() => User, (user) => user.claims, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  claimAmt: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  submittedAt: Date;
}
