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
import { usePurchaseStore, PurchaseOrder } from "@/store/usePurchaseStore"

export default function OrdersPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const purchaseOrders = usePurchaseStore(state => state.purchaseOrders)
  const addPurchaseOrder = usePurchaseStore(state => state.addPurchaseOrder)
  const updatePurchaseOrder = usePurchaseStore(state => state.updatePurchaseOrder)
  const deletePurchaseOrder = usePurchaseStore(state => state.deletePurchaseOrder)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingPO, setEditingPO] = React.useState<PurchaseOrder | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addPurchaseOrder({
      id: `PO-${Math.floor(4000 + Math.random() * 900)}`,
      supplier: formData.get("supplier") as string,
      prRef: formData.get("prRef") as string || "--",
      items: parseInt(formData.get("items") as string, 10) || 1,
      total: `$${formData.get("total")}`,
      orderDate: formData.get("orderDate") as string,
      deliveryDate: formData.get("deliveryDate") as string,
      status: formData.get("status") as PurchaseOrder["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingPO) return
    const formData = new FormData(e.currentTarget)
    
    updatePurchaseOrder(editingPO.id, {
      supplier: formData.get("supplier") as string,
      prRef: formData.get("prRef") as string || "--",
      items: parseInt(formData.get("items") as string, 10) || 1,
      total: `$${formData.get("total")}`,
      orderDate: formData.get("orderDate") as string,
      deliveryDate: formData.get("deliveryDate") as string,
      status: formData.get("status") as PurchaseOrder["status"],
    })
    setIsEditOpen(false)
    setEditingPO(null)
  }

  const openEdit = (po: PurchaseOrder) => {
    setEditingPO(po)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>Formal orders sent to suppliers for approved purchase requests.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create PO</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>New Purchase Order</DialogTitle>
                    <DialogDescription>Create a formal order for a supplier.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Supplier</Label>
                      <Input name="supplier" required className="col-span-3" placeholder="e.g. TechParts Inc." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">PR Ref.</Label>
                      <Input name="prRef" className="col-span-3" placeholder="e.g. PR-3001 (Optional)" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Items</Label>
                      <Input name="items" type="number" required defaultValue={1} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Total Amount</Label>
                      <Input name="total" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Order Date</Label>
                      <Input name="orderDate" required className="col-span-3" placeholder="e.g. Oct 16, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Exp. Delivery</Label>
                      <Input name="deliveryDate" required className="col-span-3" placeholder="e.g. Oct 23, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Draft">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Sent">Sent</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
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
              <TableHead>PO No.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>PR Ref.</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(po)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deletePurchaseOrder(po.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {purchaseOrders.length === 0 && (
              <TableRow><TableCell colSpan={9} className="text-center py-6 text-muted-foreground">No purchase orders found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingPO && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Purchase Order</DialogTitle>
                <DialogDescription>Update order details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Supplier</Label>
                  <Input name="supplier" required defaultValue={editingPO.supplier} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">PR Ref.</Label>
                  <Input name="prRef" defaultValue={editingPO.prRef !== "--" ? editingPO.prRef : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Items</Label>
                  <Input name="items" type="number" required defaultValue={editingPO.items} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Total Amount</Label>
                  <Input name="total" type="number" step="0.01" required defaultValue={editingPO.total.replace('$', '').replace(/,/g, '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Order Date</Label>
                  <Input name="orderDate" required defaultValue={editingPO.orderDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Exp. Delivery</Label>
                  <Input name="deliveryDate" required defaultValue={editingPO.deliveryDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingPO.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
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
