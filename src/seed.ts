import { AppDataSource } from '../ormconfig';
import { User } from './users/user.entity';
import { Policy } from './policies/policy.entity';
import { Claim } from './claims/claim.entity';
import * as bcrypt from 'bcrypt';

async function run() {
  const ds = AppDataSource;
  if (!ds.isInitialized) await ds.initialize();

  const userRepo = ds.getRepository(User);
  const policyRepo = ds.getRepository(Policy);
  const claimRepo = ds.getRepository(Claim);

  const existing = await userRepo.findOne({ where: { email: 'demo@insureconnect.com' } });
  if (existing) {
    console.log('Seed already executed');
    process.exit(0);
  }

  const user = new User();
  user.email = 'demo@insureconnect.com';
  user.password = await bcrypt.hash('password', 10);
  user.name = 'Demo User';
  await userRepo.save(user);

  const p = new Policy();
  p.user = user;
  p.insurer = 'InsureConnect';
  p.policyType = 'Health';
  p.premiumAmt = 1200.0;
  p.startDate = '2024-01-01';
  p.endDate = '2025-01-01';
  p.status = 'Active';
  await policyRepo.save(p);

  const c = new Claim();
  c.user = user;
  c.policy = p;
  c.claimAmt = 500.0;
  c.description = 'Minor surgery';
  c.status = 'Submitted';
  await claimRepo.save(c);

  console.log('Seed completed');
  process.exit(0);
}

run().catch((err) => console.error(err));
