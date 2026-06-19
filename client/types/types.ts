import { authClient } from '@/lib/auth-client';

interface Step {
  id: number;
  name: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export enum Role {
  admin = 'admin',
  hr = 'hr',
  supervisor = 'supervisor',
  employee = 'employee',
  superAdmin = 'superAdmin',
}

export type SessionUser = User & {
  role: string;
};

export type User = typeof authClient.$Infer.Session.user;
export interface UpcommingBirthday {
  _id: string;
  name: string;
  birthday: string;
  department: string;
  avatar?: string;
}

export const Genders = ['male', 'female', 'other'] as const;

export const BloodGroups = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: Role[];
};

export type MenuGroup = {
  label: string;
  roles: Role[];
  items: MenuItem[];
};
