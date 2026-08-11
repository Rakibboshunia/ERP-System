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
import { useSalesStore, DeliveryNote } from "@/store/useSalesStore"

export default function DeliveryPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  const deliveryNotes = useSalesStore(state => state.deliveryNotes)
  const addDeliveryNote = useSalesStore(state => state.addDeliveryNote)
  const updateDeliveryNote = useSalesStore(state => state.updateDeliveryNote)
  const deleteDeliveryNote = useSalesStore(state => state.deleteDeliveryNote)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingDN, setEditingDN] = React.useState<DeliveryNote | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addDeliveryNote({
      id: `DN-${Math.floor(5000 + Math.random() * 900)}`,
      orderId: formData.get("orderId") as string || "--",
      customer: formData.get("customer") as string,
      address: formData.get("address") as string,
      deliveryDate: formData.get("deliveryDate") as string,
      driver: formData.get("driver") as string,
      status: formData.get("status") as DeliveryNote["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingDN) return
    const formData = new FormData(e.currentTarget)
    
    updateDeliveryNote(editingDN.id, {
      orderId: formData.get("orderId") as string || "--",
      customer: formData.get("customer") as string,
      address: formData.get("address") as string,
      deliveryDate: formData.get("deliveryDate") as string,
      driver: formData.get("driver") as string,
      status: formData.get("status") as DeliveryNote["status"],
    })
    setIsEditOpen(false)
    setEditingDN(null)
  }

  const openEdit = (dn: DeliveryNote) => {
    setEditingDN(dn)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Delivery Notes</CardTitle>
            <CardDescription>Shipment records tracking goods dispatched to customers.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create Delivery Note</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>New Delivery Note</DialogTitle>
                    <DialogDescription>Generate a new shipment record.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Customer</Label>
                      <Input name="customer" required className="col-span-3" placeholder="e.g. Acme Corp" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">SO Ref.</Label>
                      <Input name="orderId" className="col-span-3" placeholder="e.g. SO-3101 (Optional)" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Address</Label>
                      <Input name="address" required className="col-span-3" placeholder="Delivery address" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Delivery Date</Label>
                      <Input name="deliveryDate" required className="col-span-3" placeholder="e.g. Oct 20, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Driver</Label>
                      <Input name="driver" required className="col-span-3" placeholder="e.g. Frank Castle" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Pending">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Transit">In Transit</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
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
              <TableHead>DN No.</TableHead>
              <TableHead>SO Ref.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryNotes.map(dn => (
              <TableRow key={dn.id}>
                <TableCell className="font-medium">{dn.id}</TableCell>
                <TableCell className="text-primary text-xs">{dn.orderId}</TableCell>
                <TableCell className="font-semibold">{dn.customer}</TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[180px] truncate">{dn.address}</TableCell>
                <TableCell className="text-muted-foreground">{dn.deliveryDate}</TableCell>
                <TableCell className="text-muted-foreground">{dn.driver}</TableCell>
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
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(dn)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteDeliveryNote(dn.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {deliveryNotes.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No delivery notes found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingDN && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Delivery Note</DialogTitle>
                <DialogDescription>Update shipment details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Customer</Label>
                  <Input name="customer" required defaultValue={editingDN.customer} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">SO Ref.</Label>
                  <Input name="orderId" defaultValue={editingDN.orderId !== "--" ? editingDN.orderId : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Address</Label>
                  <Input name="address" required defaultValue={editingDN.address} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Delivery Date</Label>
                  <Input name="deliveryDate" required defaultValue={editingDN.deliveryDate} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Driver</Label>
                  <Input name="driver" required defaultValue={editingDN.driver} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingDN.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Transit">In Transit</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
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
