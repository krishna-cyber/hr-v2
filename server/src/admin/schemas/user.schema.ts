import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'types/types';
import { Employee } from './employee.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'user',
  _id: false,
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    default: false,
  })
  emailVerified!: boolean;

  @Prop()
  image?: string;

  @Prop({
    enum: Role,
    default: Role.employee,
    required: true,
  })
  role!: Role;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee.name,
    default: null,
  })
  employeeId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ role: 1 });
