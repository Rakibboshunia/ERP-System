"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const invoices = [
  { id: "INV-4201", customer: "Acme Corp", soRef: "SO-3101", issueDate: "Oct 18, 2026", dueDate: "Nov 17, 2026", amount: "$12,400.00", status: "Unpaid" },
  { id: "INV-4202", customer: "Stark Industries", soRef: "SO-3102", issueDate: "Oct 17, 2026", dueDate: "Nov 16, 2026", amount: "$54,000.00", status: "Partial" },
  { id: "INV-4203", customer: "Oscorp", soRef: "SO-2990", issueDate: "Oct 01, 2026", dueDate: "Oct 15, 2026", amount: "$5,400.00", status: "Overdue" },
  { id: "INV-4204", customer: "Daily Planet", soRef: "SO-2945", issueDate: "Sep 15, 2026", dueDate: "Oct 14, 2026", amount: "$1,250.00", status: "Paid" },
]

export default function InvoicesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Customer invoices generated from confirmed sales orders.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Invoice</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>SO Ref.</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(inv => (
              <TableRow key={inv.id} className={inv.status === "Overdue" ? "bg-rose-500/5" : ""}>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell className="font-semibold">{inv.customer}</TableCell>
                <TableCell className="text-primary text-xs">{inv.soRef}</TableCell>
                <TableCell className="text-muted-foreground">{inv.issueDate}</TableCell>
                <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                <TableCell className="text-right font-bold">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    inv.status === "Paid" ? "default" :
                    inv.status === "Overdue" ? "destructive" :
                    inv.status === "Partial" ? "secondary" : "outline"
                  } className={
                    inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                    inv.status === "Partial" ? "bg-amber-500/10 text-amber-600" :
                    inv.status === "Unpaid" ? "text-muted-foreground" : ""
                  }>
                    {inv.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {inv.status !== "Paid" && <Button size="sm" variant="outline">Record Payment</Button>}
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
