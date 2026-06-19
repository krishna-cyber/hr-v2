import AppHeader from '@/components/AppHeader';
import SidebarLogo from '@/components/SidebarLogo';
import SidebarNav from '@/components/SidebarNav';
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
import { MenuGroup, Role } from '@/types/types';
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
import { ErrorBoundary } from 'react-error-boundary';
import RBACProvider from './RBACprovider';
import Error from './errors';

export const menuItems: MenuGroup[] = [
  {
    label: 'Overview',
    roles: [
      Role.admin,
      Role.employee,
      Role.supervisor,
      Role.hr,
      Role.superAdmin,
    ],
    items: [
      {
        label: 'Dashboard',
        icon: <LayoutDashboard size={18} />,
        href: '/dashboard',
        roles: [
          Role.admin,
          Role.employee,
          Role.supervisor,
          Role.hr,
          Role.superAdmin,
        ],
      },
    ],
  },

  {
    label: 'Management',
    roles: [
      Role.admin,
      Role.hr,
      Role.supervisor,
      Role.superAdmin,
      Role.employee,
    ],
    items: [
      {
        label: 'Employees',
        icon: <Users size={18} />,
        href: '/dashboard/employees',
        roles: [Role.admin, Role.hr, Role.superAdmin],
      },
      {
        label: 'Add Employee',
        icon: <UserPlus size={18} />,
        href: '/dashboard/addemployee',
        roles: [Role.admin, Role.hr, Role.superAdmin],
      },
      {
        label: 'Leave Requests',
        icon: <ClipboardList size={18} />,
        href: '/dashboard/leave-request',
        roles: [Role.supervisor, Role.hr, Role.admin, Role.superAdmin],
      },
      {
        label: 'Onboarding',
        icon: <FileText size={18} />,
        href: '/dashboard/onboarding',
        roles: [Role.hr],
      },
      {
        label: 'Exit Forms',
        icon: <LogOut size={18} />,
        href: '/dashboard/exit-form',
        roles: [
          Role.admin,
          Role.hr,
          Role.superAdmin,
          Role.supervisor,
          Role.employee,
        ],
      },
    ],
  },

  {
    label: 'Leave Management',
    roles: [
      Role.hr,
      Role.supervisor,
      Role.employee,
      Role.admin,
      Role.superAdmin,
    ],
    items: [
      {
        label: 'Apply Leave',
        icon: <CalendarDays size={18} />,
        href: '/dashboard/leave',
        roles: [
          Role.hr,
          Role.supervisor,
          Role.employee,
          Role.admin,
          Role.superAdmin,
        ],
      },
      {
        label: 'Leave History',
        icon: <History size={18} />,
        href: '/dashboard/leave-history',
        roles: [
          Role.hr,
          Role.supervisor,
          Role.employee,
          Role.admin,
          Role.superAdmin,
        ],
      },
      {
        label: 'My Leaves',
        icon: <ClipboardList size={18} />,
        href: '/dashboard/my-leaves',
        roles: [Role.supervisor, Role.employee, Role.admin, Role.superAdmin],
      },
    ],
  },

  {
    label: 'Communication',
    roles: [
      Role.admin,
      Role.hr,
      Role.supervisor,
      Role.employee,
      Role.superAdmin,
    ],
    items: [
      {
        label: 'Notifications',
        icon: <Bell size={18} />,
        href: '/dashboard/notifications',
        roles: [
          Role.admin,
          Role.hr,
          Role.supervisor,
          Role.employee,
          Role.superAdmin,
        ],
      },
      {
        label: 'Feedback',
        icon: <MessageSquare size={18} />,
        href: '/dashboard/feedback',
        roles: [Role.admin, Role.hr, Role.supervisor, Role.superAdmin],
      },
    ],
  },

  {
    label: 'My Account',
    roles: [
      Role.admin,
      Role.hr,
      Role.supervisor,
      Role.employee,
      Role.superAdmin,
    ],
    items: [
      {
        label: 'Profile',
        icon: <User size={18} />,
        href: '/dashboard/profile',
        roles: [
          Role.admin,
          Role.hr,
          Role.supervisor,
          Role.employee,
          Role.superAdmin,
        ],
      },
    ],
  },

  {
    label: 'Preferences',
    roles: [
      Role.admin,
      Role.hr,
      Role.supervisor,
      Role.employee,
      Role.superAdmin,
    ],
    items: [
      {
        label: 'Settings',
        icon: <Settings size={18} />,
        href: '/dashboard/setting',
        roles: [
          Role.admin,
          Role.hr,
          Role.supervisor,
          Role.employee,
          Role.superAdmin,
        ],
      },
    ],
  },

  {
    label: 'Miscellaneous',
    roles: [
      Role.admin,
      Role.hr,
      Role.superAdmin,
      Role.supervisor,
      Role.employee,
    ],
    items: [
      {
        label: 'Terminated Employees',
        icon: <UserX size={18} />,
        href: '/dashboard/terminated-employees',
        roles: [Role.admin, Role.hr, Role.superAdmin],
      },
    ],
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

  const userRole = data?.user?.role as Role;

  const filteredMenuItems = menuItems
    .filter((group) => group.roles.includes(userRole))
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(userRole)),
    }));

  return (
    <SidebarProvider
      style={{ '--sidebar-width-icon': '5rem' } as React.CSSProperties}
    >
      {/* To control access to different parts of the app based on user roles */}
      <RBACProvider role={data?.user?.role} menuItems={menuItems}>
        <div className="flex min-h-screen w-screen bg-background">
          <Sidebar collapsible="icon" className="border-r">
            {/* Logo */}
            <SidebarHeader className="border-b border-sidebar-border">
              <SidebarLogo />
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-3">
              <SidebarNav menuItems={filteredMenuItems} />
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
              <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
            </main>
          </SidebarInset>
        </div>
      </RBACProvider>
    </SidebarProvider>
  );
};

export default layout;
