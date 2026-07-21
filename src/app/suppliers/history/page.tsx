"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSupplierStore } from "@/store/useSupplierStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplierHistoryPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const history = useSupplierStore(state => state.purchaseHistory)
  const addHistory = useSupplierStore(state => state.addPurchaseHistory)
  const updateStatus = useSupplierStore(state => state.updatePurchaseStatus)
  const deleteHistory = useSupplierStore(state => state.deletePurchaseHistory)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    supplier: "",
    items: 1,
    total: "",
  })

  const handleAdd = () => {
    addHistory({
      id: `PO-${Math.floor(4000 + Math.random() * 1000)}`,
      supplier: formData.supplier,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: Number(formData.items),
      total: formData.total,
      status: "Pending"
    })
    setIsAddOpen(false)
    setFormData({ supplier: "", items: 1, total: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>Full log of all purchase orders placed with suppliers.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New PO</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Purchase Order</DialogTitle>
                  <DialogDescription>Add a new purchase record to history.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplier" className="text-right">Supplier</Label>
                    <Input id="supplier" value={formData.supplier} onChange={e => setFormData({ ...formData, supplier: e.target.value })} className="col-span-3" placeholder="Company Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="items" className="text-right">Items</Label>
                    <Input id="items" type="number" value={formData.items} onChange={e => setFormData({ ...formData, items: Number(e.target.value) })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="total" className="text-right">Total Amount</Label>
                    <Input id="total" value={formData.total} onChange={e => setFormData({ ...formData, total: e.target.value })} className="col-span-3" placeholder="$0.00" />
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
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map(po => (
              <TableRow key={po.id}>
                <TableCell className="font-medium">{po.id}</TableCell>
                <TableCell>{po.supplier}</TableCell>
                <TableCell className="text-muted-foreground">{po.date}</TableCell>
                <TableCell>{po.items}</TableCell>
                <TableCell className="font-bold">{po.total}</TableCell>
                <TableCell>
                  <Badge variant={po.status === "Received" ? "default" : po.status === "Pending" ? "secondary" : "destructive"}
                    className={po.status === "Received" ? "bg-emerald-500/10 text-emerald-600" : po.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""}>
                    {po.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {po.status === "Pending" && (
                          <DropdownMenuItem onClick={() => updateStatus(po.id, "Received")}>
                            <Edit className="mr-2 h-4 w-4" /> Mark Received
                          </DropdownMenuItem>
                        )}
                        {po.status === "Pending" && (
                          <DropdownMenuItem onClick={() => updateStatus(po.id, "Cancelled")}>
                            <Edit className="mr-2 h-4 w-4" /> Cancel Order
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteHistory(po.id)}>
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
