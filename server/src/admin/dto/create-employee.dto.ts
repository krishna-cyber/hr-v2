import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { Department, EmployeeStatus, EmployeeType, Role } from 'types/types';

export class CreateEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDateString()
  @IsNotEmpty()
  dob!: Date;

  @IsEnum(['male', 'female', 'other'])
  @IsNotEmpty()
  gender!: string;

  @IsString()
  @IsNotEmpty()
  contact!: string;

  @IsNotEmpty()
  @IsString()
  emergencyContact?: string;

  @IsNotEmpty()
  @IsString()
  emergencyContactRelation?: string;

  @IsNotEmpty()
  @IsString()
  emergencyContactName?: string;

  @IsNotEmpty()
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  bloodGroup?: string;

  @IsEnum(Role)
  @IsOptional()
  role!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsEnum(EmployeeType)
  employmentType!: EmployeeType;

  @IsEnum(Department)
  department!: Department;

  @IsNotEmpty()
  @IsDateString()
  dateOfJoining!: Date;

  @IsDateString()
  employmentStartDate!: Date;

  @IsEnum(EmployeeType)
  employmentStartAs!: EmployeeType;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  employeeStatus!: EmployeeStatus;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
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
  citizenshipFrontPhoto?: string;

  @IsOptional()
  citizenshipBackPhoto?: string;

  @IsOptional()
  profilePhoto?: string;

  @IsOptional()
  panPhoto?: string;

  @IsOptional()
  @IsString()
  signaturePhoto?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? +value : undefined))
  @Max(6)
  internshipDurationMonths?: number;
}
