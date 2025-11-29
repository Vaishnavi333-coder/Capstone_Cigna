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
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const claims_service_1 = require("./claims.service");
const passport_1 = require("@nestjs/passport");
const create_claim_dto_1 = require("./dto/create-claim.dto");
const update_claim_dto_1 = require("./dto/update-claim.dto");
let ClaimsController = class ClaimsController {
    constructor(service) {
        this.service = service;
    }
    async findAll(req) {
        return this.service.findAllForUser(req.user.userId);
    }
    async findOne(req, id) {
        return this.service.findOneForUser(req.user.userId, Number(id));
    }
    async create(req, dto) {
        return this.service.createForUser(req.user.userId, dto);
    }
    async update(req, id, dto) {
        return this.service.updateForUser(req.user.userId, Number(id), dto);
    }
    async delete(req, id) {
        return this.service.deleteForUser(req.user.userId, Number(id));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_claim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_claim_dto_1.UpdateClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "delete", null);
ClaimsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('api/claims'),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService])
], ClaimsController);
exports.ClaimsController = ClaimsController;
//# sourceMappingURL=claims.controller.js.map