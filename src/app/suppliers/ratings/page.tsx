"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Plus, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, SupplierRating } from "@/store/useStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
      ))}
      <span className="text-xs font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function SupplierRatingsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const ratings = useStore(state => state.supplierRatings)
  const addSupplierRating = useStore(state => state.addSupplierRating)
  const updateSupplierRating = useStore(state => state.updateSupplierRating)
  const deleteSupplierRating = useStore(state => state.deleteSupplierRating)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingRating, setEditingRating] = React.useState<SupplierRating | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    onTime: 100,
    quality: 5.0,
    responseTime: "",
    returns: 0.0,
  })

  const handleAdd = () => {
    addSupplierRating({
      id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      onTime: Number(formData.onTime),
      quality: Number(formData.quality),
      responseTime: formData.responseTime,
      returns: Number(formData.returns),
      overall: Number(((Number(formData.quality) + (formData.onTime / 20)) / 2).toFixed(1))
    })
    setIsAddOpen(false)
    setFormData({ name: "", onTime: 100, quality: 5.0, responseTime: "", returns: 0.0 })
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingRating) return
    const fd = new FormData(e.currentTarget)
    updateSupplierRating(editingRating.id, {
      name: fd.get("name") as string,
      onTime: Number(fd.get("onTime")),
      quality: Number(fd.get("quality")),
      responseTime: fd.get("responseTime") as string,
      returns: Number(fd.get("returns")),
      overall: Number(((Number(fd.get("quality")) + (Number(fd.get("onTime")) / 20)) / 2).toFixed(1))
    })
    setIsEditOpen(false)
    setEditingRating(null)
  }

  const openEdit = (rating: SupplierRating) => {
    setEditingRating(rating)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Supplier Ratings</CardTitle>
            <CardDescription>Performance metrics and quality evaluations per supplier.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Rating</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Supplier Rating</DialogTitle>
                  <DialogDescription>Record performance metrics for a supplier.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Supplier</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="Company Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="onTime" className="text-right">On-Time %</Label>
                    <Input id="onTime" type="number" max="100" value={formData.onTime} onChange={e => setFormData({ ...formData, onTime: Number(e.target.value) })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quality" className="text-right">Quality (1-5)</Label>
                    <Input id="quality" type="number" step="0.1" max="5" value={formData.quality} onChange={e => setFormData({ ...formData, quality: Number(e.target.value) })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="responseTime" className="text-right">Response Time</Label>
                    <Input id="responseTime" value={formData.responseTime} onChange={e => setFormData({ ...formData, responseTime: e.target.value })} className="col-span-3" placeholder="< 2 hours" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="returns" className="text-right">Return Rate %</Label>
                    <Input id="returns" type="number" step="0.1" value={formData.returns} onChange={e => setFormData({ ...formData, returns: Number(e.target.value) })} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Rating</Button>
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
              <TableHead>Supplier</TableHead>
              <TableHead>On-Time Delivery</TableHead>
              <TableHead>Quality Score</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Return Rate</TableHead>
              <TableHead>Overall Rating</TableHead>
              {canManage && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-semibold">{r.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.onTime >= 90 ? "bg-emerald-500" : r.onTime >= 75 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${r.onTime}%` }} />
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
                <TableCell><StarRating rating={r.overall} /></TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(r)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteSupplierRating(r.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Rating Dialog */}
      {canManage && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            {editingRating && (
              <form onSubmit={handleEdit}>
                <DialogHeader>
                  <DialogTitle>Edit Supplier Rating</DialogTitle>
                  <DialogDescription>Update performance metrics.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Supplier</Label>
                    <Input id="edit-name" name="name" defaultValue={editingRating.name} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-onTime" className="text-right">On-Time %</Label>
                    <Input id="edit-onTime" name="onTime" type="number" max="100" defaultValue={editingRating.onTime} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-quality" className="text-right">Quality (1-5)</Label>
                    <Input id="edit-quality" name="quality" type="number" step="0.1" max="5" defaultValue={editingRating.quality} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-responseTime" className="text-right">Response Time</Label>
                    <Input id="edit-responseTime" name="responseTime" defaultValue={editingRating.responseTime} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-returns" className="text-right">Return Rate %</Label>
                    <Input id="edit-returns" name="returns" type="number" step="0.1" defaultValue={editingRating.returns} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
