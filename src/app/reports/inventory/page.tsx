"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Download, Search, Package, AlertTriangle, TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#f43f5e"]

export default function InventoryReportPage() {
  const { products } = useStore()
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  // Compute valuation by category from real store data
  const categoryMap: Record<string, number> = {}
  products.forEach(p => {
    const val = parseFloat(p.price.replace(/[^0-9.]/g, "")) * p.stock || 0
    categoryMap[p.category] = (categoryMap[p.category] || 0) + val
  })
  const inventoryValuation = Object.entries(categoryMap).map(([name, value], i) => ({
    name, value: Math.round(value), color: COLORS[i % COLORS.length]
  }))

  const totalValue = inventoryValuation.reduce((s, c) => s + c.value, 0)
  const lowStockCount = products.filter(p => p.status === "Low Stock").length
  const outOfStockCount = products.filter(p => p.status === "Out of Stock").length
  const inStockCount = products.filter(p => p.status === "In Stock").length

  const stockBarData = products.map(p => ({
    name: p.name.length > 15 ? p.name.slice(0, 14) + "…" : p.name,
    stock: p.stock,
    min: p.minStock,
  }))

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleExport = () => {
    const rows = [
      ["ID", "Product", "Category", "Brand", "Stock", "Min Stock", "Status", "Price"],
      ...filtered.map(p => [p.id, p.name, p.category, p.brand, p.stock, p.minStock, p.status, p.price]),
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inventory-report.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Inventory report exported as CSV!")
  }

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Inventory Valuation Report</h2>
        <Button size="sm" variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Value", value: `$${totalValue.toLocaleString()}`, icon: Package, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "In Stock SKUs", value: inStockCount, icon: Package, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Low Stock", value: lowStockCount, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-500/10" },
          { label: "Out of Stock", value: outOfStockCount, icon: TrendingDown, color: "text-rose-500", bg: "bg-rose-500/10" },
        ].map(kpi => (
          <Card key={kpi.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-5 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Value by Category</CardTitle><CardDescription>Current stock value distribution from live inventory.</CardDescription></CardHeader>
          <CardContent className="flex justify-center">
            {inventoryValuation.length === 0 ? (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No product data yet.</div>
            ) : (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={inventoryValuation} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value">
                      {inventoryValuation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Category Details</CardTitle><CardDescription>Breakdown of stock valuations.</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-4 pt-2">
              {inventoryValuation.map(cat => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <span className="font-bold">${cat.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${totalValue ? (cat.value / totalValue) * 100 : 0}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 flex items-center justify-between font-bold text-lg">
                <span>Total Valuation</span>
                <span>${totalValue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Level Bar Chart */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Stock Levels</CardTitle><CardDescription>Current stock vs minimum required per product.</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stockBarData} margin={{ left: 0, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
              <Legend />
              <Bar dataKey="stock" fill="#10b981" radius={[4,4,0,0]} name="Current Stock" />
              <Bar dataKey="min" fill="#f43f5e" radius={[4,4,0,0]} name="Min Required" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Table with Filter */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div><CardTitle>All Products</CardTitle><CardDescription>Live inventory from the store.</CardDescription></div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-8 w-48" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Stock</TableHead><TableHead className="text-right">Min</TableHead><TableHead className="text-right">Price</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow key="empty"><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No products found.</TableCell></TableRow>
              ) : filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.brand}</div></TableCell>
                  <TableCell className="text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-right font-medium">{p.stock}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.minStock}</TableCell>
                  <TableCell className="text-right font-bold">{p.price}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "In Stock" ? "default" : p.status === "Low Stock" ? "secondary" : "destructive"}
                      className={p.status === "In Stock" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : p.status === "Low Stock" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : ""}>
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
