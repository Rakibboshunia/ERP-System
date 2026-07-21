"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/store/useStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ReturnsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])
  const canApprove = hasPermission(["superadmin", "admin"])

  const returns = useStore(state => state.returns)
  const addReturn = useStore(state => state.addReturn)
  const updateReturnStatus = useStore(state => state.updateReturnStatus)
  const deleteReturn = useStore(state => state.deleteReturn)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    invoiceRef: "",
    customer: "",
    items: 1,
    reason: "",
    amount: "",
  })

  const handleAdd = () => {
    addReturn({
      id: `RMA-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceRef: formData.invoiceRef,
      customer: formData.customer,
      items: Number(formData.items),
      reason: formData.reason,
      amount: formData.amount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Pending"
    })
    setIsAddOpen(false)
    setFormData({ invoiceRef: "", customer: "", items: 1, reason: "", amount: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Return Management (RMA)</CardTitle>
            <CardDescription>Customer return requests and refund/replacement processing.</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Return</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Return Request</DialogTitle>
                  <DialogDescription>Create a new RMA for a customer return.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invoice" className="text-right">Invoice Ref</Label>
                    <Input id="invoice" value={formData.invoiceRef} onChange={e => setFormData({ ...formData, invoiceRef: e.target.value })} className="col-span-3" placeholder="INV-1234" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">Customer</Label>
                    <Input id="customer" value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} className="col-span-3" placeholder="Company Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="items" className="text-right">Items</Label>
                    <Input id="items" type="number" value={formData.items} onChange={e => setFormData({ ...formData, items: Number(e.target.value) })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">Reason</Label>
                    <Input id="reason" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} className="col-span-3" placeholder="Defective unit" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Refund Amt.</Label>
                    <Input id="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="col-span-3" placeholder="$0.00" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Return</Button>
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
              <TableHead>RMA No.</TableHead>
              <TableHead>Invoice Ref.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Refund Amt.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell className="text-primary text-xs">{r.invoiceRef}</TableCell>
                <TableCell className="font-semibold">{r.customer}</TableCell>
                <TableCell className="text-right">{r.items}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{r.reason}</TableCell>
                <TableCell className="text-right font-bold">{r.amount}</TableCell>
                <TableCell className="text-muted-foreground">{r.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    r.status === "Approved" ? "default" :
                    r.status === "Rejected" ? "destructive" : "secondary"
                  } className={
                    r.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                    r.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                  }>
                    {r.status}
                  </Badge>
                </TableCell>
                {canApprove && (
                  <TableCell className="text-right">
                    {r.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-500/30 hover:bg-emerald-50" onClick={() => updateReturnStatus(r.id, "Approved")}>Approve</Button>
                        <Button size="sm" variant="outline" className="text-rose-500 border-rose-500/30 hover:bg-rose-50" onClick={() => updateReturnStatus(r.id, "Rejected")}>Reject</Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteReturn(r.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
