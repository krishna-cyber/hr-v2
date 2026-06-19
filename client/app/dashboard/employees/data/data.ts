import { Role } from '@/types/types';
import { Shield, UserCheck, Users, UserStar } from 'lucide-react';
import { type EmployeeStatus } from './schema';

export const callTypes = new Map<EmployeeStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [
    'onLeave',
    'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200',
  ],
  ['terminated', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
  [
    'noticePeriod',
    'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200',
  ],
  [
    'resigned',
    'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  ],
  [
    'work_from_home',
    'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200',
  ],
]);

export const roles = [
  {
    label: 'Super Admin',
    value: Role.superAdmin,
    icon: Shield,
  },
  {
    label: 'Admin',
    value: Role.admin,
    icon: UserCheck,
  },
  {
    label: 'HR',
    value: Role.hr,
    icon: UserCheck,
  },
  {
    label: 'Supervisor',
    value: Role.supervisor,
    icon: UserStar,
  },
  {
    label: 'Employee',
    value: Role.employee,
    icon: Users,
  },
] as const;
