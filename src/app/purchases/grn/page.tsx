"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const grnList = [
  { id: "GRN-5001", poRef: "PO-4101", supplier: "TechParts Inc.", receivedBy: "Inv. Manager", date: "Oct 23, 2026", totalItems: 12, receivedItems: 12, status: "Fully Received" },
  { id: "GRN-5002", poRef: "PO-4102", supplier: "Global Steel Co.", receivedBy: "Inv. Manager", date: "Oct 25, 2026", totalItems: 5, receivedItems: 3, status: "Partial" },
  { id: "GRN-5003", poRef: "PO-4103", supplier: "OfficeWorld", receivedBy: "--", date: "--", totalItems: 8, receivedItems: 0, status: "Awaiting" },
]

export default function GrnPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Goods Receive Note (GRN)</CardTitle>
            <CardDescription>Document goods received from suppliers against purchase orders.</CardDescription>
          </div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create GRN</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>GRN No.</TableHead>
              <TableHead>PO Ref.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Received By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total / Received</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grnList.map(grn => (
              <TableRow key={grn.id}>
                <TableCell className="font-medium">{grn.id}</TableCell>
                <TableCell className="text-primary text-xs">{grn.poRef}</TableCell>
                <TableCell className="font-semibold">{grn.supplier}</TableCell>
                <TableCell className="text-muted-foreground">{grn.receivedBy}</TableCell>
                <TableCell className="text-muted-foreground">{grn.date}</TableCell>
                <TableCell className="text-right">
                  <span className={`font-bold ${grn.receivedItems < grn.totalItems ? "text-amber-500" : "text-emerald-500"}`}>
                    {grn.receivedItems}
                  </span>
                  <span className="text-muted-foreground"> / {grn.totalItems} items</span>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    grn.status === "Fully Received" ? "default" :
                    grn.status === "Partial" ? "secondary" : "outline"
                  } className={
                    grn.status === "Fully Received" ? "bg-emerald-500/10 text-emerald-600" :
                    grn.status === "Partial" ? "bg-amber-500/10 text-amber-600" :
                    "text-muted-foreground"
                  }>
                    {grn.status}
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
