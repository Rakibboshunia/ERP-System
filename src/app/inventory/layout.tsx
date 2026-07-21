"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Warehouse, AlertTriangle } from "lucide-react"
import { useStore } from "@/store/useStore"

const warehouses = [
  { id: "WH-01", name: "Main Warehouse", location: "Tech City", capacity: 5000, used: 3800, manager: "Tom Riley" },
  { id: "WH-02", name: "East Hub", location: "New York", capacity: 2000, used: 1100, manager: "Sara Kim" },
]

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const { products } = useStore()
  
  const lowStockItems = products.filter(p => p.stock <= p.minStock)
  const outOfStockCount = products.filter(p => p.stock === 0).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Inventory Management</h1>
        <p className="text-muted-foreground">Manage products, warehouses, stock levels, and movements.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><Package className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Total Products</p><p className="text-2xl font-bold">{products.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><Warehouse className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Warehouses</p><p className="text-2xl font-bold">{warehouses.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Low Stock Alerts</p><p className="text-2xl font-bold text-amber-500">{lowStockItems.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><Package className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Out of Stock</p><p className="text-2xl font-bold text-rose-500">{outOfStockCount}</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
