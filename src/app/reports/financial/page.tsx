"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Download, TrendingUp, TrendingDown, Banknote, ArrowUpRight, ArrowDownRight } from "lucide-react"
import toast from "react-hot-toast"

const financialData: Record<string, { month: string; revenue: number; expenses: number; profit: number }[]> = {
  "2026": [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "Mar", revenue: 48000, expenses: 31000, profit: 17000 },
    { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
    { month: "May", revenue: 59000, expenses: 42000, profit: 17000 },
    { month: "Jun", revenue: 65000, expenses: 39000, profit: 26000 },
    { month: "Jul", revenue: 72000, expenses: 45000, profit: 27000 },
    { month: "Aug", revenue: 68000, expenses: 43000, profit: 25000 },
    { month: "Sep", revenue: 74000, expenses: 48000, profit: 26000 },
    { month: "Oct", revenue: 81000, expenses: 51000, profit: 30000 },
    { month: "Nov", revenue: 78000, expenses: 50000, profit: 28000 },
    { month: "Dec", revenue: 92000, expenses: 58000, profit: 34000 },
  ],
  "2025": [
    { month: "Jan", revenue: 35000, expenses: 25000, profit: 10000 },
    { month: "Feb", revenue: 42000, expenses: 29000, profit: 13000 },
    { month: "Mar", revenue: 38000, expenses: 26000, profit: 12000 },
    { month: "Apr", revenue: 51000, expenses: 34000, profit: 17000 },
    { month: "May", revenue: 49000, expenses: 36000, profit: 13000 },
    { month: "Jun", revenue: 55000, expenses: 35000, profit: 20000 },
    { month: "Jul", revenue: 60000, expenses: 40000, profit: 20000 },
    { month: "Aug", revenue: 58000, expenses: 39000, profit: 19000 },
    { month: "Sep", revenue: 64000, expenses: 43000, profit: 21000 },
    { month: "Oct", revenue: 71000, expenses: 47000, profit: 24000 },
    { month: "Nov", revenue: 68000, expenses: 45000, profit: 23000 },
    { month: "Dec", revenue: 82000, expenses: 53000, profit: 29000 },
  ],
}

const quarterMap: Record<string, number[]> = {
  all: [0,1,2,3,4,5,6,7,8,9,10,11],
  q1: [0,1,2], q2: [3,4,5], q3: [6,7,8], q4: [9,10,11],
}

const plItems = [
  { category: "Revenue", items: [
    { label: "Product Sales", amount: 695000 },
    { label: "Service Revenue", amount: 84000 },
    { label: "Other Income", amount: 12000 },
  ]},
  { category: "Expenses", items: [
    { label: "Cost of Goods Sold", amount: -312000 },
    { label: "Salaries & Wages", amount: -180000 },
    { label: "Rent & Utilities", amount: -48000 },
    { label: "Marketing", amount: -28000 },
    { label: "Depreciation", amount: -15000 },
  ]},
]

export default function FinancialReportPage() {
  const [year, setYear] = React.useState("2026")
  const [quarter, setQuarter] = React.useState("all")
  const [view, setView] = React.useState<"overview" | "pl">("overview")

  const rawData = financialData[year]
  const indices = quarterMap[quarter]
  const data = rawData.filter((_, i) => indices.includes(i))

  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0)
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
  const totalProfit = data.reduce((s, d) => s + d.profit, 0)
  const margin = totalRevenue ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0"

  const handleExport = () => {
    const rows = [
      ["Month", "Revenue ($)", "Expenses ($)", "Profit ($)"],
      ...data.map(d => [d.month, d.revenue, d.expenses, d.profit]),
      ["", "", "", ""],
      ["Total", totalRevenue, totalExpenses, totalProfit],
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `financial-report-${year}-${quarter}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Financial report exported as CSV!")
  }

  const plRevenue = plItems[0].items.reduce((s, i) => s + i.amount, 0)
  const plExpenses = plItems[1].items.reduce((s, i) => s + Math.abs(i.amount), 0)
  const plProfit = plRevenue - plExpenses

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Financial Statements</h2>
          <div className="flex rounded-lg border overflow-hidden text-sm">
            <button onClick={() => setView("overview")} className={`px-3 py-1.5 transition-colors ${view === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>Overview</button>
            <button onClick={() => setView("pl")} className={`px-3 py-1.5 transition-colors ${view === "pl" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>P&L Statement</button>
          </div>
        </div>
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
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleExport}><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
        </div>
      </div>

      {view === "overview" ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-500/10" },
              { label: "Total Expenses", value: `$${totalExpenses.toLocaleString()}`, icon: ArrowDownRight, color: "text-rose-500", bg: "bg-rose-500/10" },
              { label: "Net Profit", value: `$${totalProfit.toLocaleString()}`, icon: Banknote, color: "text-blue-600", bg: "bg-blue-500/10" },
              { label: "Profit Margin", value: `${margin}%`, icon: totalProfit >= 0 ? TrendingUp : TrendingDown, color: totalProfit >= 0 ? "text-emerald-600" : "text-rose-500", bg: totalProfit >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10" },
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

          <Card className="border-border/50 shadow-sm">
            <CardHeader><CardTitle>Revenue, Expenses & Profit</CardTitle><CardDescription>Monthly financial breakdown — {year} {quarter !== "all" ? quarter.toUpperCase() : ""}</CardDescription></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={data} margin={{ left: 0, right: 0, top: 10 }}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenue)" name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expenses)" name="Expenses" />
                  <Area type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} fill="url(#profit)" name="Net Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        /* P&L Statement */
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Profit & Loss Statement</CardTitle>
            <CardDescription>Comprehensive income statement for {year} {quarter !== "all" ? quarter.toUpperCase() : "(Full Year)"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {plItems.map(section => (
                <div key={section.category}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map(item => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-sm">{item.label}</span>
                        <span className={`font-medium text-sm ${item.amount < 0 ? "text-rose-500" : "text-emerald-600"}`}>
                          {item.amount < 0 ? `-$${Math.abs(item.amount).toLocaleString()}` : `$${item.amount.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border font-bold text-lg mt-4">
                <span>Net Profit / (Loss)</span>
                <span className={plProfit >= 0 ? "text-emerald-600" : "text-rose-500"}>
                  {plProfit >= 0 ? `+$${plProfit.toLocaleString()}` : `-$${Math.abs(plProfit).toLocaleString()}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Profit Margin</span>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30">
                  {((plProfit / plRevenue) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
