"use client"

import React, { createContext, useContext, useEffect } from "react"
import { useSession, SessionProvider } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export type Role = "superadmin" | "admin" | "hr" | "accountant" | "sales_manager" | "inventory_manager" | "employee"

interface User {
  name: string
  role: Role
  email?: string
}

interface AuthContextType {
  user: User | null
  hasPermission: (roles: Role[]) => boolean
  status: "loading" | "authenticated" | "unauthenticated"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextInner>{children}</AuthContextInner>
    </SessionProvider>
  )
}

function AuthContextInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login")
    }
  }, [status, pathname, router])

  const user = session?.user ? {
    name: session.user.name || "User",
    email: session.user.email || "",
    role: (session.user as any).role as Role || "employee"
  } : null

  const hasPermission = (roles: Role[]) => {
    if (!user) return false
    if (user.role === "superadmin" || user.role === "admin") return true
    return roles.includes(user.role)
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
