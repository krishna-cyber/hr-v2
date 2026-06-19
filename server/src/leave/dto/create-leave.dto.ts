import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { LeaveType } from 'types/types';
import { Comments } from '../schemas/leave.schema';

export class CreateLeaveDto {
  @IsEnum(LeaveType)
  leaveType!: string;

  @IsEnum(['full_day', 'half_day', 'multiple_days'])
  durationType!: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate!: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate!: Date;

  @IsNumber()
  @IsPositive({ message: 'numberOfDays must be a positive number' })
  numberOfDays!: number;

  @IsString()
  reason!: string;

  @IsBoolean()
  isPaid!: boolean;

  @IsOptional()
  comments!: Comments[];
}
