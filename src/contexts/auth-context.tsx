"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useStore, Role, User } from "@/store/useStore"

export type { Role }

interface AuthContextType {
  user: User | null
  hasPermission: (roles: Role[]) => boolean
  status: "loading" | "authenticated" | "unauthenticated"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useStore(state => state.user)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const status = !mounted ? "loading" : user ? "authenticated" : "unauthenticated"

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login")
    }
  }, [status, pathname, router])

  const hasPermission = (roles: Role[]) => {
    if (!user) return false
    if (user.role === "superadmin" || user.role === "admin") return true
    return roles.includes(user.role)
  }

  // Prevent hydration mismatch on initial render by not rendering content until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, hasPermission, status }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
