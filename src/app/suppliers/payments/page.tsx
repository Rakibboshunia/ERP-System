"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/store/useStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplierPaymentsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const payments = useStore(state => state.supplierPayments)
  const addPayment = useStore(state => state.addSupplierPayment)
  const updatePaymentStatus = useStore(state => state.updateSupplierPaymentStatus)
  const deletePayment = useStore(state => state.deleteSupplierPayment)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    supplier: "",
    invoiceNo: "",
    amount: "",
    dueDate: "",
    daysLeft: 5,
  })

  const handleAdd = () => {
    addPayment({
      id: `PAY-${Math.floor(300 + Math.random() * 700)}`,
      supplier: formData.supplier,
      invoiceNo: formData.invoiceNo,
      amount: formData.amount,
      dueDate: formData.dueDate,
      daysLeft: Number(formData.daysLeft),
      status: Number(formData.daysLeft) < 0 ? "Overdue" : Number(formData.daysLeft) <= 3 ? "Due Soon" : "Upcoming"
    })
    setIsAddOpen(false)
    setFormData({ supplier: "", invoiceNo: "", amount: "", dueDate: "", daysLeft: 5 })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Due</CardTitle>
            <CardDescription>Outstanding invoices from suppliers that need to be settled.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Payment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Supplier Payment</DialogTitle>
                  <DialogDescription>Record a new pending payment to a supplier.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplier" className="text-right">Supplier</Label>
                    <Input id="supplier" value={formData.supplier} onChange={e => setFormData({ ...formData, supplier: e.target.value })} className="col-span-3" placeholder="Company Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invoiceNo" className="text-right">Invoice No.</Label>
                    <Input id="invoiceNo" value={formData.invoiceNo} onChange={e => setFormData({ ...formData, invoiceNo: e.target.value })} className="col-span-3" placeholder="INV-1234" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Amount</Label>
                    <Input id="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="col-span-3" placeholder="$0.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                    <Input id="dueDate" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className="col-span-3" placeholder="Oct 25, 2026" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="daysLeft" className="text-right">Days Left</Label>
                    <Input id="daysLeft" type="number" value={formData.daysLeft} onChange={e => setFormData({ ...formData, daysLeft: Number(e.target.value) })} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
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
              {canManage && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map(pay => (
              <TableRow key={pay.id} className={pay.status === "Overdue" ? "bg-rose-500/5" : ""}>
                <TableCell className="font-medium">{pay.id}</TableCell>
                <TableCell className="font-semibold">{pay.supplier}</TableCell>
                <TableCell className="text-muted-foreground">{pay.invoiceNo}</TableCell>
                <TableCell className="font-bold">{pay.amount}</TableCell>
                <TableCell>
                  <div className="text-sm">{pay.dueDate}</div>
                  {pay.status !== "Paid" && (
                    <div className={`text-xs ${pay.daysLeft < 0 ? "text-rose-500 font-semibold" : pay.daysLeft <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                      {pay.daysLeft < 0 ? `${Math.abs(pay.daysLeft)} days overdue` : `${pay.daysLeft} days left`}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={pay.status === "Overdue" ? "destructive" : pay.status === "Due Soon" ? "default" : pay.status === "Paid" ? "outline" : "secondary"}
                    className={pay.status === "Due Soon" ? "bg-amber-500/10 text-amber-600" : pay.status === "Upcoming" ? "bg-blue-500/10 text-blue-600" : pay.status === "Paid" ? "text-emerald-600 border-emerald-500/30" : ""}>
                    {pay.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    {pay.status !== "Paid" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => updatePaymentStatus(pay.id, "Paid")}>Pay Now</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deletePayment(pay.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deletePayment(pay.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
