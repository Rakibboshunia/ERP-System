"use client"

import { useAuth } from "@/contexts/auth-context"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, User as UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RoleSwitcher() {
  const { user, status } = useAuth()

  if (status !== "authenticated" || !user) return null

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2.5 bg-muted/40 border border-border/60 rounded-full px-3 py-1">
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-background" />
        </div>
        <div className="flex flex-col text-left hidden sm:flex">
          <span className="text-xs font-semibold leading-tight">{user.name}</span>
          <span className="text-[10px] text-muted-foreground capitalize leading-tight">{user.role.replace("_", " ")}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10" onClick={() => signOut({ callbackUrl: "/login" })}>
        <LogOut className="w-3.5 h-3.5 mr-1.5" />
        Sign Out
      </Button>
    </div>
  )
}
