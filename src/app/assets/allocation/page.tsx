"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAssetsStore } from "@/store/useAssetsStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AllocationPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const allocations = useAssetsStore(state => state.allocations)
  const addAllocation = useAssetsStore(state => state.addAllocation)
  const returnAllocation = useAssetsStore(state => state.returnAllocation)
  const deleteAllocation = useAssetsStore(state => state.deleteAllocation)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    asset: "",
    assetId: "",
    assignedTo: "",
    custodian: "",
    department: "",
  })

  const handleAdd = () => {
    addAllocation({
      id: `ALC-${Math.floor(10 + Math.random() * 90)}`,
      asset: formData.asset,
      assetId: formData.assetId || `AST-${Math.floor(100 + Math.random() * 900)}`,
      assignedTo: formData.assignedTo,
      custodian: formData.custodian,
      department: formData.department,
      allocatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      returnDate: "--",
      status: "Active",
    })
    setIsAddOpen(false)
    setFormData({ asset: "", assetId: "", assignedTo: "", custodian: "", department: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Track which assets are assigned to which employees or departments.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Allocate Asset</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Allocate Asset</DialogTitle>
                  <DialogDescription>Assign an asset to an employee or department.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset" className="text-right">Asset Name</Label>
                    <Input id="asset" value={formData.asset} onChange={e => setFormData({ ...formData, asset: e.target.value })} className="col-span-3" placeholder="Office Laptop Fleet" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assetId" className="text-right">Asset ID</Label>
                    <Input id="assetId" value={formData.assetId} onChange={e => setFormData({ ...formData, assetId: e.target.value })} className="col-span-3" placeholder="AST-004" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assignedTo" className="text-right">Assigned To</Label>
                    <Input id="assignedTo" value={formData.assignedTo} onChange={e => setFormData({ ...formData, assignedTo: e.target.value })} className="col-span-3" placeholder="Sales Team" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="custodian" className="text-right">Custodian</Label>
                    <Input id="custodian" value={formData.custodian} onChange={e => setFormData({ ...formData, custodian: e.target.value })} className="col-span-3" placeholder="Diana Prince" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">Department</Label>
                    <Input id="department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="col-span-3" placeholder="Sales" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save</Button>
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
              <TableHead>Allocation ID</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Custodian</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Allocated Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map(alc => (
              <TableRow key={alc.id}>
                <TableCell className="font-medium text-muted-foreground">{alc.id}</TableCell>
                <TableCell>
                  <div className="font-semibold">{alc.asset}</div>
                  <div className="text-xs text-muted-foreground font-mono">{alc.assetId}</div>
                </TableCell>
                <TableCell>{alc.assignedTo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {alc.custodian.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{alc.custodian}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{alc.department}</TableCell>
                <TableCell className="text-muted-foreground">{alc.allocatedDate}</TableCell>
                <TableCell className="text-muted-foreground">{alc.returnDate}</TableCell>
                <TableCell>
                  <Badge variant={alc.status === "Active" ? "default" : "secondary"}
                    className={alc.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
                    {alc.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    {alc.status === "Active" && (
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => returnAllocation(alc.id)}>Return</Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteAllocation(alc.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Record
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
    </Card>
  )
}
