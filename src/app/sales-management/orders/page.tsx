"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const salesOrders = [
  { id: "SO-3101", customer: "Acme Corp", qtRef: "QT-2001", date: "Oct 17, 2026", amount: "$12,400.00", deliveryDate: "Oct 24, 2026", status: "Confirmed" },
  { id: "SO-3102", customer: "Stark Industries", qtRef: "QT-2003", date: "Oct 16, 2026", amount: "$54,000.00", deliveryDate: "Oct 28, 2026", status: "Processing" },
  { id: "SO-3103", customer: "Queen Consolidated", qtRef: "--", date: "Oct 18, 2026", amount: "$7,500.00", deliveryDate: "Oct 23, 2026", status: "On Hold" },
]

export default function OrdersPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Orders</CardTitle>
            <CardDescription>Confirmed customer orders ready for fulfillment.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Order</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SO No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Quote Ref.</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesOrders.map(so => (
              <TableRow key={so.id}>
                <TableCell className="font-medium">{so.id}</TableCell>
                <TableCell className="font-semibold">{so.customer}</TableCell>
                <TableCell className="text-primary text-xs">{so.qtRef}</TableCell>
                <TableCell className="text-muted-foreground">{so.date}</TableCell>
                <TableCell className="text-right font-bold">{so.amount}</TableCell>
                <TableCell className="text-muted-foreground">{so.deliveryDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    so.status === "Confirmed" ? "default" :
                    so.status === "Processing" ? "secondary" : "outline"
                  } className={
                    so.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                    so.status === "Processing" ? "bg-blue-500/10 text-blue-600" :
                    "bg-amber-500/10 text-amber-600"
                  }>
                    {so.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline">Invoice</Button>
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
