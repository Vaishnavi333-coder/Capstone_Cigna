import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Policy } from './src/policies/policy.entity';
import { Claim } from './src/claims/claim.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 1521),
  username: process.env.DB_USERNAME || 'system',
  password: process.env.DB_PASSWORD || 'Vaishu@0410',
  serviceName: process.env.DB_SERVICE_NAME || 'XEPDB1',
  synchronize: true,
  logging: false,
  entities: [User, Policy, Claim],
});
