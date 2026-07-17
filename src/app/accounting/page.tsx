"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { BookOpen, FileText, TrendingUp, TrendingDown, Scale, DollarSign, Plus, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const accounts = [
  { code: "1000", name: "Cash & Cash Equivalents", type: "Asset", balance: "$124,500.00", status: "Active" },
  { code: "1100", name: "Accounts Receivable", type: "Asset", balance: "$45,231.00", status: "Active" },
  { code: "1500", name: "Inventory", type: "Asset", balance: "$320,000.00", status: "Active" },
  { code: "2000", name: "Accounts Payable", type: "Liability", balance: "$33,700.00", status: "Active" },
  { code: "3000", name: "Owner's Equity", type: "Equity", balance: "$400,000.00", status: "Active" },
  { code: "4000", name: "Sales Revenue", type: "Income", balance: "$512,000.00", status: "Active" },
  { code: "5000", name: "Cost of Goods Sold", type: "Expense", balance: "$210,000.00", status: "Active" },
  { code: "5100", name: "Salaries Expense", type: "Expense", balance: "$124,500.00", status: "Active" },
]

const journalEntries = [
  { id: "JE-1001", date: "Oct 17, 2026", description: "Sales Revenue Recognition", debit: "$12,400.00", credit: "$12,400.00", by: "Accountant", status: "Posted" },
  { id: "JE-1002", date: "Oct 16, 2026", description: "Payroll Processing – Oct", debit: "$54,000.00", credit: "$54,000.00", by: "Admin", status: "Posted" },
  { id: "JE-1003", date: "Oct 18, 2026", description: "Office Supplies Purchase", debit: "$1,200.00", credit: "$1,200.00", by: "Accountant", status: "Draft" },
]

const ledgerEntries = [
  { date: "Oct 01", description: "Opening Balance", debit: "--", credit: "--", balance: "$98,000.00" },
  { date: "Oct 05", description: "Sales – Acme Corp", debit: "$12,400.00", credit: "--", balance: "$110,400.00" },
  { date: "Oct 10", description: "Supplier Payment – TechParts", debit: "--", credit: "$14,200.00", balance: "$96,200.00" },
  { date: "Oct 17", description: "Sales – Stark Ind.", debit: "$54,000.00", credit: "--", balance: "$150,200.00" },
]

const trialBalance = [
  { account: "Cash & Cash Equivalents", debit: "$124,500.00", credit: "--" },
  { account: "Accounts Receivable", debit: "$45,231.00", credit: "--" },
  { account: "Inventory", debit: "$320,000.00", credit: "--" },
  { account: "Accounts Payable", debit: "--", credit: "$33,700.00" },
  { account: "Owner's Equity", debit: "--", credit: "$400,000.00" },
  { account: "Sales Revenue", debit: "--", credit: "$512,000.00" },
  { account: "COGS", debit: "$210,000.00", credit: "--" },
  { account: "Salaries Expense", debit: "$124,500.00", credit: "--" },
]

const plData = [
  { month: "Jan", income: 45000, expense: 32000 },
  { month: "Feb", income: 52000, expense: 34000 },
  { month: "Mar", income: 48000, expense: 31000 },
  { month: "Apr", income: 61000, expense: 38000 },
  { month: "May", income: 59000, expense: 42000 },
  { month: "Jun", income: 65000, expense: 39000 },
  { month: "Jul", income: 72000, expense: 44000 },
]

const expenses = [
  { id: "EXP-101", category: "Salaries", description: "October Payroll", amount: "$54,000.00", date: "Oct 01, 2026", status: "Paid" },
  { id: "EXP-102", category: "Software", description: "AWS Hosting – Oct", amount: "$890.00", date: "Oct 05, 2026", status: "Paid" },
  { id: "EXP-103", category: "Office Supplies", description: "Amazon Purchase", amount: "$450.00", date: "Oct 10, 2026", status: "Pending" },
  { id: "EXP-104", category: "Travel", description: "NY Sales Trip", amount: "$2,100.00", date: "Oct 14, 2026", status: "Paid" },
]

const incomes = [
  { id: "INC-201", source: "Product Sales", customer: "Acme Corp", amount: "$12,400.00", date: "Oct 05, 2026", status: "Received" },
  { id: "INC-202", source: "Consulting Fee", customer: "Wayne Ent.", amount: "$4,200.00", date: "Oct 08, 2026", status: "Received" },
  { id: "INC-203", source: "Product Sales", customer: "Stark Ind.", amount: "$54,000.00", date: "Oct 17, 2026", status: "Pending" },
]

export default function AccountingPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Accounting & Finance</h1>
          <p className="text-muted-foreground">Manage the general ledger, financial statements, and reporting.</p>
        </div>
        {canManage && <Button className="flex items-center gap-2"><Plus className="w-4 h-4" />Journal Entry</Button>}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Net Profit (YTD)", value: "$114,000", color: "text-emerald-600", icon: TrendingUp, border: "border-l-emerald-500" },
          { label: "Total Revenue", value: "$512,000", color: "text-blue-600", icon: DollarSign, border: "border-l-blue-500" },
          { label: "Total Expenses", value: "$398,000", color: "text-amber-600", icon: TrendingDown, border: "border-l-amber-500" },
          { label: "Accounts Receivable", value: "$45,231", color: "text-rose-600", icon: Scale, border: "border-l-rose-500" },
        ].map((kpi) => (
          <Card key={kpi.label} className={`border-border/50 shadow-sm border-l-4 ${kpi.border}`}>
            <CardContent className="pt-6 flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full"><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{kpi.label}</p><p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="coa" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto mb-6">
          {[
            { val: "coa", label: "Chart of Accounts" },
            { val: "journal", label: "Journal Entry" },
            { val: "ledger", label: "General Ledger" },
            { val: "trial", label: "Trial Balance" },
            { val: "pl", label: "P & L" },
            { val: "balance", label: "Balance Sheet" },
            { val: "expense", label: "Expenses" },
            { val: "income", label: "Income" },
          ].map(t => <TabsTrigger key={t.val} value={t.val} className="py-2 text-xs">{t.label}</TabsTrigger>)}
        </TabsList>

        {/* Chart of Accounts */}
        <TabsContent value="coa">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Chart of Accounts</CardTitle><CardDescription>Master list of all financial accounts.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Account</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Account Name</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {accounts.map(a => (
                    <TableRow key={a.code}>
                      <TableCell className="font-mono text-muted-foreground">{a.code}</TableCell>
                      <TableCell className="font-medium">{a.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          a.type === "Asset" ? "text-blue-500 border-blue-500/30" :
                          a.type === "Liability" ? "text-rose-500 border-rose-500/30" :
                          a.type === "Income" ? "text-emerald-500 border-emerald-500/30" :
                          a.type === "Expense" ? "text-amber-500 border-amber-500/30" : ""
                        }>{a.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{a.balance}</TableCell>
                      <TableCell><Badge className="bg-emerald-500/10 text-emerald-600">{a.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journal Entry */}
        <TabsContent value="journal">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Journal Entries</CardTitle><CardDescription>Double-entry bookkeeping records.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Entry</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Entry No.</TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead><TableHead>Posted By</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {journalEntries.map(je => (
                    <TableRow key={je.id}>
                      <TableCell className="font-medium">{je.id}</TableCell>
                      <TableCell className="text-muted-foreground">{je.date}</TableCell>
                      <TableCell>{je.description}</TableCell>
                      <TableCell className="text-right font-medium text-emerald-600">{je.debit}</TableCell>
                      <TableCell className="text-right font-medium text-rose-500">{je.credit}</TableCell>
                      <TableCell className="text-muted-foreground">{je.by}</TableCell>
                      <TableCell>
                        <Badge variant={je.status === "Posted" ? "default" : "outline"}
                          className={je.status === "Posted" ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
                          {je.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Ledger */}
        <TabsContent value="ledger">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>General Ledger</CardTitle><CardDescription>Cash account transaction history and running balance.</CardDescription></div>
                <div className="relative w-48"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Filter account..." className="pl-8" /></div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
                <TableBody>
                  {ledgerEntries.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-muted-foreground">{e.date}</TableCell>
                      <TableCell className="font-medium">{e.description}</TableCell>
                      <TableCell className="text-right text-emerald-600 font-medium">{e.debit}</TableCell>
                      <TableCell className="text-right text-rose-500 font-medium">{e.credit}</TableCell>
                      <TableCell className="text-right font-bold">{e.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trial Balance */}
        <TabsContent value="trial">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Trial Balance</CardTitle><CardDescription>Summary of all account debits and credits to verify balancing.</CardDescription></div>
                {canManage && <Button size="sm" variant="outline">Export PDF</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Account Name</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead></TableRow></TableHeader>
                <TableBody>
                  {trialBalance.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{t.account}</TableCell>
                      <TableCell className="text-right font-medium text-emerald-600">{t.debit}</TableCell>
                      <TableCell className="text-right font-medium text-rose-500">{t.credit}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 font-bold bg-muted/30">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right text-emerald-600">$824,231.00</TableCell>
                    <TableCell className="text-right text-rose-500">$945,700.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* P&L */}
        <TabsContent value="pl">
          <div className="grid gap-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader><CardTitle>Profit & Loss Statement</CardTitle><CardDescription>Income vs expenses over the last 7 months.</CardDescription></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={plData} margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
                    <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-3 gap-4">
              {[{ label: "Total Revenue", val: "$512,000", cls: "text-emerald-600" }, { label: "Total Expenses", val: "$398,000", cls: "text-rose-500" }, { label: "Net Profit", val: "$114,000", cls: "text-primary" }].map(s => (
                <Card key={s.label} className="border-border/50"><CardContent className="pt-6 text-center"><p className="text-muted-foreground text-sm">{s.label}</p><p className={`text-3xl font-bold mt-1 ${s.cls}`}>{s.val}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Balance Sheet */}
        <TabsContent value="balance">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader><CardTitle>Assets</CardTitle></CardHeader>
              <CardContent>
                {[{ name: "Cash & Equivalents", val: "$124,500" }, { name: "Accounts Receivable", val: "$45,231" }, { name: "Inventory", val: "$320,000" }, { name: "Fixed Assets", val: "$250,000" }].map(a => (
                  <div key={a.name} className="flex justify-between py-2 border-b last:border-0"><span className="text-sm">{a.name}</span><span className="font-semibold">{a.val}</span></div>
                ))}
                <div className="flex justify-between pt-3 font-bold text-emerald-600"><span>Total Assets</span><span>$739,731</span></div>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm">
              <CardHeader><CardTitle>Liabilities & Equity</CardTitle></CardHeader>
              <CardContent>
                {[{ name: "Accounts Payable", val: "$33,700" }, { name: "Short-term Loans", val: "$50,000" }, { name: "Long-term Debt", val: "$150,000" }, { name: "Owner's Equity", val: "$400,000" }, { name: "Retained Earnings", val: "$106,031" }].map(l => (
                  <div key={l.name} className="flex justify-between py-2 border-b last:border-0"><span className="text-sm">{l.name}</span><span className="font-semibold">{l.val}</span></div>
                ))}
                <div className="flex justify-between pt-3 font-bold text-rose-500"><span>Total L & E</span><span>$739,731</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses */}
        <TabsContent value="expense">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Expenses</CardTitle><CardDescription>All recorded business expenditures.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Expense</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Exp. ID</TableHead><TableHead>Category</TableHead><TableHead>Description</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {expenses.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.id}</TableCell>
                      <TableCell><Badge variant="outline">{e.category}</Badge></TableCell>
                      <TableCell>{e.description}</TableCell>
                      <TableCell className="text-muted-foreground">{e.date}</TableCell>
                      <TableCell className="text-right font-bold text-rose-500">{e.amount}</TableCell>
                      <TableCell>
                        <Badge variant={e.status === "Paid" ? "default" : "secondary"}
                          className={e.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                          {e.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income */}
        <TabsContent value="income">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Income</CardTitle><CardDescription>All recorded revenue streams and receipts.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Record Income</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Inc. ID</TableHead><TableHead>Source</TableHead><TableHead>Customer</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {incomes.map(inc => (
                    <TableRow key={inc.id}>
                      <TableCell className="font-medium">{inc.id}</TableCell>
                      <TableCell><Badge variant="outline">{inc.source}</Badge></TableCell>
                      <TableCell className="font-semibold">{inc.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{inc.date}</TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">{inc.amount}</TableCell>
                      <TableCell>
                        <Badge variant={inc.status === "Received" ? "default" : "secondary"}
                          className={inc.status === "Received" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                          {inc.status}
                        </Badge>
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
