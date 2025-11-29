"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const claims_service_1 = require("./claims.service");
const typeorm_1 = require("@nestjs/typeorm");
const claim_entity_1 = require("./claim.entity");
const users_service_1 = require("../users/users.service");
const policies_service_1 = require("../policies/policies.service");
describe('ClaimsService', () => {
    let service;
    const repoMock = {
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockImplementation((x) => Promise.resolve({ ...x, claimId: 1 })),
        remove: jest.fn().mockResolvedValue(true),
    };
    const usersServiceMock = { findById: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com' }) };
    const policiesServiceMock = { findOneForUser: jest.fn().mockResolvedValue({ policyId: 1 }) };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                claims_service_1.ClaimsService,
                { provide: (0, typeorm_1.getRepositoryToken)(claim_entity_1.Claim), useValue: repoMock },
                { provide: users_service_1.UsersService, useValue: usersServiceMock },
                { provide: policies_service_1.PoliciesService, useValue: policiesServiceMock },
            ],
        }).compile();
        service = module.get(claims_service_1.ClaimsService);
    });
    it('should create claim', async () => {
        const dto = { policyId: 1, claimAmt: 500, description: 'Accident' };
        const res = await service.createForUser(1, dto);
        expect(res).toHaveProperty('claimId');
    });
    it('should list claims for user', async () => {
        const res = await service.findAllForUser(1);
        expect(Array.isArray(res)).toBe(true);
    });
});
//# sourceMappingURL=claims.service.spec.js.map