"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RoleSwitcher } from "@/components/role-switcher"
import { SearchCommand } from "@/components/search-command"
import { NotificationPanel } from "@/components/notification-panel"
import { QuickActionsPanel } from "@/components/quick-actions-panel"
import { Search, Bell, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const [qaOpen, setQaOpen] = React.useState(false)
  const [unreadCount, setUnreadCount] = React.useState(3)

  const bellRef = React.useRef<HTMLButtonElement>(null)
  const sparklesRef = React.useRef<HTMLButtonElement>(null)

  // Global ⌘K / Ctrl+K shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
        setNotifOpen(false)
        setQaOpen(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (pathname === "/login") {
    return <main className="w-full min-h-screen">{children}</main>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-blue-50/80 via-background to-purple-50/80 dark:from-blue-950/30 dark:via-background dark:to-purple-950/30 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] opacity-[0.015] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/10 header-glass sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
            {/* Search trigger */}
            <button
              id="search-trigger"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/60 bg-white/5 dark:bg-black/20 text-xs text-muted-foreground w-64 cursor-pointer hover:bg-white/10 dark:hover:bg-black/30 transition-all shadow-sm"
            >
              <Search className="w-4 h-4 text-primary/70" />
              <span>Search modules or data...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded bg-muted/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>
            {/* Mobile search icon */}
            <button
              className="sm:hidden p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Quick Actions / AI */}
            <Button
              ref={sparklesRef}
              variant="ghost"
              size="icon"
              id="quick-actions-btn"
              className="hidden sm:flex h-10 w-10 rounded-full relative text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={() => { setQaOpen(prev => !prev); setNotifOpen(false) }}
            >
              <Sparkles className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button
              ref={bellRef}
              variant="ghost"
              size="icon"
              id="notifications-btn"
              className="h-10 w-10 rounded-full relative text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={() => { setNotifOpen(prev => !prev); setQaOpen(false) }}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 min-w-[16px] h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center px-0.5 shadow-[0_0_8px_rgba(234,88,12,0.8)] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>

            <div className="h-5 w-[1px] bg-border/60 mx-1" />
            <RoleSwitcher />
          </div>
        </header>

        {/* Panels rendered at layout level (positioned: absolute) */}
        <NotificationPanel
          open={notifOpen}
          onClose={() => { setNotifOpen(false); setUnreadCount(0) }}
          anchorRef={bellRef}
        />
        
        <QuickActionsPanel
          open={qaOpen}
          onClose={() => setQaOpen(false)}
          anchorRef={sparklesRef}
        />

        {/* Search Command Palette */}
        <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
