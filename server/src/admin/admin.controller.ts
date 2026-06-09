import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { AuthService, Roles } from '@thallesp/nestjs-better-auth';

import mongoose from 'mongoose';
import { type AuthenticatedRequest, Role } from 'types/types';
import { AdminService } from './admin.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { User } from './schemas/user.schema';

@Roles([Role.admin, Role.hr, Role.superAdmin])
@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  //completed
  @Post('/create-employee')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.adminService.createEmployee(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  //TODO
  @Get('/dashboard/stats')
  getDashboardStats(@Request() req: AuthenticatedRequest) {
    const user = req.user; //Get from authenticated user
    return this.adminService.getDashboardStats(user);
  }

  @Get('/dashboard/birthdays')
  getUpcomingBirthdays() {
    return this.adminService.getUpcomingBirthdays();
  }

  @Get('/employee-supervisor/:userId')
  getEmployeeSupervisor(@Param('userId') userId: string) {
    return this.adminService.getEmployeeSupervisor(+userId);
  }

  @Post('/promote-to-supervisor/:userId')
  promoteToSupervisor(@Param('userId') userId: string) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.adminService.promoteToSupervisor(+userId);
  }

  @Post('/demote-from-supervisor/:userId')
  demoteFromSupervisor(@Param('userId') userId: string) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.adminService.demoteFromSupervisor(+userId);
  }

  @Delete('/terminate-employee/:userId')
  terminateEmployee(@Param('userId') userId: string) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.adminService.terminateEmployee(+userId);
  }

  @Delete('/remove-supervisor/:userId')
  removeSupervisor(@Param('userId') userId: string) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.adminService.removeSupervisor(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid employee ID format');
    }
    return this.adminService.findOne(+id);
  }

  @Put('/update-employee/:id')
  updateEmployee(@Param('id') id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid employee ID format');
    }
    return this.adminService.updateEmployee();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.adminService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
