import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Department, EmployeeStatus, EmployeeType } from 'types/types';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, type: Date })
  dob!: Date;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender!: string;

  @Prop({ required: true, type: String })
  contact!: string;

  @Prop({ type: String })
  emergencyContact?: string;

  @Prop({ type: String })
  emergencyContactRelation?: string;

  @Prop({ type: String })
  emergencyContactName?: string;

  @Prop({
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  })
  bloodGroup?: string;

  @Prop({ required: true, type: String })
  address!: string;

  @Prop({ required: true, type: String, enum: EmployeeType })
  employmentType!: string;

  @Prop({ required: true, type: String, enum: Department })
  department!: string;

  @Prop({ type: Date })
  dateOfJoining?: Date;

  @Prop({ type: Date })
  employmentStartDate!: Date;

  @Prop({ type: String, enum: EmployeeType })
  employmentStartAs!: string;

  @Prop({
    type: String,
    required: true,
    enum: EmployeeStatus,
    default: 'active',
  })
  employeeStatus!: string;

  @Prop({ type: Number, required: true })
  salary!: number;

  @Prop({ type: String, required: true })
  bankAccount!: string;

  @Prop({ type: String, required: true })
  bankName!: string;

  @Prop({ type: String, required: true })
  panNumber!: string;

  @Prop({ type: String, required: true })
  citizenshipNumber!: string;

  @Prop({ type: String, default: null })
  citizenshipFrontPhoto?: string;

  @Prop({ type: String, default: null })
  citizenshipBackPhoto?: string;

  @Prop({ type: String, default: null })
  profilePhoto?: string;

  @Prop({ type: String, default: null })
  panPhoto?: string;

  @Prop({ type: String, default: null })
  github?: string;

  @Prop({ type: String, default: null })
  signaturePhoto?: string;

  @Prop({ type: Number, default: null, enum: [1, 2, 3, 4, 5, 6] })
  internshipDurationMonths!: number;

  @Prop({ type: Boolean, default: false })
  internshipEndingReminderSent!: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
