import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Policy } from './policy.entity';
import { UsersService } from '../users/users.service';

describe('PoliciesService', () => {
  let service: PoliciesService;

  const repoMock = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(undefined),
    save: jest.fn().mockImplementation((x) => Promise.resolve({ ...x, policyId: 1 })),
  };
  const usersServiceMock = { findById: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com' }) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        { provide: getRepositoryToken(Policy), useValue: repoMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should create policy', async () => {
    const dto = { insurer: 'InsureConnect', policyType: 'Health', premiumAmt: 1000, startDate: '2025-01-01', endDate: '2026-01-01', status: 'Active' };
    const res = await service.createForUser(1, dto as any);
    expect(res).toHaveProperty('policyId');
  });

  it('should list policies for user', async () => {
    const res = await service.findAllForUser(1);
    expect(Array.isArray(res)).toBe(true);
  });
});
