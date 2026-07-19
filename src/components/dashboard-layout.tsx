"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RoleSwitcher } from "@/components/role-switcher"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/login") {
    return <main className="w-full min-h-screen">{children}</main>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      
      <main className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <header className="h-16 flex items-center px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <RoleSwitcher />
          </div>
        </header>
        <div className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      
    </SidebarProvider>
  )
}
