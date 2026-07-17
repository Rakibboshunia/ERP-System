"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Building2, Eye, EyeOff, ShieldCheck } from "lucide-react"

const demoRoles = [
  { role: "Super Admin", email: "superadmin@erp.com", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  { role: "Admin", email: "admin@erp.com", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { role: "HR", email: "hr@erp.com", color: "bg-green-500/10 text-green-600 border-green-200" },
  { role: "Accountant", email: "accountant@erp.com", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  { role: "Sales Manager", email: "sales@erp.com", color: "bg-rose-500/10 text-rose-600 border-rose-200" },
  { role: "Inventory Manager", email: "inventory@erp.com", color: "bg-teal-500/10 text-teal-600 border-teal-200" },
  { role: "Employee", email: "employee@erp.com", color: "bg-slate-500/10 text-slate-600 border-slate-200" },
]

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("superadmin@erp.com")
  const [selectedRole, setSelectedRole] = useState("Super Admin")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    const result = await signIn("credentials", {
      email,
      password: "password123",
      redirect: false
    })
    
    if (result?.ok) {
      router.push("/")
      router.refresh()
    } else {
      setIsLoading(false)
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-primary text-primary-foreground p-2.5 rounded-xl shadow-lg">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Enterprise ERP</h1>
            <p className="text-xs text-muted-foreground">Unified Business Management Platform</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your ERP account to continue.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button onClick={handleLogin} disabled={isLoading} className="w-full mt-1">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>

        {/* RBAC Demo Panel */}
        <Card className="border-border/50 shadow-sm bg-muted/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm">RBAC Demo — Quick Login</CardTitle>
            </div>
            <CardDescription className="text-xs">Click any role to pre-fill credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map(({ role, email: demoEmail, color }) => (
                <button
                  key={role}
                  onClick={() => { setEmail(demoEmail); setSelectedRole(role) }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:scale-[1.02] cursor-pointer ${color} ${selectedRole === role ? "ring-2 ring-offset-1 ring-primary" : ""}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
