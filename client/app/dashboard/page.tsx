import BirthdayCard from '@/components/BirthdayCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Role } from '@/types/types';

import {
  ArrowUp,
  ClipboardList,
  LayoutDashboard,
  RefreshCcw,
  StickyNoteCheck,
  UserPen,
  UserPlus,
  Users,
  UserStar,
  Zap,
} from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const quickActions = [
  {
    label: 'Add Employee',
    path: 'dashboard/addemployee',
    icon: <UserPlus className="h-5 w-5" />,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-50',
    roles: [Role.admin, Role.hr, Role.superAdmin],
  },
  {
    label: 'Review Requests',
    path: 'dashboard/leave-request',
    icon: <StickyNoteCheck className="h-5 w-5" />,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-50',
    roles: [Role.hr, Role.superAdmin], // NOT admin
  },
  {
    label: 'Manage Employees',
    path: 'dashboard/employees',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-50',
    roles: [Role.admin, Role.hr, Role.superAdmin],
  },
  {
    label: 'Profile',
    path: 'dashboard/profile',
    icon: <UserPen className="h-5 w-5" />,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-50',
    roles: [Role.admin, Role.hr, Role.employee, Role.superAdmin],
  },
];

const statsConfig = [
  {
    key: 'totalEmployees',
    title: 'Total Employees',
    description: 'From last month',
    icon: <UserPlus size={18} className="h-5 w-5 text-primary" />,
  },
  {
    key: 'pendingRequests',
    title: 'Pending Requests',
    description: 'Leave requests awaiting this week',
    icon: <ClipboardList size={18} className="h-5 w-5 text-primary" />,
  },
  {
    key: 'approvedToday',
    title: 'Approved Today',
    description: 'Increased from yesterday',
    icon: <ClipboardList size={18} className="h-5 w-5 text-primary" />,
  },

  {
    key: 'totalSupervisors',
    title: 'Supervisors',
    description: 'Supervisors in the organization',
    icon: <UserStar size={18} className="h-5 w-5 text-primary" />,
  },
] as const;

const page = async () => {
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex gap-2">
              <LayoutDashboard className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Dashboard Overview
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Summary of platform performance and stats.
            </p>
          </div>
          <Link href="/dashboard" className="ml-auto">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </Link>
        </div>

        <div className="alert alert-error">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <label>{error.message}</label>
          </div>
        </div>
      </div>
    );
  }

  const role = data?.user?.role;
  if (role == Role.hr || role == Role.superAdmin || role == Role.admin) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex gap-2">
              <LayoutDashboard className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Dashboard Overview
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Summary of platform performance and stats.
            </p>
          </div>
          <Link href="/dashboard" className="ml-auto">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsConfig.map((stat) => {
            return (
              <Card
                key={stat.key}
                className="hover:shadow-md transition-shadow duration-200 group"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent className="group-hover:scale-105 transform transition-all duration-200">
                  <div className="text-2xl md:text-3xl font-bold">
                    {/* {value} */}20
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span
                      className={cn(
                        'text-xs font-medium text-green-600',
                        // changeType === 'positive' && 'text-green-600',
                        // changeType === 'negative' && 'text-red-600',
                        // changeType === 'neutral' && 'text-muted-foreground',
                      )}
                    >
                      10% <ArrowUp className="h-4 w-4 inline-block" />
                      {/* {formatChange(change)} */}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="flex flex-col gap-5">
            {/* <RecentActivityCard
              activities={data?.recentActivity ?? []}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            /> */}

            {/* Quick Actions card */}
            <QuickActionCard role={role} />
          </div>

          {/* Birthday Dashboard and Schedule Interview  */}
          <div className="space-y-6">
            {/* Birthday Dashboard */}

            <BirthdayCard />

            {/* Scheduled Interview card */}
            {
              // <ScheduleInterviewCard
              //   // candidates={candidates} // pass your real candidates array here
              //   // isLoading={isLoading}
              //   onSchedule={async (candidateId, form) => {
              //     // call your API / mutation here
              //     // await scheduleInterview(candidateId, form);
              //     console.log(
              //       'interview details.......////////',
              //       candidateId,
              //       form,
              //     );
              //   }}
              // />
            }

            {/* Additional Stats Card */}
            {
              // <AdditionalStatsCard
              //   stats={data?.additionalStats ?? null}
              //   isLoading={isLoading}
              //   role={role}
              // />
            }
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Employee dashboard</p>;
  }
};

export default page;

function QuickActionCard({ role }: Readonly<{ role: string }>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <Zap size={30} className="text-primary -translate-y-1" />
          <p>Quick Actions</p>
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions
            .filter((action) => role && action.roles.includes(role as Role))
            .map((action) => {
              return (
                <Link key={action.label} href={action.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-lg border dark:hover:text-black transition-colors text-left',
                      action.hoverColor,
                    )}
                  >
                    <div
                      className={cn(
                        'h-10 w-10 rounded-lg flex items-center dark:hover:text-black justify-center text-white',
                        action.color,
                      )}
                    >
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
