"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Scale, DollarSign, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function AccountingLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Accounting & Finance</h1>
          <p className="text-muted-foreground">Manage the general ledger, financial statements, and reporting.</p>
        </div>
        {canManage && <Button className="flex items-center gap-2"><Plus className="w-4 h-4" />Journal Entry</Button>}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Net Profit (YTD)", value: "$114,000", color: "text-emerald-600", icon: TrendingUp, border: "border-l-emerald-500" },
          { label: "Total Revenue", value: "$512,000", color: "text-blue-600", icon: DollarSign, border: "border-l-blue-500" },
          { label: "Total Expenses", value: "$398,000", color: "text-amber-600", icon: TrendingDown, border: "border-l-amber-500" },
          { label: "Accounts Receivable", value: "$45,231", color: "text-rose-600", icon: Scale, border: "border-l-rose-500" },
        ].map((kpi) => (
          <Card key={kpi.label} className={`border-border/50 shadow-sm border-l-4 ${kpi.border}`}>
            <CardContent className="pt-6 flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full"><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{kpi.label}</p><p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
