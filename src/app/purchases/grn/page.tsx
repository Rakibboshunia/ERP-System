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
import { usePurchaseStore, GRN } from "@/store/usePurchaseStore"

export default function GrnPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const grnList = usePurchaseStore(state => state.grnList)
  const addGRN = usePurchaseStore(state => state.addGRN)
  const updateGRN = usePurchaseStore(state => state.updateGRN)
  const deleteGRN = usePurchaseStore(state => state.deleteGRN)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingGRN, setEditingGRN] = React.useState<GRN | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    addGRN({
      id: `GRN-${Math.floor(5000 + Math.random() * 900)}`,
      poRef: formData.get("poRef") as string || "--",
      supplier: formData.get("supplier") as string,
      receivedBy: formData.get("receivedBy") as string,
      date: formData.get("date") as string,
      totalItems: parseInt(formData.get("totalItems") as string, 10) || 0,
      receivedItems: parseInt(formData.get("receivedItems") as string, 10) || 0,
      status: formData.get("status") as GRN["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingGRN) return
    const formData = new FormData(e.currentTarget)
    updateGRN(editingGRN.id, {
      poRef: formData.get("poRef") as string || "--",
      supplier: formData.get("supplier") as string,
      receivedBy: formData.get("receivedBy") as string,
      date: formData.get("date") as string,
      totalItems: parseInt(formData.get("totalItems") as string, 10) || 0,
      receivedItems: parseInt(formData.get("receivedItems") as string, 10) || 0,
      status: formData.get("status") as GRN["status"],
    })
    setIsEditOpen(false)
    setEditingGRN(null)
  }

  const openEdit = (grn: GRN) => { setEditingGRN(grn); setIsEditOpen(true) }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Goods Receive Note (GRN)</CardTitle>
            <CardDescription>Document goods received from suppliers against purchase orders.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Create GRN</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>New GRN</DialogTitle>
                    <DialogDescription>Record goods received from a supplier.</DialogDescription>
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
                      <Label className="text-right">Received By</Label>
                      <Input name="receivedBy" required className="col-span-3" placeholder="e.g. Inv. Manager" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Date</Label>
                      <Input name="date" required className="col-span-3" placeholder="e.g. Oct 23, 2026" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Total Items</Label>
                      <Input name="totalItems" type="number" required defaultValue={0} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Received</Label>
                      <Input name="receivedItems" type="number" required defaultValue={0} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Awaiting">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Awaiting">Awaiting</SelectItem>
                            <SelectItem value="Partial">Partial</SelectItem>
                            <SelectItem value="Fully Received">Fully Received</SelectItem>
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
              <TableHead>GRN No.</TableHead>
              <TableHead>PO Ref.</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Received By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total / Received</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
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
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(grn)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteGRN(grn.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {grnList.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No GRN records found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingGRN && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit GRN</DialogTitle>
                <DialogDescription>Update goods receive note details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Supplier</Label>
                  <Input name="supplier" required defaultValue={editingGRN.supplier} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">PO Ref.</Label>
                  <Input name="poRef" defaultValue={editingGRN.poRef !== "--" ? editingGRN.poRef : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Received By</Label>
                  <Input name="receivedBy" required defaultValue={editingGRN.receivedBy !== "--" ? editingGRN.receivedBy : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date</Label>
                  <Input name="date" required defaultValue={editingGRN.date !== "--" ? editingGRN.date : ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Total Items</Label>
                  <Input name="totalItems" type="number" required defaultValue={editingGRN.totalItems} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Received</Label>
                  <Input name="receivedItems" type="number" required defaultValue={editingGRN.receivedItems} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingGRN.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Awaiting">Awaiting</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Fully Received">Fully Received</SelectItem>
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
