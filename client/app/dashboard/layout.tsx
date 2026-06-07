import AppHeader from '@/components/AppHeader';
import SidebarLogo from '@/components/SidebarLogo';
import SidebarUserMenu from '@/components/SidebarUserMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { MenuItem } from '@/types/types';
import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  Users,
  UserX,
} from 'lucide-react';
import { headers } from 'next/headers';

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
    href: '/dashboard',
  },

  // Employee
  {
    label: 'Apply Leave',
    icon: <CalendarDays size={18} />,
    href: '/dashboard/employee/leave',
  },
  {
    label: 'Leave History',
    icon: <History size={18} />,
    href: '/dashboard/employee/leave-history',
  },
  {
    label: 'My Leaves',
    icon: <ClipboardList size={18} />,
    href: '/dashboard/employee/my-leaves',
  },
  {
    label: 'Profile',
    icon: <User size={18} />,
    href: '/dashboard/employee/profile',
  },
  {
    label: 'Settings',
    icon: <Settings size={18} />,
    href: '/dashboard/employee/setting',
  },

  // Admin / HR
  {
    label: 'Employees',
    icon: <Users size={18} />,
    href: '/dashboard/admin/employees',
  },
  {
    label: 'Add Employee',
    icon: <UserPlus size={18} />,
    href: '/dashboard/admin/addemployee',
  },
  {
    label: 'Leave Requests',
    icon: <ClipboardList size={18} />,
    href: '/dashboard/admin/leave-request',
  },
  {
    label: 'Terminated Employees',
    icon: <UserX size={18} />,
    href: '/dashboard/admin/terminated-employees',
  },

  // Feedback
  {
    label: 'Feedback',
    icon: <MessageSquare size={18} />,
    href: '/dashboard/feedback',
  },

  // HR
  {
    label: 'Onboarding',
    icon: <FileText size={18} />,
    href: '/dashboard/hr/onboarding',
  },

  // Common
  {
    label: 'Notifications',
    icon: <Bell size={18} />,
    href: '/dashboard/notifications',
  },
  {
    label: 'Exit Forms',
    icon: <LogOut size={18} />,
    href: '/dashboard/exit-form',
  },
];

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data } = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  return (
    <SidebarProvider
      style={{ '--sidebar-width-icon': '5rem' } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-screen bg-background">
        <Sidebar collapsible="icon" className="border-r">
          {/* Logo */}
          <SidebarHeader className="border-b border-sidebar-border">
            <SidebarLogo />
          </SidebarHeader>

          {/* Navigation */}
          <SidebarContent className="px-3">
            {/* <SidebarNav groups={navGroups as any} /> */}
          </SidebarContent>

          {/* Footer User Menu */}
          <SidebarFooter className="border-t border-sidebar-border p-2">
            <SidebarUserMenu />
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Main */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Top Header */}
          {data?.user && <AppHeader user={data.user} />}

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {/* <main className=""> */}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default layout;
