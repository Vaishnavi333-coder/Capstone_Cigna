import { Repository } from 'typeorm';
import { Claim } from './claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { UsersService } from '../users/users.service';
import { PoliciesService } from '../policies/policies.service';
export declare class ClaimsService {
    private repo;
    private usersService;
    private policiesService;
    constructor(repo: Repository<Claim>, usersService: UsersService, policiesService: PoliciesService);
    findAllForUser(userId: number): Promise<Claim[]>;
    findOneForUser(userId: number, id: number): Promise<Claim>;
    createForUser(userId: number, dto: CreateClaimDto): Promise<Claim>;
    updateForUser(userId: number, id: number, dto: UpdateClaimDto): Promise<Claim>;
    deleteForUser(userId: number, id: number): Promise<Claim>;
}
