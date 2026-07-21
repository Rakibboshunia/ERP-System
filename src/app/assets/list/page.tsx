"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAssetsStore, Asset } from "@/store/useAssetsStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const conditionColor = (c: string) =>
  c === "Good" ? "text-emerald-500 border-emerald-500/30" :
  c === "Fair" ? "text-amber-500 border-amber-500/30" :
  "text-rose-500 border-rose-500/30"

export default function AssetListPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const assets = useAssetsStore(state => state.assets)
  const addAsset = useAssetsStore(state => state.addAsset)
  const updateAssetStatus = useAssetsStore(state => state.updateAssetStatus)
  const deleteAsset = useAssetsStore(state => state.deleteAsset)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    category: "IT Equipment",
    cost: "",
    location: "Headquarters",
    condition: "Good" as Asset["condition"],
  })

  const handleAdd = () => {
    addAsset({
      id: `AST-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      category: formData.category,
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      cost: formData.cost.startsWith("$") ? formData.cost : `$${formData.cost}`,
      currentValue: formData.cost.startsWith("$") ? formData.cost : `$${formData.cost}`,
      location: formData.location,
      condition: formData.condition,
      status: "In Use",
    })
    setIsAddOpen(false)
    setFormData({ name: "", category: "IT Equipment", cost: "", location: "Headquarters", condition: "Good" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Company Assets</CardTitle>
            <CardDescription>Full register of all physical and digital assets owned by the company.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Asset</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Asset</DialogTitle>
                  <DialogDescription>Register a new company asset.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="Dell Server Rack" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Input id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="col-span-3" placeholder="IT Equipment / Machinery" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cost" className="text-right">Cost</Label>
                    <Input id="cost" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} className="col-span-3" placeholder="18000.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input id="location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="col-span-3" placeholder="Main WH" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Asset</Button>
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
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                <TableCell className="font-semibold">{a.name}</TableCell>
                <TableCell><Badge variant="outline">{a.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{a.purchaseDate}</TableCell>
                <TableCell className="text-right">{a.cost}</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">{a.currentValue}</TableCell>
                <TableCell className="text-muted-foreground">{a.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={conditionColor(a.condition)}>{a.condition}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={a.status === "In Use" ? "default" : a.status === "Allocated" ? "secondary" : "outline"}
                    className={a.status === "In Use" ? "bg-emerald-500/10 text-emerald-600" :
                      a.status === "Allocated" ? "bg-blue-500/10 text-blue-600" :
                      "bg-amber-500/10 text-amber-600"}>
                    {a.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateAssetStatus(a.id, a.status === "In Use" ? "Allocated" : a.status === "Allocated" ? "Under Maintenance" : "In Use")}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteAsset(a.id)}>
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
    </Card>
  )
}
