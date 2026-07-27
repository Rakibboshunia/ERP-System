"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Download, ShoppingBag, TrendingUp, Package, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const allPurchaseData: Record<string, { month: string; purchases: number; orders: number }[]> = {
  "2026": [
    { month: "Jan", purchases: 25000, orders: 18 },
    { month: "Feb", purchases: 32000, orders: 22 },
    { month: "Mar", purchases: 28000, orders: 19 },
    { month: "Apr", purchases: 35000, orders: 27 },
    { month: "May", purchases: 31000, orders: 24 },
    { month: "Jun", purchases: 38000, orders: 30 },
    { month: "Jul", purchases: 42000, orders: 33 },
    { month: "Aug", purchases: 39000, orders: 31 },
    { month: "Sep", purchases: 44000, orders: 35 },
    { month: "Oct", purchases: 51000, orders: 40 },
    { month: "Nov", purchases: 48000, orders: 37 },
    { month: "Dec", purchases: 55000, orders: 42 },
  ],
  "2025": [
    { month: "Jan", purchases: 18000, orders: 12 },
    { month: "Feb", purchases: 24000, orders: 17 },
    { month: "Mar", purchases: 21000, orders: 14 },
    { month: "Apr", purchases: 27000, orders: 19 },
    { month: "May", purchases: 25000, orders: 18 },
    { month: "Jun", purchases: 30000, orders: 22 },
    { month: "Jul", purchases: 33000, orders: 25 },
    { month: "Aug", purchases: 31000, orders: 23 },
    { month: "Sep", purchases: 36000, orders: 28 },
    { month: "Oct", purchases: 42000, orders: 32 },
    { month: "Nov", purchases: 39000, orders: 29 },
    { month: "Dec", purchases: 45000, orders: 35 },
  ],
}

const quarterMap: Record<string, number[]> = {
  all: [0,1,2,3,4,5,6,7,8,9,10,11],
  q1: [0,1,2], q2: [3,4,5], q3: [6,7,8], q4: [9,10,11],
}

export default function PurchaseReportPage() {
  const { supplierPayments, supplierRatings } = useStore()
  const [year, setYear] = React.useState("2026")
  const [quarter, setQuarter] = React.useState("all")

  const rawData = allPurchaseData[year]
  const indices = quarterMap[quarter]
  const data = rawData.filter((_, i) => indices.includes(i))

  const totalPurchases = data.reduce((s, d) => s + d.purchases, 0)
  const totalOrders = data.reduce((s, d) => s + d.orders, 0)
  const avgOrderValue = totalOrders ? Math.round(totalPurchases / totalOrders) : 0
  const overduePayments = supplierPayments.filter(p => p.status === "Overdue").length

  const avgPurchase = data.length ? data.reduce((s, d) => s + d.purchases, 0) / data.length : 0

  const handleExport = () => {
    const rows = [
      ["Month", "Purchases ($)", "Orders"],
      ...data.map(d => [d.month, d.purchases, d.orders]),
      ["", "", ""],
      ["Total", totalPurchases, totalOrders],
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `purchase-report-${year}-${quarter}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Purchase report exported as CSV!")
  }

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Procurement Analysis</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={year} onValueChange={(v) => v && setYear(v)}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">FY 2026</SelectItem>
              <SelectItem value="2025">FY 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={quarter} onValueChange={(v) => v && setQuarter(v)}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Full Year</SelectItem>
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
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
          { label: "Total Purchases", value: `$${totalPurchases.toLocaleString()}`, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Avg. Order Value", value: `$${avgOrderValue.toLocaleString()}`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-500/10" },
          { label: "Overdue Payments", value: overduePayments, icon: Package, color: "text-rose-500", bg: "bg-rose-500/10" },
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

      {/* Line Chart */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Monthly Purchase Volume</CardTitle><CardDescription>Total expenditure on vendor purchase orders — {year} {quarter !== "all" ? quarter.toUpperCase() : ""}</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ left: 0, right: 20, top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} formatter={(v: any) => `$${Number(v || 0).toLocaleString()}`} />
              <ReferenceLine y={avgPurchase} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Avg", position: "right", fontSize: 11 }} />
              <Line type="monotone" dataKey="purchases" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} name="Total Purchases" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Supplier Payments Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Outstanding Supplier Payments</CardTitle><CardDescription>Live payment obligations from Supplier module.</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Supplier</TableHead><TableHead>Invoice No.</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {supplierPayments.length === 0 ? (
                <TableRow key="empty"><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No payments on file.</TableCell></TableRow>
              ) : supplierPayments.map(p => (
                <TableRow key={p.id} className={p.status === "Overdue" ? "bg-rose-500/5" : ""}>
                  <TableCell className="font-semibold">{p.supplier}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.invoiceNo}</TableCell>
                  <TableCell className="text-right font-bold">{p.amount}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "Overdue" ? "destructive" : p.status === "Due Soon" ? "default" : "secondary"}
                      className={p.status === "Due Soon" ? "bg-amber-500/10 text-amber-600" : p.status === "Upcoming" ? "bg-blue-500/10 text-blue-600" : p.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : ""}>
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
