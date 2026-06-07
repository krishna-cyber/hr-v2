"use client"
import React from 'react';
import { useSidebar } from './ui/sidebar';

const SidebarLogo = () => {
     const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
   <div className={`flex items-center gap-3 px-3 ${isCollapsed ? "py-6" : "py-3"}`}>
      {isCollapsed ? null : (
        <>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-md bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-md`}
          >
            
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-10 w-10 rounded-md object-cover"
              />
           
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-foreground">Palm Mind</span>
            <span className="text-xs text-muted-foreground">Technology</span>
          </div>
        </>
      )}
    </div>
  )
}

export default SidebarLogo