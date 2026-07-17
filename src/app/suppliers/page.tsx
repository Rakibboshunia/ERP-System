"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, History, CreditCard, Star, Plus, Search, MoreHorizontal, Phone, Mail, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const suppliers = [
  { id: "SUP-001", name: "TechParts Inc.", contact: "Michael Tanaka", email: "m.tanaka@techparts.com", phone: "+1 (555) 201-3344", category: "Electronics", status: "Active" },
  { id: "SUP-002", name: "Global Steel Co.", contact: "Sarah Chen", email: "s.chen@globalsteel.com", phone: "+1 (555) 882-7755", category: "Raw Materials", status: "Active" },
  { id: "SUP-003", name: "FastShip Logistics", contact: "Omar Hassan", email: "o.hassan@fastship.com", phone: "+1 (555) 443-6621", category: "Logistics", status: "Inactive" },
  { id: "SUP-004", name: "OfficeWorld Supplies", contact: "Linda Park", email: "l.park@officeworld.com", phone: "+1 (555) 339-0011", category: "Office Supplies", status: "Active" },
]

const purchaseHistory = [
  { id: "PO-4021", supplier: "TechParts Inc.", date: "Oct 10, 2026", items: 48, total: "$14,200.00", status: "Received" },
  { id: "PO-4022", supplier: "Global Steel Co.", date: "Oct 12, 2026", items: 12, total: "$32,500.00", status: "Pending" },
  { id: "PO-4023", supplier: "OfficeWorld Supplies", date: "Oct 14, 2026", items: 5, total: "$780.00", status: "Received" },
  { id: "PO-4024", supplier: "FastShip Logistics", date: "Oct 15, 2026", items: 1, total: "$3,100.00", status: "Cancelled" },
]

const paymentsDue = [
  { id: "PAY-201", supplier: "TechParts Inc.", invoiceNo: "INV-8844", amount: "$14,200.00", dueDate: "Oct 25, 2026", daysLeft: 8, status: "Upcoming" },
  { id: "PAY-202", supplier: "Global Steel Co.", invoiceNo: "INV-9210", amount: "$32,500.00", dueDate: "Oct 20, 2026", daysLeft: 3, status: "Due Soon" },
  { id: "PAY-203", supplier: "OfficeWorld Supplies", invoiceNo: "INV-7721", amount: "$780.00", dueDate: "Oct 15, 2026", daysLeft: -2, status: "Overdue" },
]

const ratings = [
  { id: "SUP-001", name: "TechParts Inc.", onTime: 96, quality: 4.7, responseTime: "< 2 hours", returns: 1.2, overall: 4.8 },
  { id: "SUP-002", name: "Global Steel Co.", onTime: 88, quality: 4.3, responseTime: "< 4 hours", returns: 3.1, overall: 4.1 },
  { id: "SUP-003", name: "FastShip Logistics", onTime: 72, quality: 3.5, responseTime: "< 1 day", returns: 8.4, overall: 3.2 },
  { id: "SUP-004", name: "OfficeWorld Supplies", onTime: 99, quality: 4.9, responseTime: "< 1 hour", returns: 0.5, overall: 4.9 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="text-xs font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function SuppliersPage() {
  const { hasPermission } = useAuth()
  const canManageSuppliers = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Supplier Management</h1>
          <p className="text-muted-foreground">Manage suppliers, track purchase history, and monitor payment obligations.</p>
        </div>
        {canManageSuppliers && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Supplier
          </Button>
        )}
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full"><Truck className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Active Suppliers</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-full"><History className="w-5 h-5 text-emerald-500" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Open POs</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 p-2 rounded-full"><CreditCard className="w-5 h-5 text-amber-500" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Payments Due (30d)</p>
                <p className="text-2xl font-bold">$47,480</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-rose-500/10 p-2 rounded-full"><AlertCircle className="w-5 h-5 text-rose-500" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Overdue Payments</p>
                <p className="text-2xl font-bold text-rose-500">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto mb-6">
          <TabsTrigger value="list" className="py-2.5 flex items-center gap-2">
            <Truck className="w-4 h-4 hidden sm:inline" /> Supplier List
          </TabsTrigger>
          <TabsTrigger value="history" className="py-2.5 flex items-center gap-2">
            <History className="w-4 h-4 hidden sm:inline" /> Purchase History
          </TabsTrigger>
          <TabsTrigger value="payments" className="py-2.5 flex items-center gap-2">
            <CreditCard className="w-4 h-4 hidden sm:inline" /> Payment Due
          </TabsTrigger>
          <TabsTrigger value="ratings" className="py-2.5 flex items-center gap-2">
            <Star className="w-4 h-4 hidden sm:inline" /> Supplier Rating
          </TabsTrigger>
        </TabsList>

        {/* Supplier List Tab */}
        <TabsContent value="list">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Supplier Directory</CardTitle>
                  <CardDescription>All registered vendors and supplier contacts.</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search suppliers..." className="w-full bg-background pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    {canManageSuppliers && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((sup) => (
                    <TableRow key={sup.id}>
                      <TableCell className="font-medium text-muted-foreground">{sup.id}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{sup.name}</div>
                        <div className="text-xs text-muted-foreground">{sup.contact}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {sup.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {sup.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{sup.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={sup.status === "Active" ? "default" : "secondary"} className={sup.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>
                          {sup.status}
                        </Badge>
                      </TableCell>
                      {canManageSuppliers && (
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchase History Tab */}
        <TabsContent value="history">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Full log of all purchase orders placed with suppliers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseHistory.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell className="font-medium">{po.id}</TableCell>
                      <TableCell>{po.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{po.date}</TableCell>
                      <TableCell>{po.items}</TableCell>
                      <TableCell className="font-bold">{po.total}</TableCell>
                      <TableCell>
                        <Badge variant={
                          po.status === "Received" ? "default" :
                          po.status === "Pending" ? "secondary" : "destructive"
                        } className={
                          po.status === "Received" ? "bg-emerald-500/10 text-emerald-600" :
                          po.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                        }>
                          {po.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Due Tab */}
        <TabsContent value="payments">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Due</CardTitle>
              <CardDescription>Outstanding invoices from suppliers that need to be settled.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    {canManageSuppliers && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentsDue.map((pay) => (
                    <TableRow key={pay.id} className={pay.status === "Overdue" ? "bg-rose-500/5" : ""}>
                      <TableCell className="font-medium">{pay.id}</TableCell>
                      <TableCell className="font-semibold">{pay.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{pay.invoiceNo}</TableCell>
                      <TableCell className="font-bold">{pay.amount}</TableCell>
                      <TableCell>
                        <div className="text-sm">{pay.dueDate}</div>
                        <div className={`text-xs ${pay.daysLeft < 0 ? "text-rose-500 font-semibold" : pay.daysLeft <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                          {pay.daysLeft < 0 ? `${Math.abs(pay.daysLeft)} days overdue` : `${pay.daysLeft} days left`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          pay.status === "Overdue" ? "destructive" :
                          pay.status === "Due Soon" ? "default" : "secondary"
                        } className={
                          pay.status === "Due Soon" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" :
                          pay.status === "Upcoming" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" : ""
                        }>
                          {pay.status}
                        </Badge>
                      </TableCell>
                      {canManageSuppliers && (
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">Pay Now</Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplier Ratings Tab */}
        <TabsContent value="ratings">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Supplier Ratings</CardTitle>
              <CardDescription>Performance metrics and quality evaluations per supplier.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>On-Time Delivery</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Return Rate</TableHead>
                    <TableHead>Overall Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratings.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-semibold">{r.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${r.onTime >= 90 ? "bg-emerald-500" : r.onTime >= 75 ? "bg-amber-500" : "bg-rose-500"}`}
                              style={{ width: `${r.onTime}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{r.onTime}%</span>
                        </div>
                      </TableCell>
                      <TableCell><StarRating rating={r.quality} /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.responseTime}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={r.returns < 2 ? "text-emerald-500 border-emerald-500/30" : r.returns < 5 ? "text-amber-500 border-amber-500/30" : "text-rose-500 border-rose-500/30"}>
                          {r.returns}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StarRating rating={r.overall} />
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
