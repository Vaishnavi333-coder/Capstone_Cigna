import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PoliciesModule } from './policies/policies.module';
import { ClaimsModule } from './claims/claims.module';
import { AppDataSource } from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dataSource = await AppDataSource.initialize();
        // TypeORM module expects a config object
        return dataSource.options as any;
      },
    }),
    AuthModule,
    UsersModule,
    PoliciesModule,
    ClaimsModule,
  ],
})
export class AppModule {}
