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
import { useSalesStore, SalesOrder } from "@/store/useSalesStore"

export default function OrdersPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  const salesOrders = useSalesStore(state => state.salesOrders)
  const addSalesOrder = useSalesStore(state => state.addSalesOrder)
  const updateSalesOrder = useSalesStore(state => state.updateSalesOrder)
  const deleteSalesOrder = useSalesStore(state => state.deleteSalesOrder)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingSO, setEditingSO] = React.useState<SalesOrder | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addSalesOrder({
      id: `SO-${Math.floor(3000 + Math.random() * 900)}`,
      customer: formData.get("customer") as string,
      quoteId: formData.get("quoteId") as string || "--",
      items: parseInt(formData.get("items") as string, 10) || 1,
      totalAmount: `$${formData.get("totalAmount")}`,
      orderDate: formData.get("orderDate") as string,
      expectedDelivery: formData.get("expectedDelivery") as string,
      status: formData.get("status") as SalesOrder["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingSO) return
    const formData = new FormData(e.currentTarget)
    
    updateSalesOrder(editingSO.id, {
      customer: formData.get("customer") as string,
      quoteId: formData.get("quoteId") as string || "--",
      items: parseInt(formData.get("items") as string, 10) || 1,
      totalAmount: `$${formData.get("totalAmount")}`,
      orderDate: formData.get("orderDate") as string,
      expectedDelivery: formData.get("expectedDelivery") as string,
      status: formData.get("status") as SalesOrder["status"],
    })
    setIsEditOpen(false)
    setEditingSO(null)
  }

  const openEdit = (so: SalesOrder) => {
    setEditingSO(so)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Orders</CardTitle>
            <CardDescription>Confirmed customer orders ready for fulfillment.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Order</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>New Sales Order</DialogTitle>
                    <DialogDescription>Create a new confirmed customer order.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Customer</Label>
                      <Input name="customer" required className="col-span-3" placeholder="e.g. Acme Corp" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Quote Ref.</Label>
                      <Input name="quoteId" className="col-span-3" placeholder="e.g. QT-2001 (Optional)" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Items</Label>
                      <Input name="items" type="number" required defaultValue={1} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Total Amount</Label>
                      <Input name="totalAmount" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Order Date</Label>
                      <Input name="orderDate" required className="col-span-3" placeholder="e.g. Oct 17, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Exp. Delivery</Label>
                      <Input name="expectedDelivery" required className="col-span-3" placeholder="e.g. Oct 24, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Processing">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
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
              <TableHead>SO No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Quote Ref.</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesOrders.map(so => (
              <TableRow key={so.id}>
                <TableCell className="font-medium">{so.id}</TableCell>
                <TableCell className="font-semibold">{so.customer}</TableCell>
                <TableCell className="text-primary text-xs">{so.quoteId}</TableCell>
                <TableCell className="text-muted-foreground">{so.orderDate}</TableCell>
                <TableCell className="text-right font-bold">{so.totalAmount}</TableCell>
                <TableCell className="text-muted-foreground">{so.expectedDelivery}</TableCell>
                <TableCell>
                  <Badge variant={
                    so.status === "Delivered" ? "default" :
                    so.status === "Shipped" || so.status === "Processing" ? "secondary" : "outline"
                  } className={
                    so.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" :
                    so.status === "Shipped" ? "bg-blue-500/10 text-blue-600" :
                    so.status === "Processing" ? "bg-amber-500/10 text-amber-600" :
                    "text-muted-foreground"
                  }>
                    {so.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(so)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteSalesOrder(so.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {salesOrders.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No sales orders found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingSO && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Sales Order</DialogTitle>
                <DialogDescription>Update order details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Customer</Label>
                  <Input name="customer" required defaultValue={editingSO.customer} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Quote Ref.</Label>
                  <Input name="quoteId" defaultValue={editingSO.quoteId !== "--" ? editingSO.quoteId : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Items</Label>
                  <Input name="items" type="number" required defaultValue={editingSO.items} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Total Amount</Label>
                  <Input name="totalAmount" type="number" step="0.01" required defaultValue={editingSO.totalAmount.replace('$', '').replace(/,/g, '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Order Date</Label>
                  <Input name="orderDate" required defaultValue={editingSO.orderDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Exp. Delivery</Label>
                  <Input name="expectedDelivery" required defaultValue={editingSO.expectedDelivery} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingSO.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
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
