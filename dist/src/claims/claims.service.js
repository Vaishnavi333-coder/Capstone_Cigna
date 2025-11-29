"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
const users_service_1 = require("../users/users.service");
const policies_service_1 = require("../policies/policies.service");
let ClaimsService = class ClaimsService {
    constructor(repo, usersService, policiesService) {
        this.repo = repo;
        this.usersService = usersService;
        this.policiesService = policiesService;
    }
    async findAllForUser(userId) {
        return this.repo.find({ where: { user: { id: userId } }, relations: ['policy'] });
    }
    async findOneForUser(userId, id) {
        const c = await this.repo.findOne({ where: { claimId: id, user: { id: userId } }, relations: ['policy'] });
        if (!c)
            throw new common_1.NotFoundException('Claim not found');
        return c;
    }
    async createForUser(userId, dto) {
        const user = await this.usersService.findById(userId);
        const policy = await this.policiesService.findOneForUser(userId, dto.policyId);
        if (!policy)
            throw new common_1.NotFoundException('Policy not found for user');
        if (!dto.claimAmt || dto.claimAmt <= 0) {
            throw new common_1.BadRequestException('Claim amount must be positive');
        }
        const claim = new claim_entity_1.Claim();
        claim.policy = policy;
        claim.user = user;
        claim.claimAmt = dto.claimAmt;
        claim.description = dto.description;
        claim.status = 'Submitted';
        return this.repo.save(claim);
    }
    async updateForUser(userId, id, dto) {
        const claim = await this.findOneForUser(userId, id);
        if (claim.status !== 'Submitted') {
            throw new common_1.ForbiddenException('Cannot edit a processed claim');
        }
        Object.assign(claim, dto);
        return this.repo.save(claim);
    }
    async deleteForUser(userId, id) {
        const claim = await this.findOneForUser(userId, id);
        if (claim.status !== 'Submitted') {
            throw new common_1.ForbiddenException('Cannot delete a processed claim');
        }
        return this.repo.remove(claim);
    }
};
ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        policies_service_1.PoliciesService])
], ClaimsService);
exports.ClaimsService = ClaimsService;
//# sourceMappingURL=claims.service.js.map