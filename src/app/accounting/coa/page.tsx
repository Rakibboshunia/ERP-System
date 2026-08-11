"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAccountingStore, Account } from "@/store/useAccountingStore"

export default function CoaPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  const accounts = useAccountingStore(state => state.accounts)
  const addAccount = useAccountingStore(state => state.addAccount)
  const updateAccount = useAccountingStore(state => state.updateAccount)
  const deleteAccount = useAccountingStore(state => state.deleteAccount)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingAccount, setEditingAccount] = React.useState<Account | null>(null)

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addAccount({
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      type: formData.get("type") as Account["type"],
      balance: `$${formData.get("balance")}`,
      status: formData.get("status") as Account["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingAccount) return
    const formData = new FormData(e.currentTarget)
    
    updateAccount(editingAccount.code, {
      name: formData.get("name") as string,
      type: formData.get("type") as Account["type"],
      balance: `$${formData.get("balance")}`,
      status: formData.get("status") as Account["status"],
    })
    setIsEditOpen(false)
    setEditingAccount(null)
  }

  const openEdit = (account: Account) => {
    setEditingAccount(account)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Chart of Accounts</CardTitle><CardDescription>Master list of all financial accounts.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Account</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add Account</DialogTitle>
                    <DialogDescription>Create a new account in the Chart of Accounts.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Code</Label>
                      <Input name="code" required className="col-span-3" placeholder="e.g. 1000" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Account Name</Label>
                      <Input name="name" required className="col-span-3" placeholder="e.g. Cash" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Type</Label>
                      <div className="col-span-3">
                        <Select name="type" required defaultValue="Asset">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asset">Asset</SelectItem>
                            <SelectItem value="Liability">Liability</SelectItem>
                            <SelectItem value="Equity">Equity</SelectItem>
                            <SelectItem value="Income">Income</SelectItem>
                            <SelectItem value="Expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Balance</Label>
                      <Input name="balance" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div className="col-span-3">
                        <Select name="status" required defaultValue="Active">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                    <Button type="submit">Save Account</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Account Name</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Status</TableHead>{canManage && <TableHead className="text-right">Actions</TableHead>}</TableRow></TableHeader>
          <TableBody>
            {accounts.map(a => (
              <TableRow key={a.code}>
                <TableCell className="font-mono text-muted-foreground">{a.code}</TableCell>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    a.type === "Asset" ? "text-blue-500 border-blue-500/30" :
                    a.type === "Liability" ? "text-rose-500 border-rose-500/30" :
                    a.type === "Income" ? "text-emerald-500 border-emerald-500/30" :
                    a.type === "Expense" ? "text-amber-500 border-amber-500/30" : ""
                  }>{a.type}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{a.balance}</TableCell>
                <TableCell><Badge variant={a.status === "Active" ? "default" : "secondary"} className={a.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>{a.status}</Badge></TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(a)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteAccount(a.code)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {accounts.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No accounts found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingAccount && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Account</DialogTitle>
                <DialogDescription>Update account details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Code</Label>
                  <Input name="code" disabled defaultValue={editingAccount.code} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Account Name</Label>
                  <Input name="name" required defaultValue={editingAccount.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <div className="col-span-3">
                    <Select name="type" required defaultValue={editingAccount.type}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asset">Asset</SelectItem>
                        <SelectItem value="Liability">Liability</SelectItem>
                        <SelectItem value="Equity">Equity</SelectItem>
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Balance</Label>
                  <Input name="balance" type="number" step="0.01" required defaultValue={editingAccount.balance.replace('$', '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingAccount.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
