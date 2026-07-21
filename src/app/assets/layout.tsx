"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HardDrive, TrendingDown, AlertTriangle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Asset Management</h1>
          <p className="text-muted-foreground">Track company assets, manage depreciation, and monitor allocations.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Register Asset
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><HardDrive className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Total Assets</p><p className="text-2xl font-bold">6</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><HardDrive className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Total Purchase Cost</p><p className="text-2xl font-bold">$205,000</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-full"><TrendingDown className="w-5 h-5 text-emerald-500" /></div>
            <div><p className="text-xs text-muted-foreground">Current Book Value</p><p className="text-2xl font-bold text-emerald-600">$123,650</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Total Depreciation</p><p className="text-2xl font-bold text-amber-600">$81,350</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
