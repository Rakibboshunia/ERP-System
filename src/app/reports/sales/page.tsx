"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart } from "lucide-react"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const allSalesData: Record<string, { month: string; sales: number; target: number }[]> = {
  "2026": [
    { month: "Jan", sales: 45000, target: 40000 },
    { month: "Feb", sales: 52000, target: 45000 },
    { month: "Mar", sales: 48000, target: 50000 },
    { month: "Apr", sales: 61000, target: 55000 },
    { month: "May", sales: 59000, target: 60000 },
    { month: "Jun", sales: 65000, target: 62000 },
    { month: "Jul", sales: 72000, target: 65000 },
    { month: "Aug", sales: 68000, target: 68000 },
    { month: "Sep", sales: 74000, target: 70000 },
    { month: "Oct", sales: 81000, target: 75000 },
    { month: "Nov", sales: 78000, target: 78000 },
    { month: "Dec", sales: 92000, target: 85000 },
  ],
  "2025": [
    { month: "Jan", sales: 35000, target: 32000 },
    { month: "Feb", sales: 42000, target: 38000 },
    { month: "Mar", sales: 38000, target: 40000 },
    { month: "Apr", sales: 51000, target: 45000 },
    { month: "May", sales: 49000, target: 50000 },
    { month: "Jun", sales: 55000, target: 52000 },
    { month: "Jul", sales: 60000, target: 55000 },
    { month: "Aug", sales: 58000, target: 58000 },
    { month: "Sep", sales: 64000, target: 60000 },
    { month: "Oct", sales: 71000, target: 65000 },
    { month: "Nov", sales: 68000, target: 68000 },
    { month: "Dec", sales: 82000, target: 75000 },
  ],
}

const quarterMap: Record<string, number[]> = {
  all: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  q1: [0, 1, 2],
  q2: [3, 4, 5],
  q3: [6, 7, 8],
  q4: [9, 10, 11],
}

export default function SalesReportPage() {
  const { customers, returns } = useStore()
  const [year, setYear] = React.useState("2026")
  const [quarter, setQuarter] = React.useState("all")

  const rawData = allSalesData[year] ?? allSalesData["2026"]
  const indices = quarterMap[quarter] ?? quarterMap["all"]
  const salesData = rawData.filter((_, i) => indices.includes(i))

  const totalSales = salesData.reduce((s, d) => s + d.sales, 0)
  const totalTarget = salesData.reduce((s, d) => s + d.target, 0)
  const totalReturns = returns.reduce((s, r) => {
    const amt = parseFloat(r.amount.replace(/[^0-9.]/g, "")) || 0
    return s + amt
  }, 0)
  const avgMonthly = salesData.length ? Math.round(totalSales / salesData.length) : 0
  const hitTarget = totalSales >= totalTarget

  const topProducts = [
    { name: "Dell XPS 15", units: 124, revenue: 235476 },
    { name: "MacBook Pro M3", units: 89, revenue: 222411 },
    { name: "Ergonomic Chair", units: 156, revenue: 155844 },
    { name: "Wireless Keyboard", units: 310, revenue: 40090 },
    { name: "4K Monitor", units: 67, revenue: 30150 },
  ]

  const handleExport = () => {
    const rows = [
      ["Month", "Sales ($)", "Target ($)"],
      ...salesData.map(d => [d.month, d.sales, d.target]),
      ["", "", ""],
      ["Total Sales", totalSales, ""],
      ["Total Target", totalTarget, ""],
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sales-report-${year}-${quarter}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Sales report exported as CSV!")
  }

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Sales Performance Report</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">FY 2026</SelectItem>
              <SelectItem value="2025">FY 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={quarter} onValueChange={setQuarter}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Full Year</SelectItem>
              <SelectItem value="q1">Q1 (Jan–Mar)</SelectItem>
              <SelectItem value="q2">Q2 (Apr–Jun)</SelectItem>
              <SelectItem value="q3">Q3 (Jul–Sep)</SelectItem>
              <SelectItem value="q4">Q4 (Oct–Dec)</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${totalSales.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "vs Target", value: `${hitTarget ? "+" : ""}${((totalSales - totalTarget) / totalTarget * 100).toFixed(1)}%`, icon: hitTarget ? TrendingUp : TrendingDown, color: hitTarget ? "text-emerald-600" : "text-rose-500", bg: hitTarget ? "bg-emerald-500/10" : "bg-rose-500/10" },
          { label: "Avg. Monthly", value: `$${avgMonthly.toLocaleString()}`, icon: BarChart, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Total Returns", value: `$${totalReturns.toLocaleString()}`, icon: ShoppingCart, color: "text-amber-600", bg: "bg-amber-500/10" },
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

      {/* Chart + Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader><CardTitle>Revenue vs Target</CardTitle><CardDescription>Monthly sales revenue compared to targets — {year} {quarter !== "all" ? quarter.toUpperCase() : ""}</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Sales" />
                <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Top Selling Products</CardTitle><CardDescription>By revenue generated.</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.units} units sold</p>
                  </div>
                  <p className="font-bold text-sm text-emerald-600">${p.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Customers */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Active Customers</CardTitle><CardDescription>Currently tracked customer accounts from CRM.</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Customer</TableHead><TableHead>Company</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.company}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{c.email}</TableCell>
                  <TableCell><Badge variant={c.status === "Active" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
