import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Roles } from '@thallesp/nestjs-better-auth';
import * as types from 'types/types';

import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeaveService } from './leave.service';

@Controller('api/leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  //authenticated users can create leave request
  @Post('create-leave-request')
  create(
    @Body() createLeaveDto: CreateLeaveDto,
    @Req() req: types.AuthenticatedRequest,
  ) {
    const { id } = req.user;
    return this.leaveService.create(createLeaveDto, id);
  }

  @Roles([
    types.Role.admin,
    types.Role.hr,
    types.Role.supervisor,
    types.Role.superAdmin,
  ])
  @Get('stats')
  findStats(@Req() req: types.AuthenticatedRequest) {
    return this.leaveService.findStats(req.user.role, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveService.remove(+id);
  }
}
