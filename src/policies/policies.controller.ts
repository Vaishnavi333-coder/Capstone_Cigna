import { Body, Controller, Get, Param, Post, Put, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { AdminCreatePolicyDto } from './dto/admin-create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/policies')
export class PoliciesController {
  constructor(private service: PoliciesService) {}

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.service.findAllForUser(userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const userId = req.user.userId;
    return this.service.findOneForUser(userId, Number(id));
  }

  @Post()
  async create(@Request() req, @Body() dto: CreatePolicyDto) {
    const userId = req.user.userId;
    return this.service.createForUser(userId, dto);
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: number, @Body() dto: UpdatePolicyDto) {
    const userId = req.user.userId;
    return this.service.updateForUser(userId, Number(id), dto);
  }

  @Get('admin')
  async adminList(@Request() req) {
    if (req.user.role !== 'admin') return { error: 'Forbidden' };
    return this.service.findAllForAdmin();
  }

  @Get('admin/:id')
  async adminGet(@Request() req, @Param('id') id: number) {
    if (req.user.role !== 'admin') return { error: 'Forbidden' };
    return this.service.findOneForAdmin(Number(id));
  }

  @Post('admin')
  async adminCreate(@Request() req, @Body() dto: AdminCreatePolicyDto) {
    if (req.user.role !== 'admin') return { error: 'Forbidden' };
    return this.service.createForAdmin(dto);
  }
}
