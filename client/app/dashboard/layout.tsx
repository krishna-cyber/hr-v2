import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {



  const isCollapsed = true;
  return (
    <SidebarProvider
      style={{ '--sidebar-width-icon': '5rem' } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-screen bg-background">
        <Sidebar collapsible="icon" className="border-r">
          {/* Logo */}
          <SidebarHeader className="border-b border-sidebar-border">
            <div
              className={`flex items-center gap-3 px-3 ${isCollapsed ? 'py-6' : 'py-3'}`}
            >
              {isCollapsed ? null : (
                <>
                  <div
                    className={`flex h-10 w-10 items-center justify-center from-primary to-primary/80 rounded-md bg-linear-to-br text-primary-foreground font-bold text-lg shadow-md`}
                  >
                    <Image
                      src="/logo.jpeg"
                      width={40}
                      height={40}
                      alt="Logo"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      Palm Mind
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Technology
                    </span>
                  </div>
                </>
              )}
            </div>
          </SidebarHeader>

          {/* Navigation */}
          <SidebarContent className="px-3">
            {/* <SidebarNav groups={navGroups as any} /> */}
          </SidebarContent>

          {/* Footer User Menu */}
          <SidebarFooter className="border-t border-sidebar-border p-2">
            {/* <SidebarUserMenu user={user} settingsPath="setting" /> */}
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Main */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Top Header */}
          {/* <AppHeader
              currentPage={currentPage}
              notificationCount={unreadNotificationCount}
              userName={user.name.split(" ")[0]}
            /> */}
             <header className={`sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 ${isCollapsed ? "py-0" : "py-10"}`}>
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="h-6" />

      {/* Breadcrumb - Desktop */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {/* {currentPage} */}
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <Link
        href="/dashboard/notifications"
          className="relative cursor-pointer"
       
        >
          <Bell className="h-5 w-5" />
          
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center ">
              {/* {notificationCount > 9 ? "9+" : notificationCount} */}9+
            </span>
      
        </Link>

        {/* Mobile: Page title */}
        <span className="md:hidden text-sm font-medium">
          {/* {currentPage} */}
          Dashboard
          </span>

        {/* Desktop: User greeting */}
        <div className="hidden md:flex items-center gap-3 rounded-full bg-muted px-4 py-2">
          <span className="text-sm">
            Welcome back, <span className="font-semibold">
              {/* {userName} */}
              Krishna Tiwari
              </span>
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
