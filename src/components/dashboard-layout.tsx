"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RoleSwitcher } from "@/components/role-switcher"
import { Search, Bell, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/login") {
    return <main className="w-full min-h-screen">{children}</main>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 glass-nav sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 text-xs text-muted-foreground w-64 cursor-pointer hover:bg-muted/50 transition-colors">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Search modules or data...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative text-muted-foreground hover:text-foreground">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </Button>

            <div className="h-4 w-[1px] bg-border/60" />
            
            <RoleSwitcher />
          </div>
        </header>
        <div className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
          {children}
        </div>
      </main>
      
    </SidebarProvider>
  )
}
