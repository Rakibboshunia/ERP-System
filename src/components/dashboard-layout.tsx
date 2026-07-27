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
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/10 header-glass sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/60 bg-white/5 dark:bg-black/20 text-xs text-muted-foreground w-64 cursor-pointer hover:bg-white/10 dark:hover:bg-black/30 transition-all shadow-sm">
              <Search className="w-4 h-4 text-primary/70" />
              <span>Search modules or data...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded bg-muted/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10 rounded-full relative text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full relative text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(234,88,12,0.8)] animate-pulse" />
            </Button>

            <div className="h-5 w-[1px] bg-border/60 mx-1" />
            
            <RoleSwitcher />
          </div>
        </header>
        <div className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
          {children}
        </div>
      </main>
      
    </SidebarProvider>
  )
}
