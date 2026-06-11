import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Department, EmployeeStatus, EmployeeType, Role } from 'types/types';

export class CreateEmployeeDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsDateString()
  dob!: Date;

  @IsEnum(['male', 'female', 'other'])
  gender!: string;

  @IsString()
  contact!: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  emergencyContactRelation?: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  bloodGroup?: string;

  @IsEnum(Role)
  role!: string;

  @IsString()
  address!: string;

  @IsEnum(EmployeeType)
  employeeType!: EmployeeType;

  @IsEnum(Department)
  department!: Department;

  @IsOptional()
  @IsDateString()
  dateOfJoining?: Date;

  @IsDateString()
  employmentStartDate!: Date;

  @IsEnum(EmployeeType)
  employmentStartAs!: EmployeeType;

  @IsEnum(EmployeeStatus)
  employeeStatus!: EmployeeStatus;

  @IsNumber()
  salary!: number;

  @IsString()
  @IsNotEmpty()
  bankAccount!: string;

  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @IsString()
  @IsNotEmpty()
  panNumber!: string;

  @IsString()
  @IsNotEmpty()
  citizenshipNumber!: string;

  @IsOptional()
  @IsString()
  citizenshipFrontPhoto?: string;

  @IsOptional()
  @IsString()
  citizenshipBackPhoto?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsString()
  panPhoto?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  signaturePhoto?: string;

  @IsOptional()
  @IsNumber()
  @Max(6)
  internshipDurationMonths?: number;

  @IsOptional()
  @IsBoolean()
  internshipEndingReminderSent?: boolean;
}
