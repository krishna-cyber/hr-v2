import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LeaveType } from 'types/types';

export type LeaveDocument = HydratedDocument<Leave>;

@Schema({ timestamps: true })
export class Leave {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  employeeId!: string;

  @Prop({ type: String, enum: LeaveType, required: true })
  leaveType!: string;

  @Prop({
    type: String,
    enum: ['full_day', 'half_day', 'multiple_days'],
    default: 'full_day',
  })
  durationType!: string;

  @Prop({ type: Date, required: true })
  startDate!: Date;

  @Prop({ type: Date, required: true })
  endDate!: Date;

  @Prop({ type: Number, required: true })
  numberOfDays!: number;

  @Prop({ type: String, required: true })
  reason!: string;

  @Prop({
    type: String,
    enum: [
      'pending',
      'cancelled',
      'rejected',
      'supervisor_approved',
      'admin_approved',
    ],
    default: 'pending',
  })
  status!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  currentApprover!: string;

  @Prop({ type: Boolean, default: false })
  isPreviousLeave!: boolean;

  @Prop({ type: Boolean, default: true })
  isPaid!: boolean;

  @Prop({ type: String, default: null })
  slackMetadata!: string;

  @Prop({ type: String, enum: ['first_half', 'second_half'], default: null })
  halfDayPeriod!: string;

  @Prop({ type: [String], default: [] })
  comments!: string[];
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
