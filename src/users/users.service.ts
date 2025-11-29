import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const found = await this.repo.findOne({ where: { email: dto.email } });
    if (found) {
      throw new ConflictException('Email already exists');
    }
    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.password = await bcrypt.hash(dto.password, 10);
    // default role is 'user'
    user.role = 'user';
    return await this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Admin helper to list all users
  async listAll(): Promise<User[]> {
    return this.repo.find();
  }
}
