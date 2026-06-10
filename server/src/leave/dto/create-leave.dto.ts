import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { LeaveType } from 'types/types';

export class CreateLeaveDto {
  @IsMongoId({ message: 'employeeId must be a valid MongoDB ObjectId' })
  employeeId!: string;

  @IsEnum(LeaveType)
  leaveType!: string;

  @IsEnum(['full_day', 'half_day', 'multiple_days'])
  durationType!: string;

  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;

  @IsNumber()
  @IsPositive({ message: 'numberOfDays must be a positive number' })
  numberOfDays!: number;

  @IsString()
  reason!: string;

  @IsBoolean()
  isPaid!: boolean;

  comments!: string[];
}
