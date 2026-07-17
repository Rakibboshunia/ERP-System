"use client"

import { useAuth } from "@/contexts/auth-context"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function RoleSwitcher() {
  const { user, status } = useAuth()

  if (status !== "authenticated" || !user) return null

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col text-right hidden sm:flex">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
