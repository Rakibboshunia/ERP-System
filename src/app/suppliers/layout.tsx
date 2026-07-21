"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, History, CreditCard, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function SuppliersLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Supplier Management</h1>
          <p className="text-muted-foreground">Manage suppliers, track purchase history, and monitor payment obligations.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Supplier
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><Truck className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Active Suppliers</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-full"><History className="w-5 h-5 text-emerald-500" /></div>
            <div><p className="text-xs text-muted-foreground">Open POs</p><p className="text-2xl font-bold">6</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><CreditCard className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Payments Due (30d)</p><p className="text-2xl font-bold">$47,480</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><AlertCircle className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Overdue Payments</p><p className="text-2xl font-bold text-rose-500">1</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">{children}</div>
    </div>
  )
}
