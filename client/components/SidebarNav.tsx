'use client';
import { cn } from '@/lib/utils';
import { MenuGroup } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Badge } from './ui/badge';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const SidebarNav = ({ menuItems }: { menuItems: MenuGroup[] }) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const location = usePathname();
  return (
    <>
      {menuItems.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            {group.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    {isCollapsed ? (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              className={cn(
                                'transition-all duration-200',
                                isActive
                                  ? 'bg-primary text-white hover:bg-primary/90'
                                  : 'text-muted-foreground',
                              )}
                            >
                              <Link href={item.href}>{item.icon}</Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="flex items-center gap-2 bg-primary text-white"
                          >
                            {item.label}
                            {/* {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.label === 'Notifications'
                                  ? unreadNotificationCount
                                  : pendingLeaveCount}
                              </Badge>
                            )} */}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          'transition-all duration-200',
                          isActive
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'text-muted-foreground',
                        )}
                      >
                        <Link href={item.href}>
                          <span
                            className={`${isActive ? 'text-white' : 'text-primary'}`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`text-sm ${isActive ? 'text-white' : 'text-primary'}`}
                          >
                            {item.label}
                          </span>
                          {/* {item.badge && (
                            <Badge
                              variant="secondary"
                              className={cn(
                                'ml-auto text-xs px-2',
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-primary/10 text-primary',
                              )}
                            >
                              {item.name === 'Notifications'
                                ? unreadNotificationCount
                                : pendingLeaveCount}
                            </Badge>
                          )} */}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export default SidebarNav;
