"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const purchaseOrders = [
  { id: "PO-4101", supplier: "TechParts Inc.", prRef: "PR-3001", items: 12, total: "$14,200.00", orderDate: "Oct 16, 2026", deliveryDate: "Oct 23, 2026", status: "Confirmed" },
  { id: "PO-4102", supplier: "Global Steel Co.", prRef: "PR-3002", items: 5, total: "$32,500.00", orderDate: "Oct 17, 2026", deliveryDate: "Oct 28, 2026", status: "Sent" },
  { id: "PO-4103", supplier: "OfficeWorld", prRef: "PR-3003", items: 8, total: "$780.00", orderDate: "Oct 18, 2026", deliveryDate: "Oct 21, 2026", status: "Draft" },
]

export default function OrdersPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>Formal orders sent to suppliers for approved purchase requests.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create PO</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO No.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>PR Ref.</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map(po => (
              <TableRow key={po.id}>
                <TableCell className="font-medium">{po.id}</TableCell>
                <TableCell className="font-semibold">{po.supplier}</TableCell>
                <TableCell className="text-primary text-xs">{po.prRef}</TableCell>
                <TableCell className="text-right">{po.items}</TableCell>
                <TableCell className="text-right font-bold">{po.total}</TableCell>
                <TableCell className="text-muted-foreground">{po.orderDate}</TableCell>
                <TableCell className="text-muted-foreground">{po.deliveryDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    po.status === "Confirmed" ? "default" :
                    po.status === "Sent" ? "secondary" : "outline"
                  } className={
                    po.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                    po.status === "Sent" ? "bg-blue-500/10 text-blue-600" :
                    "bg-muted/50 text-muted-foreground"
                  }>
                    {po.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
