import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Policy } from '../policies/policy.entity';
import { Claim } from '../claims/claim.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Policy, (policy) => policy.user)
  policies: Policy[];

  @OneToMany(() => Claim, (claim) => claim.user)
  claims: Claim[];
}
