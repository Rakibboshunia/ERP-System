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

export default function ExpensePage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  const expenses = useAccountingStore(state => state.expenses)
  const addExpense = useAccountingStore(state => state.addExpense)
  const updateExpenseStatus = useAccountingStore(state => state.updateExpenseStatus)
  const deleteExpense = useAccountingStore(state => state.deleteExpense)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    category: "Office Supplies",
    description: "",
    amount: "",
  })

  const handleAdd = () => {
    addExpense({
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      category: formData.category,
      description: formData.description,
      amount: formData.amount.startsWith("$") ? formData.amount : `$${formData.amount}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Paid",
    })
    setIsAddOpen(false)
    setFormData({ category: "Office Supplies", description: "", amount: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Expenses</CardTitle><CardDescription>All recorded business expenditures.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Expense</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Expense</DialogTitle>
                  <DialogDescription>Record a new expenditure entry.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Input id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="col-span-3" placeholder="Salaries / Software" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="col-span-3" placeholder="October Hosting" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Amount</Label>
                    <Input id="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="col-span-3" placeholder="450.00" />
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
              <TableHead>Exp. ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.id}</TableCell>
                <TableCell><Badge variant="outline">{e.category}</Badge></TableCell>
                <TableCell>{e.description}</TableCell>
                <TableCell className="text-muted-foreground">{e.date}</TableCell>
                <TableCell className="text-right font-bold text-rose-500">{e.amount}</TableCell>
                <TableCell>
                  <Badge variant={e.status === "Paid" ? "default" : "secondary"}
                    className={e.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                    {e.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateExpenseStatus(e.id, e.status === "Paid" ? "Pending" : "Paid")}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteExpense(e.id)}>
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
