"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, CheckSquare, Users, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Project Management</h1>
          <p className="text-muted-foreground">Track projects, manage tasks, and monitor team performance.</p>
        </div>
        {canManage && <Button className="flex items-center gap-2"><Plus className="w-4 h-4" />New Project</Button>}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Projects", value: "3", icon: Briefcase, color: "text-primary", bg: "bg-primary/10" },
          { label: "Open Tasks", value: "12", icon: CheckSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Team Members", value: "5", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Hours This Week", value: "87h", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map(k => (
          <Card key={k.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-6 flex items-center gap-3">
              <div className={`${k.bg} p-2 rounded-full`}><k.icon className={`w-5 h-5 ${k.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{k.label}</p><p className="text-2xl font-bold">{k.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full">{children}</div>
    </div>
  )
}
