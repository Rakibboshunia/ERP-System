"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Receipt, TrendingDown, CheckCircle, Clock } from "lucide-react"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const taxReportData: Record<string, { period: string; type: string; collected: number; paid: number; status: "Filed" | "Pending" }[]> = {
  "2026": [
    { period: "Q1 2026", type: "Sales Tax (VAT)", collected: 45200, paid: 12400, status: "Filed" },
    { period: "Q1 2026", type: "Corporate Tax", collected: 0, paid: 15600, status: "Filed" },
    { period: "Q2 2026", type: "Sales Tax (VAT)", collected: 52800, paid: 15200, status: "Filed" },
    { period: "Q2 2026", type: "Corporate Tax", collected: 0, paid: 18200, status: "Filed" },
    { period: "Q3 2026", type: "Sales Tax (VAT)", collected: 61400, paid: 18500, status: "Pending" },
    { period: "Q3 2026", type: "Corporate Tax", collected: 0, paid: 21000, status: "Pending" },
  ],
  "2025": [
    { period: "Q1 2025", type: "Sales Tax (VAT)", collected: 35400, paid: 10200, status: "Filed" },
    { period: "Q2 2025", type: "Sales Tax (VAT)", collected: 42100, paid: 12800, status: "Filed" },
    { period: "Q3 2025", type: "Sales Tax (VAT)", collected: 48600, paid: 14900, status: "Filed" },
    { period: "Q4 2025", type: "Sales Tax (VAT)", collected: 55200, paid: 16800, status: "Filed" },
  ],
}

const quarterOptions = ["all", "Q1", "Q2", "Q3", "Q4"]

export default function TaxReportPage() {
  const { taxSettings, returns } = useStore()
  const [year, setYear] = React.useState("2026")
  const [quarterFilter, setQuarterFilter] = React.useState("all")

  const rawData = taxReportData[year] ?? []
  const filtered = quarterFilter === "all" ? rawData : rawData.filter(t => t.period.includes(quarterFilter))

  const totalCollected = filtered.filter(t => t.collected > 0).reduce((s, t) => s + t.collected, 0)
  const totalPaid = filtered.reduce((s, t) => s + t.paid, 0)
  const totalNetPayable = filtered.filter(t => t.collected > 0).reduce((s, t) => s + (t.collected - t.paid), 0)
  const pendingCount = filtered.filter(t => t.status === "Pending").length

  // Chart data — quarterly net payable
  const chartData = [...new Set(filtered.map(t => t.period))].map(period => {
    const rows = filtered.filter(t => t.period === period && t.collected > 0)
    const net = rows.reduce((s, r) => s + (r.collected - r.paid), 0)
    return { period: period.replace(" 2026", "").replace(" 2025", ""), netPayable: net }
  })

  const handleExport = () => {
    const rows = [
      ["Period", "Tax Type", "Tax Collected ($)", "Tax Paid ($)", "Net Payable ($)", "Status"],
      ...filtered.map(t => [
        t.period, t.type,
        t.collected > 0 ? t.collected : "N/A",
        t.paid,
        t.collected > 0 ? t.collected - t.paid : t.paid,
        t.status,
      ]),
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tax-report-${year}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Tax report exported as CSV!")
  }

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Tax Liability Report</h2>
          <p className="text-sm text-muted-foreground">Tax Name: <strong>{taxSettings.taxName}</strong> · Rate: <strong>{taxSettings.taxRate}%</strong> · Reg: {taxSettings.taxNumber}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={year} onValueChange={(v) => v && setYear(v)}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">FY 2026</SelectItem>
              <SelectItem value="2025">FY 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={quarterFilter} onValueChange={(v) => v && setQuarterFilter(v)}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quarters</SelectItem>
              <SelectItem value="Q1">Q1</SelectItem>
              <SelectItem value="Q2">Q2</SelectItem>
              <SelectItem value="Q3">Q3</SelectItem>
              <SelectItem value="Q4">Q4</SelectItem>
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
          { label: "Tax Collected", value: `$${totalCollected.toLocaleString()}`, icon: Receipt, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Tax Paid (Input)", value: `$${totalPaid.toLocaleString()}`, icon: TrendingDown, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Net Payable", value: `$${totalNetPayable.toLocaleString()}`, icon: CheckCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Pending Filings", value: pendingCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10" },
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

      {/* Net Payable Chart */}
      {chartData.length > 0 && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Net Tax Payable by Quarter</CardTitle><CardDescription>Amount owed to tax authority after deducting input tax.</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="period" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} formatter={(v: any) => `$${Number(v || 0).toLocaleString()}`} />
                <Bar dataKey="netPayable" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Net Tax Payable" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Tax Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div><CardTitle>Tax Liability Summary</CardTitle><CardDescription>Overview of collected vs paid taxes and net payable amounts.</CardDescription></div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead className="text-right">Tax Collected</TableHead>
                <TableHead className="text-right">Tax Paid (Input)</TableHead>
                <TableHead className="text-right">Net Payable</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow key="empty"><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No tax records found.</TableCell></TableRow>
              ) : filtered.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{t.period}</TableCell>
                  <TableCell className="text-muted-foreground">{t.type}</TableCell>
                  <TableCell className="text-right text-emerald-600 font-medium">{t.collected > 0 ? `$${t.collected.toLocaleString()}` : "—"}</TableCell>
                  <TableCell className="text-right text-blue-600 font-medium">${t.paid.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold text-rose-500">
                    {t.collected > 0 ? `$${(t.collected - t.paid).toLocaleString()}` : `($${t.paid.toLocaleString()})`}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Filed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                      {t.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Returns affecting Tax */}
      {returns.length > 0 && (
        <Card className="border-border/50 shadow-sm border-amber-500/20">
          <CardHeader><CardTitle>Sales Returns (Tax Impact)</CardTitle><CardDescription>Approved returns may reduce net tax liability.</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {returns.filter(r => r.status === "Approved").map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{r.customer}</p>
                    <p className="text-xs text-muted-foreground">RMA {r.id} · {r.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-rose-500">{r.amount}</p>
                    <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-500/30">Approved</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
