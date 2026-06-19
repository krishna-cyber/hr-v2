import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService, Roles } from '@thallesp/nestjs-better-auth';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import * as types from 'types/types';
import { AdminService } from './admin.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Roles([types.Role.admin, types.Role.hr, types.Role.superAdmin])
@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  //completed
  @Post('/create-employee')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'citizenshipFrontPhoto', maxCount: 1 },
      {
        name: 'citizenshipBackPhoto',
        maxCount: 1,
      },
      {
        name: 'panPhoto',
        maxCount: 1,
      },
      {
        name: 'profilePhoto',
        maxCount: 1,
      },
      {
        name: 'signaturePhoto',
        maxCount: 1,
      },
    ]),
  )
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFiles()
    files: types.CreateEmployeeFiles,
  ) {
    return this.adminService.createEmployee(createEmployeeDto, files);
  }

  @Get('/employees')
  findAll(@Query() paginationDto: PaginationDTO) {
    const { page, pageSize, search } = paginationDto;
    return this.adminService.findAll(page, pageSize, search);
  }

  @Roles([types.Role.admin, types.Role.hr, types.Role.superAdmin])
  @Get('/promote-to-supervisor/:userId')
  promoteToSupervisor(
    @Param('userId') userId: string,
    @Req() req: types.AuthenticatedRequest,
  ) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const { id } = req.user;
    if (userId === id.toString()) {
      throw new BadRequestException(
        'You cannot promote yourself to supervisor',
      );
    }

    return this.adminService.promoteToSupervisor(+userId);
  }

  //TODO
  @Get('/dashboard/stats')
  getDashboardStats(@Request() req: types.AuthenticatedRequest) {
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
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid employee ID format');
    }
    return this.adminService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
