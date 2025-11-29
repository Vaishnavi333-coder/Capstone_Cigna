import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy) private repo: Repository<Policy>,
    private usersService: UsersService,
  ) {}

  async findAllForUser(userId: number) {
    return this.repo.find({ where: { user: { id: userId } }, relations: ['user', 'claims'] });
  }

  async findOneForUser(userId: number, id: number) {
    const pol = await this.repo.findOne({ where: { policyId: id, user: { id: userId } }, relations: ['claims'] });
    if (!pol) throw new NotFoundException('Policy not found');
    return pol;
  }

  async createForUser(userId: number, dto: CreatePolicyDto) {
    const user = await this.usersService.findById(userId);
    // validate date ordering
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    if (end.getTime() < start.getTime()) {
      throw new BadRequestException('Policy end date must be after start date');
    }
    const pol = new Policy();
    pol.user = user;
    pol.insurer = dto.insurer;
    pol.policyType = dto.policyType;
    pol.premiumAmt = dto.premiumAmt;
    pol.startDate = dto.startDate;
    pol.endDate = dto.endDate;
    pol.status = dto.status || 'Active';
    return this.repo.save(pol);
  }

  async updateForUser(userId: number, id: number, dto: UpdatePolicyDto) {
    const pol = await this.findOneForUser(userId, id);
    if (dto.startDate || dto.endDate) {
      const start = dto.startDate ? new Date(dto.startDate) : new Date(pol.startDate);
      const end = dto.endDate ? new Date(dto.endDate) : new Date(pol.endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      if (end.getTime() < start.getTime()) {
        throw new BadRequestException('Policy end date must be after start date');
      }
    }
    Object.assign(pol, dto);
    return this.repo.save(pol);
  }

  // Admin methods
  async findAllForAdmin() {
    return this.repo.find({ relations: ['user', 'claims'] });
  }

  async findOneForAdmin(id: number) {
    const pol = await this.repo.findOne({ where: { policyId: id }, relations: ['user', 'claims'] });
    if (!pol) throw new NotFoundException('Policy not found');
    return pol;
  }

  async createForAdmin(dto: AdminCreatePolicyDto) {
    const user = await this.usersService.findById(dto.userId);
    const pol = new Policy();
    pol.user = user;
    pol.insurer = dto.insurer;
    pol.policyType = dto.policyType;
    pol.premiumAmt = dto.premiumAmt;
    pol.startDate = dto.startDate;
    pol.endDate = dto.endDate;
    pol.status = dto.status || 'Active';
    return this.repo.save(pol);
  }
}
