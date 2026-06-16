import type { Request as ExpressRequest } from 'express';
import { User } from 'src/admin/schemas/user.schema';
import { auth } from 'src/auth';

export interface OtpTemplateContext {
  otp: string;
}

export interface VerifyEmailContext {
  firstName: string;
  email: string;
  logiverificationlink: string;
}
export interface WelcomeTemplateContext {
  firstName: string;
  email: string;
  password: string;
  loginUrl: string;
}

export interface ForgotPasswordTemplateContext {
  firstName: string;
  code: string;
}

export enum EmployeeType {
  fullTime = 'full-time',
  partTime = 'part-time',
  contract = 'contract',
  intern = 'intern',
  probation = 'probation',
}

export enum Department {
  hr = 'hr',
  AI_ML = 'AI/ML',
  FULL_STACK_DEVELOPER = 'Full Stack Developer',
  QA = 'QA',
  marketing = 'marketing',
  sales = 'sales',
  operations = 'operations',
  finance = 'finance',
  other = 'other',
}

export enum EmployeeStatus {
  active = 'active',
  onLeave = 'onLeave',
  terminated = 'terminated',
  noticePeriod = 'noticePeriod',
  resigned = 'resigned',
  work_from_home = 'work_from_home',
}

export enum LeaveType {
  annual = 'annual',
  sick = 'sick',
  casual = 'casual',
  maternity = 'maternity',
  paternity = 'paternity',
  work_from_home = 'work_from_home',
  wedding = 'wedding',
  mourning = 'mourning',
}

export enum Role {
  admin = 'admin',
  hr = 'hr',
  supervisor = 'supervisor',
  employee = 'employee',
  superAdmin = 'superAdmin',
}

type AuthInstance = ReturnType<typeof auth>;
export interface AuthenticatedRequest extends ExpressRequest {
  user: User;
  session: AuthInstance['$Infer']['Session']['session'];
}

export type CreateEmployeeFiles = {
  citizenshipFrontPhoto?: Express.Multer.File[];
  citizenshipBackPhoto?: Express.Multer.File[];
  panPhoto?: Express.Multer.File[];
  profilePhoto?: Express.Multer.File[];
  signaturePhoto?: Express.Multer.File[];
};
