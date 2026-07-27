"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Branch } from "@/store/useStore"

export default function BranchesPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])
  const { branches, addBranch, updateBranch, deleteBranch } = useStore()
  const [isBranchOpen, setIsBranchOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingBranch, setEditingBranch] = React.useState<Branch | null>(null)

  const handleAddBranch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newBranch: Branch = {
      id: `BR-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      head: formData.get("head") as string,
      status: formData.get("status") as "Active" | "Inactive"
    }
    addBranch(newBranch)
    setIsBranchOpen(false)
  }

  const handleEditBranch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingBranch) return
    const formData = new FormData(e.currentTarget)
    updateBranch(editingBranch.id, {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      head: formData.get("head") as string,
      status: formData.get("status") as "Active" | "Inactive"
    })
    setIsEditOpen(false)
    setEditingBranch(null)
  }

  const openEdit = (branch: Branch) => {
    setEditingBranch(branch)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Branches</CardTitle>
            <CardDescription>Manage your company locations and branches.</CardDescription>
          </div>
          {isAdmin && (
            <Dialog open={isBranchOpen} onOpenChange={setIsBranchOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Branch</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddBranch}>
                  <DialogHeader><DialogTitle>Add New Branch</DialogTitle></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Branch Name</Label><Input name="name" required placeholder="e.g. West Coast Hub" /></div>
                    <div className="space-y-2"><Label>Location</Label><Input name="location" required placeholder="e.g. Los Angeles" /></div>
                    <div className="space-y-2"><Label>Branch Head</Label><Input name="head" required placeholder="e.g. John Doe" /></div>
                    <div className="space-y-2"><Label>Status</Label>
                      <Select name="status" defaultValue="Active">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter><Button type="button" variant="outline" onClick={() => setIsBranchOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Branch ID</TableHead><TableHead>Name</TableHead><TableHead>Location</TableHead><TableHead>Branch Head</TableHead><TableHead>Status</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
          </TableHeader>
          <TableBody>
            {branches.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No branches found.</TableCell></TableRow>
            ) : branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium text-xs text-muted-foreground">{branch.id}</TableCell>
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                <TableCell>{branch.head}</TableCell>
                <TableCell>
                  <Badge variant={branch.status === "Active" ? "default" : "secondary"} className={branch.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>
                    {branch.status}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(branch)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500" onClick={() => deleteBranch(branch.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
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

      {/* Edit Branch Dialog */}
      {isAdmin && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            {editingBranch && (
              <form onSubmit={handleEditBranch}>
                <DialogHeader><DialogTitle>Edit Branch</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2"><Label>Branch Name</Label><Input name="name" required defaultValue={editingBranch.name} /></div>
                  <div className="space-y-2"><Label>Location</Label><Input name="location" required defaultValue={editingBranch.location} /></div>
                  <div className="space-y-2"><Label>Branch Head</Label><Input name="head" required defaultValue={editingBranch.head} /></div>
                  <div className="space-y-2"><Label>Status</Label>
                    <Select name="status" defaultValue={editingBranch.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
                    </Select>
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
