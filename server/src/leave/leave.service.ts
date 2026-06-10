import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'types/types';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './schemas/leave.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private readonly leaveModel: Model<Leave>,
  ) {}
  create(createLeaveDto: CreateLeaveDto) {
    return 'This action adds a new leave';
  }

  //completed
  async findStats(role: string, userId: string) {
    try {
      //role superadmin
      if (role === 'superAdmin') {
        const [approved, pending, rejected] = await Promise.all([
          this.leaveModel.countDocuments({
            status: 'admin_approved',
            currentApprover: userId,
          }),
          this.leaveModel.countDocuments({
            status: 'pending',
            currentApprover: userId,
          }),
          this.leaveModel.countDocuments({
            status: 'rejected',
            currentApprover: userId,
          }),
        ]);
        return {
          message: 'Leave stats fetched successfully',
          data: {
            approved,
            pending,
            rejected,
          },
        };
      }
      //role hr or admin
      if (role === 'admin' || role === 'hr') {
        const [approved, pending, rejected] = await Promise.all([
          this.leaveModel.countDocuments({
            status: 'admin_approved',
            currentApprover: userId,
          }),
          this.leaveModel.countDocuments({
            status: 'supervisor_approved',
            currentApprover: userId,
          }),
          this.leaveModel.countDocuments({
            status: 'rejected',
            currentApprover: userId,
          }),
        ]);
        return {
          message: 'Leave stats fetched successfully',
          data: {
            approved,
            pending,
            rejected,
          },
        };
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch leave stats', {
        cause: error,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} leave`;
  }

  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return `This action updates a #${id} leave`;
  }

  remove(id: number) {
    return `This action removes a #${id} leave`;
  }
}
