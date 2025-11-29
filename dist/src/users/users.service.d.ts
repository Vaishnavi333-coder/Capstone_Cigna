import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(dto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User>;
}
