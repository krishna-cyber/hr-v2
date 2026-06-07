import { authClient } from '@/lib/auth-client';

export type SessionUser = typeof authClient.$Infer.Session.user;
