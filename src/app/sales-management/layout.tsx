"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, ShoppingCart, DollarSign, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sales Management</h1>
          <p className="text-muted-foreground">Manage the complete order-to-cash cycle from quotations to returns.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Quotation
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><TrendingUp className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Active Quotations</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><ShoppingCart className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Open Orders</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><DollarSign className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Outstanding Invoices</p><p className="text-2xl font-bold text-amber-500">$66,400</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><AlertCircle className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Pending Returns</p><p className="text-2xl font-bold text-rose-500">1</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
