import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Claim } from './claim.entity';
import { UsersService } from '../users/users.service';
import { PoliciesService } from '../policies/policies.service';

describe('ClaimsService', () => {
  let service: ClaimsService;

  const repoMock = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(undefined),
    save: jest.fn().mockImplementation((x) => Promise.resolve({ ...x, claimId: 1 })),
    remove: jest.fn().mockResolvedValue(true),
  };
  const usersServiceMock = { findById: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com' }) };
  const policiesServiceMock = { findOneForUser: jest.fn().mockResolvedValue({ policyId: 1 }) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        { provide: getRepositoryToken(Claim), useValue: repoMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: PoliciesService, useValue: policiesServiceMock },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
  });

  it('should create claim', async () => {
    const dto = { policyId: 1, claimAmt: 500, description: 'Accident' };
    const res = await service.createForUser(1, dto as any);
    expect(res).toHaveProperty('claimId');
  });

  it('should list claims for user', async () => {
    const res = await service.findAllForUser(1);
    expect(Array.isArray(res)).toBe(true);
  });
});
