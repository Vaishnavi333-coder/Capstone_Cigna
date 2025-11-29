import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim } from './claim.entity';
import { UsersModule } from '../users/users.module';
import { PoliciesModule } from '../policies/policies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Claim]), UsersModule, PoliciesModule],
  providers: [ClaimsService],
  controllers: [ClaimsController],
})
export class ClaimsModule {}
