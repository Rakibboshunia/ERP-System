"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSalesStore, Invoice } from "@/store/useSalesStore"

export default function InvoicesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  const invoices = useSalesStore(state => state.invoices)
  const addInvoice = useSalesStore(state => state.addInvoice)
  const updateInvoice = useSalesStore(state => state.updateInvoice)
  const deleteInvoice = useSalesStore(state => state.deleteInvoice)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingInv, setEditingInv] = React.useState<Invoice | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addInvoice({
      id: `INV-${Math.floor(4000 + Math.random() * 900)}`,
      customer: formData.get("customer") as string,
      orderId: formData.get("orderId") as string || "--",
      amount: `$${formData.get("amount")}`,
      issueDate: formData.get("issueDate") as string,
      dueDate: formData.get("dueDate") as string,
      status: formData.get("status") as Invoice["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingInv) return
    const formData = new FormData(e.currentTarget)
    
    updateInvoice(editingInv.id, {
      customer: formData.get("customer") as string,
      orderId: formData.get("orderId") as string || "--",
      amount: `$${formData.get("amount")}`,
      issueDate: formData.get("issueDate") as string,
      dueDate: formData.get("dueDate") as string,
      status: formData.get("status") as Invoice["status"],
    })
    setIsEditOpen(false)
    setEditingInv(null)
  }

  const openEdit = (inv: Invoice) => {
    setEditingInv(inv)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Customer invoices generated from confirmed sales orders.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Invoice</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>New Invoice</DialogTitle>
                    <DialogDescription>Generate a new customer invoice.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Customer</Label>
                      <Input name="customer" required className="col-span-3" placeholder="e.g. Acme Corp" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">SO Ref.</Label>
                      <Input name="orderId" className="col-span-3" placeholder="e.g. SO-3001 (Optional)" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Amount</Label>
                      <Input name="amount" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Issue Date</Label>
                      <Input name="issueDate" required className="col-span-3" placeholder="e.g. Oct 18, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Due Date</Label>
                      <Input name="dueDate" required className="col-span-3" placeholder="e.g. Nov 17, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Draft">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Sent">Sent</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
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
                <TableCell className="text-primary text-xs">{inv.orderId}</TableCell>
                <TableCell className="text-muted-foreground">{inv.issueDate}</TableCell>
                <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                <TableCell className="text-right font-bold">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    inv.status === "Paid" ? "default" :
                    inv.status === "Overdue" ? "destructive" :
                    inv.status === "Sent" ? "secondary" : "outline"
                  } className={
                    inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                    inv.status === "Sent" ? "bg-blue-500/10 text-blue-600" :
                    inv.status === "Draft" ? "text-muted-foreground" : ""
                  }>
                    {inv.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(inv)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteInvoice(inv.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {invoices.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No invoices found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingInv && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Invoice</DialogTitle>
                <DialogDescription>Update invoice details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Customer</Label>
                  <Input name="customer" required defaultValue={editingInv.customer} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">SO Ref.</Label>
                  <Input name="orderId" defaultValue={editingInv.orderId !== "--" ? editingInv.orderId : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <Input name="amount" type="number" step="0.01" required defaultValue={editingInv.amount.replace('$', '').replace(/,/g, '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Issue Date</Label>
                  <Input name="issueDate" required defaultValue={editingInv.issueDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Due Date</Label>
                  <Input name="dueDate" required defaultValue={editingInv.dueDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingInv.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
