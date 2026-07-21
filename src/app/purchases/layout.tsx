"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, ShoppingBag, PackageCheck, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function PurchasesLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Purchase Management</h1>
          <p className="text-muted-foreground">Manage the full procure-to-pay cycle from requests to supplier invoices.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Purchase Request
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><ClipboardList className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Pending Requests</p><p className="text-2xl font-bold">2</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><ShoppingBag className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Open POs</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><PackageCheck className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Partial Receipts</p><p className="text-2xl font-bold text-amber-500">1</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><FileText className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Unpaid Invoices</p><p className="text-2xl font-bold text-rose-500">$33,700</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
