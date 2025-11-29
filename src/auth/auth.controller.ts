import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    const token = await this.authService.login(user);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...token };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    const token = await this.authService.login(user);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...token };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Request() req) {
    // req.user is set by JwtStrategy
    return { user: { id: req.user.userId, email: req.user.email, role: req.user.role } };
  }
}
