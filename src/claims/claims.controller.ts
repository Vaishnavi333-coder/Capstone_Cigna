import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { AdminUpdateClaimDto } from './dto/admin-update-claim.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/claims')
export class ClaimsController {
  constructor(private service: ClaimsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.service.findAllForUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    return this.service.findOneForUser(req.user.userId, Number(id));
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateClaimDto) {
    return this.service.createForUser(req.user.userId, dto);
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: number, @Body() dto: UpdateClaimDto) {
    return this.service.updateForUser(req.user.userId, Number(id), dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    return this.service.deleteForUser(req.user.userId, Number(id));
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

  @Put('admin/:id/status')
  async adminUpdateStatus(@Request() req, @Param('id') id: number, @Body() dto: AdminUpdateClaimDto) {
    if (req.user.role !== 'admin') return { error: 'Forbidden' };
    return this.service.updateStatusForAdmin(Number(id), dto.status);
  }
}
