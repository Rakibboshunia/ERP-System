"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAccountingStore } from "@/store/useAccountingStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function IncomePage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  const incomes = useAccountingStore(state => state.incomes)
  const addIncome = useAccountingStore(state => state.addIncome)
  const updateIncomeStatus = useAccountingStore(state => state.updateIncomeStatus)
  const deleteIncome = useAccountingStore(state => state.deleteIncome)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    source: "Product Sales",
    customer: "",
    amount: "",
  })

  const handleAdd = () => {
    addIncome({
      id: `INC-${Math.floor(200 + Math.random() * 800)}`,
      source: formData.source,
      customer: formData.customer,
      amount: formData.amount.startsWith("$") ? formData.amount : `$${formData.amount}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Received",
    })
    setIsAddOpen(false)
    setFormData({ source: "Product Sales", customer: "", amount: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Income</CardTitle><CardDescription>All recorded revenue streams and receipts.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Record Income</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Income</DialogTitle>
                  <DialogDescription>Add a new revenue entry into accounting.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="source" className="text-right">Source</Label>
                    <Input id="source" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="col-span-3" placeholder="Product Sales / Consulting" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">Customer</Label>
                    <Input id="customer" value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} className="col-span-3" placeholder="Acme Corp" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Amount</Label>
                    <Input id="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="col-span-3" placeholder="12400.00" />
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
              <TableHead>Inc. ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomes.map(inc => (
              <TableRow key={inc.id}>
                <TableCell className="font-medium">{inc.id}</TableCell>
                <TableCell><Badge variant="outline">{inc.source}</Badge></TableCell>
                <TableCell className="font-semibold">{inc.customer}</TableCell>
                <TableCell className="text-muted-foreground">{inc.date}</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">{inc.amount}</TableCell>
                <TableCell>
                  <Badge variant={inc.status === "Received" ? "default" : "secondary"}
                    className={inc.status === "Received" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                    {inc.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateIncomeStatus(inc.id, inc.status === "Received" ? "Pending" : "Received")}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteIncome(inc.id)}>
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
