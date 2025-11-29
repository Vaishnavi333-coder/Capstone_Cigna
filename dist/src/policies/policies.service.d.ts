import { Repository } from 'typeorm';
import { Policy } from './policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { UsersService } from '../users/users.service';
export declare class PoliciesService {
    private repo;
    private usersService;
    constructor(repo: Repository<Policy>, usersService: UsersService);
    findAllForUser(userId: number): Promise<Policy[]>;
    findOneForUser(userId: number, id: number): Promise<Policy>;
    createForUser(userId: number, dto: CreatePolicyDto): Promise<Policy>;
    updateForUser(userId: number, id: number, dto: UpdatePolicyDto): Promise<Policy>;
}
