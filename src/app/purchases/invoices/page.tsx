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
import { usePurchaseStore, SupplierInvoice } from "@/store/usePurchaseStore"

export default function InvoicesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])
  const canApprove = hasPermission(["superadmin", "admin"])

  const supplierInvoices = usePurchaseStore(state => state.supplierInvoices)
  const addSupplierInvoice = usePurchaseStore(state => state.addSupplierInvoice)
  const updateSupplierInvoice = usePurchaseStore(state => state.updateSupplierInvoice)
  const deleteSupplierInvoice = usePurchaseStore(state => state.deleteSupplierInvoice)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingInv, setEditingInv] = React.useState<SupplierInvoice | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    addSupplierInvoice({
      id: `SINV-${Math.floor(7000 + Math.random() * 900)}`,
      poRef: formData.get("poRef") as string || "--",
      supplier: formData.get("supplier") as string,
      invoiceDate: formData.get("invoiceDate") as string,
      dueDate: formData.get("dueDate") as string,
      amount: `$${formData.get("amount")}`,
      status: formData.get("status") as SupplierInvoice["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingInv) return
    const formData = new FormData(e.currentTarget)
    updateSupplierInvoice(editingInv.id, {
      poRef: formData.get("poRef") as string || "--",
      supplier: formData.get("supplier") as string,
      invoiceDate: formData.get("invoiceDate") as string,
      dueDate: formData.get("dueDate") as string,
      amount: `$${formData.get("amount")}`,
      status: formData.get("status") as SupplierInvoice["status"],
    })
    setIsEditOpen(false)
    setEditingInv(null)
  }

  const openEdit = (inv: SupplierInvoice) => { setEditingInv(inv); setIsEditOpen(true) }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Supplier Invoices</CardTitle>
            <CardDescription>Invoices received from suppliers matched against purchase orders.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Record Invoice</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>Record Supplier Invoice</DialogTitle>
                    <DialogDescription>Add a new invoice received from a supplier.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Supplier</Label>
                      <Input name="supplier" required className="col-span-3" placeholder="e.g. TechParts Inc." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">PO Ref.</Label>
                      <Input name="poRef" className="col-span-3" placeholder="e.g. PO-4101 (Optional)" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Amount</Label>
                      <Input name="amount" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Invoice Date</Label>
                      <Input name="invoiceDate" required className="col-span-3" placeholder="e.g. Oct 24, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Due Date</Label>
                      <Input name="dueDate" required className="col-span-3" placeholder="e.g. Nov 23, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Unpaid">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                            <SelectItem value="Partial">Partial</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
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
              <TableHead>PO Ref.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Actions</TableHead>}
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {inv.status !== "Paid" && (
                          <DropdownMenuItem onClick={() => updateSupplierInvoice(inv.id, { status: "Paid" })}>
                            Mark Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => openEdit(inv)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteSupplierInvoice(inv.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {supplierInvoices.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No supplier invoices found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canApprove && editingInv && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Supplier Invoice</DialogTitle>
                <DialogDescription>Update invoice details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Supplier</Label>
                  <Input name="supplier" required defaultValue={editingInv.supplier} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">PO Ref.</Label>
                  <Input name="poRef" defaultValue={editingInv.poRef !== "--" ? editingInv.poRef : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <Input name="amount" type="number" step="0.01" required defaultValue={editingInv.amount.replace('$', '').replace(/,/g, '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Invoice Date</Label>
                  <Input name="invoiceDate" required defaultValue={editingInv.invoiceDate} className="col-span-3" />
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
                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
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
