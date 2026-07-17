"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, ShoppingCart, Receipt, Truck, Undo2, Plus, Search, MoreHorizontal, TrendingUp, DollarSign, Package, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const quotations = [
  { id: "QT-2001", customer: "Acme Corp", contact: "John Doe", items: 5, amount: "$12,400.00", validUntil: "Oct 30, 2026", status: "Sent" },
  { id: "QT-2002", customer: "LexCorp", contact: "Lex Luthor", items: 3, amount: "$8,750.00", validUntil: "Nov 05, 2026", status: "Draft" },
  { id: "QT-2003", customer: "Stark Industries", contact: "Pepper Potts", items: 12, amount: "$54,000.00", validUntil: "Oct 25, 2026", status: "Accepted" },
  { id: "QT-2004", customer: "Wayne Enterprises", contact: "Alfred Pennyworth", items: 2, amount: "$3,200.00", validUntil: "Oct 20, 2026", status: "Expired" },
]

const salesOrders = [
  { id: "SO-3101", customer: "Acme Corp", qtRef: "QT-2001", date: "Oct 17, 2026", amount: "$12,400.00", deliveryDate: "Oct 24, 2026", status: "Confirmed" },
  { id: "SO-3102", customer: "Stark Industries", qtRef: "QT-2003", date: "Oct 16, 2026", amount: "$54,000.00", deliveryDate: "Oct 28, 2026", status: "Processing" },
  { id: "SO-3103", customer: "Queen Consolidated", qtRef: "--", date: "Oct 18, 2026", amount: "$7,500.00", deliveryDate: "Oct 23, 2026", status: "On Hold" },
]

const invoices = [
  { id: "INV-4201", customer: "Acme Corp", soRef: "SO-3101", issueDate: "Oct 18, 2026", dueDate: "Nov 17, 2026", amount: "$12,400.00", status: "Unpaid" },
  { id: "INV-4202", customer: "Stark Industries", soRef: "SO-3102", issueDate: "Oct 17, 2026", dueDate: "Nov 16, 2026", amount: "$54,000.00", status: "Partial" },
  { id: "INV-4203", customer: "Oscorp", soRef: "SO-2990", issueDate: "Oct 01, 2026", dueDate: "Oct 15, 2026", amount: "$5,400.00", status: "Overdue" },
  { id: "INV-4204", customer: "Daily Planet", soRef: "SO-2945", issueDate: "Sep 15, 2026", dueDate: "Oct 14, 2026", amount: "$1,250.00", status: "Paid" },
]

const deliveryNotes = [
  { id: "DN-5001", soRef: "SO-3101", customer: "Acme Corp", address: "123 Main St, Tech City", items: 5, dispatchDate: "Oct 20, 2026", deliveredDate: "Oct 22, 2026", status: "Delivered" },
  { id: "DN-5002", soRef: "SO-3102", customer: "Stark Industries", address: "Stark Tower, New York", items: 12, dispatchDate: "Oct 23, 2026", deliveredDate: "--", status: "In Transit" },
  { id: "DN-5003", soRef: "SO-3103", customer: "Queen Consolidated", address: "42 Arrow Ave, Star City", items: 8, dispatchDate: "--", deliveredDate: "--", status: "Pending" },
]

const returns = [
  { id: "RMA-6001", invoiceRef: "INV-4202", customer: "Stark Industries", items: 2, reason: "Defective unit", amount: "$9,000.00", date: "Oct 19, 2026", status: "Approved" },
  { id: "RMA-6002", invoiceRef: "INV-4201", customer: "Acme Corp", items: 1, reason: "Wrong item shipped", amount: "$2,480.00", date: "Oct 20, 2026", status: "Pending" },
  { id: "RMA-6003", invoiceRef: "INV-4203", customer: "Oscorp", items: 3, reason: "Customer changed mind", amount: "$1,620.00", date: "Oct 15, 2026", status: "Rejected" },
]

export default function SalesManagementPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])
  const canApprove = hasPermission(["superadmin", "admin"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sales Management</h1>
          <p className="text-muted-foreground">Manage the complete order-to-cash cycle from quotations to returns.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Quotation
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><TrendingUp className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Active Quotations</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><ShoppingCart className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Open Orders</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><DollarSign className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Outstanding Invoices</p><p className="text-2xl font-bold text-amber-500">$66,400</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><AlertCircle className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Pending Returns</p><p className="text-2xl font-bold text-rose-500">1</p></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quotations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto mb-6">
          <TabsTrigger value="quotations" className="py-2.5 flex items-center gap-2">
            <FileText className="w-4 h-4 hidden sm:inline" /> Quotation
          </TabsTrigger>
          <TabsTrigger value="orders" className="py-2.5 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 hidden sm:inline" /> Sales Order
          </TabsTrigger>
          <TabsTrigger value="invoices" className="py-2.5 flex items-center gap-2">
            <Receipt className="w-4 h-4 hidden sm:inline" /> Invoice
          </TabsTrigger>
          <TabsTrigger value="delivery" className="py-2.5 flex items-center gap-2">
            <Truck className="w-4 h-4 hidden sm:inline" /> Delivery Note
          </TabsTrigger>
          <TabsTrigger value="returns" className="py-2.5 flex items-center gap-2">
            <Undo2 className="w-4 h-4 hidden sm:inline" /> Returns (RMA)
          </TabsTrigger>
        </TabsList>

        {/* Quotations */}
        <TabsContent value="quotations">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Quotations</CardTitle>
                  <CardDescription>Price proposals sent to prospective and existing customers.</CardDescription>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search quotations..." className="pl-8" />
                  </div>
                  {canManage && <Button size="sm" variant="outline">Export</Button>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote No.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations.map(qt => (
                    <TableRow key={qt.id}>
                      <TableCell className="font-medium">{qt.id}</TableCell>
                      <TableCell className="font-semibold">{qt.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{qt.contact}</TableCell>
                      <TableCell className="text-right">{qt.items}</TableCell>
                      <TableCell className="text-right font-bold">{qt.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{qt.validUntil}</TableCell>
                      <TableCell>
                        <Badge variant={
                          qt.status === "Accepted" ? "default" :
                          qt.status === "Expired" ? "destructive" :
                          qt.status === "Sent" ? "secondary" : "outline"
                        } className={
                          qt.status === "Accepted" ? "bg-emerald-500/10 text-emerald-600" :
                          qt.status === "Sent" ? "bg-blue-500/10 text-blue-600" :
                          qt.status === "Draft" ? "text-muted-foreground" : ""
                        }>
                          {qt.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {qt.status === "Draft" && <Button size="sm" variant="outline">Send</Button>}
                            {qt.status === "Sent" && <Button size="sm" variant="outline">Convert to SO</Button>}
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Orders */}
        <TabsContent value="orders">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Orders</CardTitle>
                  <CardDescription>Confirmed customer orders ready for fulfillment.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Order</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SO No.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Quote Ref.</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesOrders.map(so => (
                    <TableRow key={so.id}>
                      <TableCell className="font-medium">{so.id}</TableCell>
                      <TableCell className="font-semibold">{so.customer}</TableCell>
                      <TableCell className="text-primary text-xs">{so.qtRef}</TableCell>
                      <TableCell className="text-muted-foreground">{so.date}</TableCell>
                      <TableCell className="text-right font-bold">{so.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{so.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          so.status === "Confirmed" ? "default" :
                          so.status === "Processing" ? "secondary" : "outline"
                        } className={
                          so.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                          so.status === "Processing" ? "bg-blue-500/10 text-blue-600" :
                          "bg-amber-500/10 text-amber-600"
                        }>
                          {so.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline">Invoice</Button>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Customer invoices generated from confirmed sales orders.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Invoice</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>SO Ref.</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(inv => (
                    <TableRow key={inv.id} className={inv.status === "Overdue" ? "bg-rose-500/5" : ""}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell className="font-semibold">{inv.customer}</TableCell>
                      <TableCell className="text-primary text-xs">{inv.soRef}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.issueDate}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                      <TableCell className="text-right font-bold">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          inv.status === "Paid" ? "default" :
                          inv.status === "Overdue" ? "destructive" :
                          inv.status === "Partial" ? "secondary" : "outline"
                        } className={
                          inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                          inv.status === "Partial" ? "bg-amber-500/10 text-amber-600" :
                          inv.status === "Unpaid" ? "text-muted-foreground" : ""
                        }>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {inv.status !== "Paid" && <Button size="sm" variant="outline">Record Payment</Button>}
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Notes */}
        <TabsContent value="delivery">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Delivery Notes</CardTitle>
                  <CardDescription>Shipment records tracking goods dispatched to customers.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Delivery Note</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DN No.</TableHead>
                    <TableHead>SO Ref.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead>Dispatch Date</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryNotes.map(dn => (
                    <TableRow key={dn.id}>
                      <TableCell className="font-medium">{dn.id}</TableCell>
                      <TableCell className="text-primary text-xs">{dn.soRef}</TableCell>
                      <TableCell className="font-semibold">{dn.customer}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[180px] truncate">{dn.address}</TableCell>
                      <TableCell className="text-right">{dn.items}</TableCell>
                      <TableCell className="text-muted-foreground">{dn.dispatchDate}</TableCell>
                      <TableCell className="text-muted-foreground">{dn.deliveredDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          dn.status === "Delivered" ? "default" :
                          dn.status === "In Transit" ? "secondary" : "outline"
                        } className={
                          dn.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" :
                          dn.status === "In Transit" ? "bg-blue-500/10 text-blue-600" :
                          "text-muted-foreground"
                        }>
                          {dn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Returns (RMA) */}
        <TabsContent value="returns">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Return Management (RMA)</CardTitle>
                  <CardDescription>Customer return requests and refund/replacement processing.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Return</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RMA No.</TableHead>
                    <TableHead>Invoice Ref.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Refund Amt.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    {canApprove && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returns.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell className="text-primary text-xs">{r.invoiceRef}</TableCell>
                      <TableCell className="font-semibold">{r.customer}</TableCell>
                      <TableCell className="text-right">{r.items}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.reason}</TableCell>
                      <TableCell className="text-right font-bold">{r.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{r.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          r.status === "Approved" ? "default" :
                          r.status === "Rejected" ? "destructive" : "secondary"
                        } className={
                          r.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                          r.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                        }>
                          {r.status}
                        </Badge>
                      </TableCell>
                      {canApprove && (
                        <TableCell className="text-right">
                          {r.status === "Pending" ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-500/30 hover:bg-emerald-50">Approve</Button>
                              <Button size="sm" variant="outline" className="text-rose-500 border-rose-500/30 hover:bg-rose-50">Reject</Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          )}
                        </TableCell>
                      )}
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
