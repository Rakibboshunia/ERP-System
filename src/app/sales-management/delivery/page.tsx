"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const deliveryNotes = [
  { id: "DN-5001", soRef: "SO-3101", customer: "Acme Corp", address: "123 Main St, Tech City", items: 5, dispatchDate: "Oct 20, 2026", deliveredDate: "Oct 22, 2026", status: "Delivered" },
  { id: "DN-5002", soRef: "SO-3102", customer: "Stark Industries", address: "Stark Tower, New York", items: 12, dispatchDate: "Oct 23, 2026", deliveredDate: "--", status: "In Transit" },
  { id: "DN-5003", soRef: "SO-3103", customer: "Queen Consolidated", address: "42 Arrow Ave, Star City", items: 8, dispatchDate: "--", deliveredDate: "--", status: "Pending" },
]

export default function DeliveryPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Delivery Notes</CardTitle>
            <CardDescription>Shipment records tracking goods dispatched to customers.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Delivery Note</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DN No.</TableHead>
              <TableHead>SO Ref.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead>Dispatch Date</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryNotes.map(dn => (
              <TableRow key={dn.id}>
                <TableCell className="font-medium">{dn.id}</TableCell>
                <TableCell className="text-primary text-xs">{dn.soRef}</TableCell>
                <TableCell className="font-semibold">{dn.customer}</TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[180px] truncate">{dn.address}</TableCell>
                <TableCell className="text-right">{dn.items}</TableCell>
                <TableCell className="text-muted-foreground">{dn.dispatchDate}</TableCell>
                <TableCell className="text-muted-foreground">{dn.deliveredDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    dn.status === "Delivered" ? "default" :
                    dn.status === "In Transit" ? "secondary" : "outline"
                  } className={
                    dn.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" :
                    dn.status === "In Transit" ? "bg-blue-500/10 text-blue-600" :
                    "text-muted-foreground"
                  }>
                    {dn.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
