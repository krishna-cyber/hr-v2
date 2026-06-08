export interface OtpTemplateContext {
  otp: string;
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
