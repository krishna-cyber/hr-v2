'use client';

import { SessionUser, User } from '@/types/types';
import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { SidebarTrigger, useSidebar } from './ui/sidebar';

const AppHeader = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 ${isCollapsed ? 'py-0' : 'py-10'}`}
    >
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="h-6" />

      {/* Breadcrumb - Desktop */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {segments.map((segment, index) => {
            return (
              <>
                <BreadcrumbItem key={segment + index}>
                  <BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join('/')}`}
                  >
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5" />

          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center ">
            9+
          </span>
        </Button>

        {/* Mobile: Page title */}
        <span className="md:hidden text-sm font-medium">Dashboard</span>

        {/* Desktop: User greeting */}
        <div className="hidden md:flex items-center gap-3 rounded-full bg-muted px-4 py-2">
          <span className="text-sm">
            Welcome back, <span className="font-semibold">{user.name}</span>
          </span>
        </div>
        {/* <div className="flex items-center space-x-2 ">
          <Switch
            className="cursor-pointer"
            checked={theme === "dark"}
            onCheckedChange={() => dispatch(changeTheme())}
            id="dark-light-mode"
          />
          <Label htmlFor="dark-light-mode">{theme === "dark" ? "Light" : "Dark"}</Label>
        </div> */}
      </div>
    </header>
  );
};

export default AppHeader;
