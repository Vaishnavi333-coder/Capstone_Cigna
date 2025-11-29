"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const policies_service_1 = require("./policies.service");
const typeorm_1 = require("@nestjs/typeorm");
const policy_entity_1 = require("./policy.entity");
const users_service_1 = require("../users/users.service");
describe('PoliciesService', () => {
    let service;
    const repoMock = {
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockImplementation((x) => Promise.resolve({ ...x, policyId: 1 })),
    };
    const usersServiceMock = { findById: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com' }) };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                policies_service_1.PoliciesService,
                { provide: (0, typeorm_1.getRepositoryToken)(policy_entity_1.Policy), useValue: repoMock },
                { provide: users_service_1.UsersService, useValue: usersServiceMock },
            ],
        }).compile();
        service = module.get(policies_service_1.PoliciesService);
    });
    it('should create policy', async () => {
        const dto = { insurer: 'InsureConnect', policyType: 'Health', premiumAmt: 1000, startDate: '2025-01-01', endDate: '2026-01-01', status: 'Active' };
        const res = await service.createForUser(1, dto);
        expect(res).toHaveProperty('policyId');
    });
    it('should list policies for user', async () => {
        const res = await service.findAllForUser(1);
        expect(Array.isArray(res)).toBe(true);
    });
});
//# sourceMappingURL=policies.service.spec.js.map