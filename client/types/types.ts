import { authClient } from '@/lib/auth-client';

export type SessionUser = User & {
  role: string;
};

export type User = typeof authClient.$Infer.Session.user;
export interface UpcommingBirthday {
  id: string;
  name: string;
  birthday: string;
  department: string;
  avatar?: string;
}

export enum Role {
  admin = 'admin',
  hr = 'hr',
  supervisor = 'supervisor',
  employee = 'employee',
  superAdmin = 'superAdmin',
}

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
