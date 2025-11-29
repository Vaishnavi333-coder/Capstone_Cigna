import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  async adminList(@Request() req) {
    if (req.user.role !== 'admin') return { error: 'Forbidden' };
    // Return minimal info for admin: id, email, name
    const users = await this.usersService.listAll();
    return users.map((u) => ({ id: u.id, email: u.email, name: u.name }));
  }
}
