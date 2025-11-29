import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from './claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { UsersService } from '../users/users.service';
import { Policy } from '../policies/policy.entity';
import { PoliciesService } from '../policies/policies.service';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim) private repo: Repository<Claim>,
    private usersService: UsersService,
    private policiesService: PoliciesService,
  ) {}

  async findAllForUser(userId: number) {
    return this.repo.find({ where: { user: { id: userId } }, relations: ['policy'] });
  }

  async findOneForUser(userId: number, id: number) {
    const c = await this.repo.findOne({ where: { claimId: id, user: { id: userId } }, relations: ['policy'] });
    if (!c) throw new NotFoundException('Claim not found');
    return c;
  }

  async createForUser(userId: number, dto: CreateClaimDto) {
    const user = await this.usersService.findById(userId);
    const policy = await this.policiesService.findOneForUser(userId, dto.policyId);
    if (!policy) throw new NotFoundException('Policy not found for user');
    if (!dto.claimAmt || dto.claimAmt <= 0) {
      throw new BadRequestException('Claim amount must be positive');
    }
    const claim = new Claim();
    claim.policy = policy;
    claim.user = user;
    claim.claimAmt = dto.claimAmt;
    claim.description = dto.description;
    claim.status = 'Submitted';
    return this.repo.save(claim);
  }

  async updateForUser(userId: number, id: number, dto: UpdateClaimDto) {
    const claim = await this.findOneForUser(userId, id);
    if (claim.status !== 'Submitted') {
      throw new ForbiddenException('Cannot edit a processed claim');
    }
    Object.assign(claim, dto);
    return this.repo.save(claim);
  }

  async deleteForUser(userId: number, id: number) {
    const claim = await this.findOneForUser(userId, id);
    if (claim.status !== 'Submitted') {
      throw new ForbiddenException('Cannot delete a processed claim');
    }
    return this.repo.remove(claim);
  }
}
