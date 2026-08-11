"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAssetsStore, DepreciationSchedule } from "@/store/useAssetsStore"

export default function DepreciationPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const schedule = useAssetsStore(state => state.depreciationSchedules)
  const addDepreciation = useAssetsStore(state => state.addDepreciation)
  const updateDepreciation = useAssetsStore(state => state.updateDepreciation)
  const deleteDepreciation = useAssetsStore(state => state.deleteDepreciation)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingDep, setEditingDep] = React.useState<DepreciationSchedule | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addDepreciation({
      id: `AST-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.get("name") as string,
      method: formData.get("method") as string,
      usefulLife: formData.get("usefulLife") as string,
      annualDep: `$${formData.get("annualDep")}`,
      accumulated: `$${formData.get("accumulated")}`,
      bookValue: `$${formData.get("bookValue")}`,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingDep) return
    const formData = new FormData(e.currentTarget)
    
    updateDepreciation(editingDep.id, {
      name: formData.get("name") as string,
      method: formData.get("method") as string,
      usefulLife: formData.get("usefulLife") as string,
      annualDep: `$${formData.get("annualDep")}`,
      accumulated: `$${formData.get("accumulated")}`,
      bookValue: `$${formData.get("bookValue")}`,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    })
    setIsEditOpen(false)
    setEditingDep(null)
  }

  const openEdit = (dep: DepreciationSchedule) => {
    setEditingDep(dep)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Depreciation Schedule</CardTitle>
            <CardDescription>Annual depreciation values calculated per asset using their respective methods.</CardDescription>
          </div>
          {canManage && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Run Depreciation</Button>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Record</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add Depreciation Record</DialogTitle>
                      <DialogDescription>Manually add an asset's depreciation.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Asset Name</Label>
                        <Input name="name" required className="col-span-3" placeholder="e.g. Dell Server Rack" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Method</Label>
                        <Input name="method" required className="col-span-3" defaultValue="Straight-Line" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Useful Life</Label>
                        <Input name="usefulLife" required className="col-span-3" placeholder="e.g. 5 Years" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Annual Dep.</Label>
                        <Input name="annualDep" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Accumulated</Label>
                        <Input name="accumulated" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Book Value</Label>
                        <Input name="bookValue" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Useful Life</TableHead>
              <TableHead className="text-right">Annual Dep.</TableHead>
              <TableHead className="text-right">Accumulated</TableHead>
              <TableHead className="text-right">Book Value</TableHead>
              <TableHead>Last Updated</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map(d => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                <TableCell className="font-semibold">{d.name}</TableCell>
                <TableCell><Badge variant="outline">{d.method}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{d.usefulLife}</TableCell>
                <TableCell className="text-right text-amber-600 font-medium">-{d.annualDep}</TableCell>
                <TableCell className="text-right text-rose-500 font-medium">-{d.accumulated}</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">{d.bookValue}</TableCell>
                <TableCell className="text-muted-foreground">{d.lastUpdated}</TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(d)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteDepreciation(d.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {schedule.length === 0 && (
              <TableRow><TableCell colSpan={9} className="text-center py-6 text-muted-foreground">No records found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingDep && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Depreciation</DialogTitle>
                <DialogDescription>Update values for {editingDep.name}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Asset Name</Label>
                  <Input name="name" required defaultValue={editingDep.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Method</Label>
                  <Input name="method" required defaultValue={editingDep.method} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Useful Life</Label>
                  <Input name="usefulLife" required defaultValue={editingDep.usefulLife} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Annual Dep.</Label>
                  <Input name="annualDep" type="number" step="0.01" required defaultValue={editingDep.annualDep.replace('$', '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Accumulated</Label>
                  <Input name="accumulated" type="number" step="0.01" required defaultValue={editingDep.accumulated.replace('$', '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Book Value</Label>
                  <Input name="bookValue" type="number" step="0.01" required defaultValue={editingDep.bookValue.replace('$', '')} className="col-span-3" />
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
