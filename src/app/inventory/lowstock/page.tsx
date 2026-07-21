"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { useStore } from "@/store/useStore"

export default function LowStockPage() {
  const { products } = useStore()
  const lowStockItems = products.filter(p => p.stock <= p.minStock)

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Low Stock Alerts</CardTitle>
            <CardDescription>{lowStockItems.length} items are at or below their minimum stock threshold.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Warehouse</TableHead>
              <TableHead className="text-right">Current Stock</TableHead><TableHead className="text-right">Min. Required</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map(p => {
              const severity = p.stock === 0 ? "Critical" : p.stock <= p.minStock / 2 ? "High" : "Low"
              return (
                <TableRow key={p.id} className={p.stock === 0 ? "bg-rose-500/5" : "bg-amber-500/5"}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.id}</div>
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.warehouse}</TableCell>
                  <TableCell className={`text-right font-bold ${p.stock === 0 ? "text-rose-500" : "text-amber-500"}`}>{p.stock}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.minStock}</TableCell>
                  <TableCell>
                    <Badge variant={severity === "Critical" ? "destructive" : "default"}
                      className={severity === "High" ? "bg-amber-500/10 text-amber-600" : severity === "Low" ? "bg-yellow-500/10 text-yellow-600" : ""}>
                      {severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
