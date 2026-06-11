// components/auth/RBACProvider.tsx
'use client';
import { MenuGroup } from '@/types/types';
import { notFound, usePathname } from 'next/navigation';
import React, { AriaRole } from 'react';

interface RBACProviderProps {
  role: string;
  menuItems: MenuGroup[];
  children: React.ReactNode;
}

export default function RBACProvider({
  role,
  menuItems,
  children,
}: RBACProviderProps) {
  // Use client-side hook to extract the routing path accurately
  const pathname = usePathname();

  // 1. Flatten all menu navigation sub-items into a singular linear array
  const allSubItems = menuItems.flatMap((group) => group.items);

  // 2. Locate the current configuration record corresponding to the current page path
  const currentItemConfig = allSubItems.find((item) => item.href === pathname);

  // 3. Force 404 block state if the configuration path matches but roles mismatch
  if (currentItemConfig && !currentItemConfig.roles.includes(role)) {
    notFound();
  }

  return <>{children}</>;
}
