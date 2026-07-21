"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const supplierInvoices = [
  { id: "SINV-7001", poRef: "PO-4101", supplier: "TechParts Inc.", invoiceDate: "Oct 24, 2026", dueDate: "Nov 23, 2026", amount: "$14,200.00", status: "Unpaid" },
  { id: "SINV-7002", poRef: "PO-4102", supplier: "Global Steel Co.", invoiceDate: "Oct 26, 2026", dueDate: "Nov 10, 2026", amount: "$19,500.00", status: "Partial" },
  { id: "SINV-7003", poRef: "PO-3990", supplier: "OfficeWorld", invoiceDate: "Oct 10, 2026", dueDate: "Oct 17, 2026", amount: "$780.00", status: "Paid" },
]

export default function InvoicesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])
  const canApprove = hasPermission(["superadmin", "admin"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Supplier Invoices</CardTitle>
            <CardDescription>Invoices received from suppliers matched against purchase orders.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Record Invoice</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>PO Ref.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierInvoices.map(inv => (
              <TableRow key={inv.id} className={inv.status === "Unpaid" ? "bg-rose-500/5" : ""}>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell className="text-primary text-xs">{inv.poRef}</TableCell>
                <TableCell className="font-semibold">{inv.supplier}</TableCell>
                <TableCell className="text-muted-foreground">{inv.invoiceDate}</TableCell>
                <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                <TableCell className="text-right font-bold">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    inv.status === "Paid" ? "default" :
                    inv.status === "Partial" ? "secondary" : "destructive"
                  } className={
                    inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                    inv.status === "Partial" ? "bg-amber-500/10 text-amber-600" : ""
                  }>
                    {inv.status}
                  </Badge>
                </TableCell>
                {canApprove && (
                  <TableCell className="text-right">
                    {inv.status !== "Paid" && (
                      <Button size="sm" variant="outline">Mark Paid</Button>
                    )}
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
