import { authClient } from '@/lib/auth-client';

export type SessionUser = User & {
  role: string;
};

export type User = typeof authClient.$Infer.Session.user;

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}
