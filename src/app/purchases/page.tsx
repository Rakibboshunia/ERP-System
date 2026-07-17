"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ClipboardList, ShoppingBag, PackageCheck, FileText, Plus, Search, MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const purchaseRequests = [
  { id: "PR-3001", title: "Office Supplies Restock", requestedBy: "HR Dept", department: "Human Resources", amount: "$1,200.00", date: "Oct 15, 2026", status: "Approved" },
  { id: "PR-3002", title: "Server RAM Upgrade", requestedBy: "IT Team", department: "Engineering", amount: "$4,500.00", date: "Oct 16, 2026", status: "Pending" },
  { id: "PR-3003", title: "Ergonomic Chairs x10", requestedBy: "Admin", department: "Admin", amount: "$9,990.00", date: "Oct 17, 2026", status: "Pending" },
  { id: "PR-3004", title: "Marketing Banners", requestedBy: "Marketing", department: "Marketing", amount: "$800.00", date: "Oct 14, 2026", status: "Rejected" },
]

const purchaseOrders = [
  { id: "PO-4101", supplier: "TechParts Inc.", prRef: "PR-3001", items: 12, total: "$14,200.00", orderDate: "Oct 16, 2026", deliveryDate: "Oct 23, 2026", status: "Confirmed" },
  { id: "PO-4102", supplier: "Global Steel Co.", prRef: "PR-3002", items: 5, total: "$32,500.00", orderDate: "Oct 17, 2026", deliveryDate: "Oct 28, 2026", status: "Sent" },
  { id: "PO-4103", supplier: "OfficeWorld", prRef: "PR-3003", items: 8, total: "$780.00", orderDate: "Oct 18, 2026", deliveryDate: "Oct 21, 2026", status: "Draft" },
]

const grnList = [
  { id: "GRN-5001", poRef: "PO-4101", supplier: "TechParts Inc.", receivedBy: "Inv. Manager", date: "Oct 23, 2026", totalItems: 12, receivedItems: 12, status: "Fully Received" },
  { id: "GRN-5002", poRef: "PO-4102", supplier: "Global Steel Co.", receivedBy: "Inv. Manager", date: "Oct 25, 2026", totalItems: 5, receivedItems: 3, status: "Partial" },
  { id: "GRN-5003", poRef: "PO-4103", supplier: "OfficeWorld", receivedBy: "--", date: "--", totalItems: 8, receivedItems: 0, status: "Awaiting" },
]

const supplierInvoices = [
  { id: "SINV-7001", poRef: "PO-4101", supplier: "TechParts Inc.", invoiceDate: "Oct 24, 2026", dueDate: "Nov 23, 2026", amount: "$14,200.00", status: "Unpaid" },
  { id: "SINV-7002", poRef: "PO-4102", supplier: "Global Steel Co.", invoiceDate: "Oct 26, 2026", dueDate: "Nov 10, 2026", amount: "$19,500.00", status: "Partial" },
  { id: "SINV-7003", poRef: "PO-3990", supplier: "OfficeWorld", invoiceDate: "Oct 10, 2026", dueDate: "Oct 17, 2026", amount: "$780.00", status: "Paid" },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Approved" || status === "Confirmed" || status === "Fully Received" || status === "Paid")
    return <CheckCircle className="w-4 h-4 text-emerald-500" />
  if (status === "Rejected")
    return <XCircle className="w-4 h-4 text-rose-500" />
  return <Clock className="w-4 h-4 text-amber-500" />
}

export default function PurchasesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])
  const canApprove = hasPermission(["superadmin", "admin"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Purchase Management</h1>
          <p className="text-muted-foreground">Manage the full procure-to-pay cycle from requests to supplier invoices.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Purchase Request
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><ClipboardList className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Pending Requests</p><p className="text-2xl font-bold">2</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><ShoppingBag className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Open POs</p><p className="text-2xl font-bold">3</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><PackageCheck className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Partial Receipts</p><p className="text-2xl font-bold text-amber-500">1</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><FileText className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Unpaid Invoices</p><p className="text-2xl font-bold text-rose-500">$33,700</p></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto mb-6">
          <TabsTrigger value="requests" className="py-2.5 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 hidden sm:inline" /> Purchase Request
          </TabsTrigger>
          <TabsTrigger value="orders" className="py-2.5 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 hidden sm:inline" /> Purchase Order
          </TabsTrigger>
          <TabsTrigger value="grn" className="py-2.5 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 hidden sm:inline" /> Goods Receive Note
          </TabsTrigger>
          <TabsTrigger value="invoices" className="py-2.5 flex items-center gap-2">
            <FileText className="w-4 h-4 hidden sm:inline" /> Supplier Invoice
          </TabsTrigger>
        </TabsList>

        {/* Purchase Requests */}
        <TabsContent value="requests">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Purchase Requests</CardTitle>
                  <CardDescription>Internal requests for procurement that require approval before ordering.</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search requests..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PR No.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    {canApprove && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseRequests.map(pr => (
                    <TableRow key={pr.id}>
                      <TableCell className="font-medium">{pr.id}</TableCell>
                      <TableCell className="font-semibold">{pr.title}</TableCell>
                      <TableCell>{pr.requestedBy}</TableCell>
                      <TableCell className="text-muted-foreground">{pr.department}</TableCell>
                      <TableCell className="text-right font-medium">{pr.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{pr.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <StatusIcon status={pr.status} />
                          <Badge variant={
                            pr.status === "Approved" ? "default" :
                            pr.status === "Rejected" ? "destructive" : "secondary"
                          } className={
                            pr.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                            pr.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                          }>
                            {pr.status}
                          </Badge>
                        </div>
                      </TableCell>
                      {canApprove && (
                        <TableCell className="text-right">
                          {pr.status === "Pending" ? (
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

        {/* Purchase Orders */}
        <TabsContent value="orders">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>Formal orders sent to suppliers for approved purchase requests.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create PO</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO No.</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>PR Ref.</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map(po => (
                    <TableRow key={po.id}>
                      <TableCell className="font-medium">{po.id}</TableCell>
                      <TableCell className="font-semibold">{po.supplier}</TableCell>
                      <TableCell className="text-primary text-xs">{po.prRef}</TableCell>
                      <TableCell className="text-right">{po.items}</TableCell>
                      <TableCell className="text-right font-bold">{po.total}</TableCell>
                      <TableCell className="text-muted-foreground">{po.orderDate}</TableCell>
                      <TableCell className="text-muted-foreground">{po.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          po.status === "Confirmed" ? "default" :
                          po.status === "Sent" ? "secondary" : "outline"
                        } className={
                          po.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                          po.status === "Sent" ? "bg-blue-500/10 text-blue-600" :
                          "bg-muted/50 text-muted-foreground"
                        }>
                          {po.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GRN */}
        <TabsContent value="grn">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Goods Receive Note (GRN)</CardTitle>
                  <CardDescription>Document goods received from suppliers against purchase orders.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create GRN</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>GRN No.</TableHead>
                    <TableHead>PO Ref.</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Received By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total / Received</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grnList.map(grn => (
                    <TableRow key={grn.id}>
                      <TableCell className="font-medium">{grn.id}</TableCell>
                      <TableCell className="text-primary text-xs">{grn.poRef}</TableCell>
                      <TableCell className="font-semibold">{grn.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{grn.receivedBy}</TableCell>
                      <TableCell className="text-muted-foreground">{grn.date}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-bold ${grn.receivedItems < grn.totalItems ? "text-amber-500" : "text-emerald-500"}`}>
                          {grn.receivedItems}
                        </span>
                        <span className="text-muted-foreground"> / {grn.totalItems} items</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          grn.status === "Fully Received" ? "default" :
                          grn.status === "Partial" ? "secondary" : "outline"
                        } className={
                          grn.status === "Fully Received" ? "bg-emerald-500/10 text-emerald-600" :
                          grn.status === "Partial" ? "bg-amber-500/10 text-amber-600" :
                          "text-muted-foreground"
                        }>
                          {grn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplier Invoices */}
        <TabsContent value="invoices">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Supplier Invoices</CardTitle>
                  <CardDescription>Invoices received from suppliers matched against purchase orders.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Record Invoice</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>PO Ref.</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    {canApprove && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierInvoices.map(inv => (
                    <TableRow key={inv.id} className={inv.status === "Unpaid" ? "bg-rose-500/5" : ""}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell className="text-primary text-xs">{inv.poRef}</TableCell>
                      <TableCell className="font-semibold">{inv.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.invoiceDate}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                      <TableCell className="text-right font-bold">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          inv.status === "Paid" ? "default" :
                          inv.status === "Partial" ? "secondary" : "destructive"
                        } className={
                          inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                          inv.status === "Partial" ? "bg-amber-500/10 text-amber-600" : ""
                        }>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      {canApprove && (
                        <TableCell className="text-right">
                          {inv.status !== "Paid" && (
                            <Button size="sm" variant="outline">Mark Paid</Button>
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
