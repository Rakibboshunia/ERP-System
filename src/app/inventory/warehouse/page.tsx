"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useInventoryStore, Warehouse } from "@/store/useInventoryStore"

export default function WarehousePage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const warehouses = useInventoryStore(state => state.warehouses)
  const addWarehouse = useInventoryStore(state => state.addWarehouse)
  const updateWarehouse = useInventoryStore(state => state.updateWarehouse)
  const deleteWarehouse = useInventoryStore(state => state.deleteWarehouse)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingWH, setEditingWH] = React.useState<Warehouse | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addWarehouse({
      id: `WH-${Math.floor(10 + Math.random() * 90)}`,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      capacity: parseInt(formData.get("capacity") as string, 10),
      used: parseInt(formData.get("used") as string, 10) || 0,
      manager: formData.get("manager") as string,
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingWH) return
    const formData = new FormData(e.currentTarget)
    
    updateWarehouse(editingWH.id, {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      capacity: parseInt(formData.get("capacity") as string, 10),
      used: parseInt(formData.get("used") as string, 10) || 0,
      manager: formData.get("manager") as string,
    })
    setIsEditOpen(false)
    setEditingWH(null)
  }

  const openEdit = (wh: Warehouse) => {
    setEditingWH(wh)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Warehouses</CardTitle><CardDescription>Physical storage locations and capacity.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Warehouse</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add Warehouse</DialogTitle>
                    <DialogDescription>Register a new storage location.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Name</Label>
                      <Input name="name" required className="col-span-3" placeholder="e.g. South Hub" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Location</Label>
                      <Input name="location" required className="col-span-3" placeholder="e.g. Dallas, TX" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Manager</Label>
                      <Input name="manager" required className="col-span-3" placeholder="Manager Name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Capacity</Label>
                      <Input name="capacity" type="number" required className="col-span-3" placeholder="0" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Used</Label>
                      <Input name="used" type="number" defaultValue={0} required className="col-span-3" />
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
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {warehouses.map(wh => {
            const pct = wh.capacity > 0 ? Math.round((wh.used / wh.capacity) * 100) : 0
            return (
              <Card key={wh.id} className="border-border/50 relative">
                <CardHeader className="pb-2 pr-10">
                  <CardTitle className="text-base">{wh.name}</CardTitle>
                  <CardDescription>{wh.location} · {wh.manager}</CardDescription>
                  {canManage && (
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(wh)}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteWarehouse(wh.id)}>
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Capacity used</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct > 85 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{wh.used.toLocaleString()} units used</span>
                    <span>{wh.capacity.toLocaleString()} total</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {warehouses.length === 0 && (
            <div className="col-span-full text-center py-6 text-muted-foreground border rounded-lg bg-muted/20">
              No warehouses found.
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingWH && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Warehouse</DialogTitle>
                <DialogDescription>Update warehouse details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input name="name" required defaultValue={editingWH.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Location</Label>
                  <Input name="location" required defaultValue={editingWH.location} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Manager</Label>
                  <Input name="manager" required defaultValue={editingWH.manager} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Capacity</Label>
                  <Input name="capacity" type="number" required defaultValue={editingWH.capacity} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Used</Label>
                  <Input name="used" type="number" required defaultValue={editingWH.used} className="col-span-3" />
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
