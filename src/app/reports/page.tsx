"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Download, Filter, TrendingUp, ShoppingBag, Box, Users, Banknote, FileSpreadsheet } from "lucide-react"

const salesData = [
  { month: "Jan", sales: 45000, target: 40000 },
  { month: "Feb", sales: 52000, target: 45000 },
  { month: "Mar", sales: 48000, target: 50000 },
  { month: "Apr", sales: 61000, target: 55000 },
  { month: "May", sales: 59000, target: 60000 },
  { month: "Jun", sales: 65000, target: 62000 },
  { month: "Jul", sales: 72000, target: 65000 },
]

const topProducts = [
  { name: "Dell XPS 15", units: 124, revenue: "$235,476" },
  { name: "MacBook Pro M3", units: 89, revenue: "$222,411" },
  { name: "Ergonomic Chair", units: 156, revenue: "$155,844" },
]

const purchaseData = [
  { month: "Jan", purchases: 25000 },
  { month: "Feb", purchases: 32000 },
  { month: "Mar", purchases: 28000 },
  { month: "Apr", purchases: 35000 },
  { month: "May", purchases: 31000 },
  { month: "Jun", purchases: 38000 },
  { month: "Jul", purchases: 42000 },
]

const inventoryValuation = [
  { name: "Electronics", value: 185000, color: "#10b981" },
  { name: "Furniture", value: 65000, color: "#3b82f6" },
  { name: "Accessories", value: 45000, color: "#f59e0b" },
  { name: "Stationery", value: 12000, color: "#8b5cf6" },
]

const employeeMetrics = [
  { department: "Engineering", headcount: 24, avgSalary: "$95,000", totalCost: "$2,280,000" },
  { department: "Sales", headcount: 15, avgSalary: "$75,000", totalCost: "$1,125,000" },
  { department: "Marketing", headcount: 8, avgSalary: "$70,000", totalCost: "$560,000" },
  { department: "HR & Admin", headcount: 5, avgSalary: "$65,000", totalCost: "$325,000" },
]

const taxReport = [
  { period: "Q1 2026", type: "Sales Tax (VAT)", collected: "$45,200", paid: "$12,400", netPayable: "$32,800", status: "Filed" },
  { period: "Q1 2026", type: "Corporate Tax", collected: "--", paid: "--", netPayable: "$15,600", status: "Filed" },
  { period: "Q2 2026", type: "Sales Tax (VAT)", collected: "$52,800", paid: "$15,200", netPayable: "$37,600", status: "Filed" },
  { period: "Q3 2026", type: "Sales Tax (VAT)", collected: "$61,400", paid: "$18,500", netPayable: "$42,900", status: "Pending" },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Business Reports</h1>
          <p className="text-muted-foreground">Comprehensive analytics, data visualizations, and exportable reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="ytd">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="q3">Q3 2026</SelectItem>
              <SelectItem value="q2">Q2 2026</SelectItem>
              <SelectItem value="2025">Year 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto mb-6">
          <TabsTrigger value="sales" className="py-2.5 flex items-center gap-2"><TrendingUp className="w-4 h-4 hidden sm:inline" /> Sales</TabsTrigger>
          <TabsTrigger value="purchase" className="py-2.5 flex items-center gap-2"><ShoppingBag className="w-4 h-4 hidden sm:inline" /> Purchase</TabsTrigger>
          <TabsTrigger value="inventory" className="py-2.5 flex items-center gap-2"><Box className="w-4 h-4 hidden sm:inline" /> Inventory</TabsTrigger>
          <TabsTrigger value="employee" className="py-2.5 flex items-center gap-2"><Users className="w-4 h-4 hidden sm:inline" /> Employee</TabsTrigger>
          <TabsTrigger value="financial" className="py-2.5 flex items-center gap-2"><Banknote className="w-4 h-4 hidden sm:inline" /> Financial</TabsTrigger>
          <TabsTrigger value="tax" className="py-2.5 flex items-center gap-2"><FileSpreadsheet className="w-4 h-4 hidden sm:inline" /> Tax</TabsTrigger>
        </TabsList>

        {/* Sales Report */}
        <TabsContent value="sales">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sales Performance</h2>
              <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-border/50 shadow-sm">
                <CardHeader><CardTitle>Revenue vs Target</CardTitle><CardDescription>Monthly sales revenue compared to set targets.</CardDescription></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData} margin={{ left: 0, right: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                      <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
                      <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
                      <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Sales" />
                      <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader><CardTitle>Top Selling Products</CardTitle><CardDescription>By revenue generated.</CardDescription></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Product</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {topProducts.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.units} units sold</div>
                          </TableCell>
                          <TableCell className="text-right font-bold text-emerald-600">{p.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Purchase Report */}
        <TabsContent value="purchase">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Procurement Analysis</h2>
              <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
            </div>
            
            <Card className="border-border/50 shadow-sm">
              <CardHeader><CardTitle>Monthly Purchase Volume</CardTitle><CardDescription>Total expenditure on vendor purchase orders.</CardDescription></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={purchaseData} margin={{ left: 0, right: 20, top: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
                    <Line type="monotone" dataKey="purchases" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} name="Total Purchases" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Report */}
        <TabsContent value="inventory">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Inventory Valuation</h2>
              <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export XLS</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader><CardTitle>Value by Category</CardTitle><CardDescription>Current stock value distribution.</CardDescription></CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={inventoryValuation} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
                          {inventoryValuation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: "8px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader><CardTitle>Category Details</CardTitle><CardDescription>Breakdown of stock valuations.</CardDescription></CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-4">
                    {inventoryValuation.map(cat => (
                      <div key={cat.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="font-medium">{cat.name}</span>
                        </div>
                        <span className="font-bold">${cat.value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4 flex items-center justify-between font-bold text-lg">
                      <span>Total Valuation</span>
                      <span>${inventoryValuation.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Employee Report */}
        <TabsContent value="employee">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Department Headcount & Costs</CardTitle><CardDescription>Summary of personnel distribution and payroll expenses.</CardDescription></div>
                <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Headcount</TableHead>
                    <TableHead className="text-right">Avg. Salary</TableHead>
                    <TableHead className="text-right">Total Annual Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeMetrics.map(em => (
                    <TableRow key={em.department}>
                      <TableCell className="font-medium">{em.department}</TableCell>
                      <TableCell className="text-center">{em.headcount}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{em.avgSalary}</TableCell>
                      <TableCell className="text-right font-bold text-rose-500">{em.totalCost}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-bold border-t-2">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-center">52</TableCell>
                    <TableCell className="text-right text-muted-foreground">--</TableCell>
                    <TableCell className="text-right text-rose-500">$4,290,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Report */}
        <TabsContent value="financial">
          <Card className="border-border/50 shadow-sm border-dashed">
            <CardContent className="pt-6 flex flex-col items-center justify-center h-64 text-center">
              <Banknote className="w-12 h-12 mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold text-lg mb-1">Financial Statements Module</h3>
              <p className="text-muted-foreground text-sm max-w-md mb-4">Detailed P&L, Balance Sheet, and Cash Flow statements are managed natively in the Accounting module.</p>
              <Button onClick={() => window.location.href='/accounting'}>Go to Accounting Hub</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Report */}
        <TabsContent value="tax">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Tax Liability Summary</CardTitle><CardDescription>Overview of collected vs paid taxes and net payable amounts.</CardDescription></div>
                <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
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
                  {taxReport.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{t.period}</TableCell>
                      <TableCell>{t.type}</TableCell>
                      <TableCell className="text-right text-emerald-600">{t.collected}</TableCell>
                      <TableCell className="text-right text-blue-600">{t.paid}</TableCell>
                      <TableCell className="text-right font-bold text-rose-500">{t.netPayable}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
