"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAccountingStore, LedgerEntry } from "@/store/useAccountingStore"

export default function LedgerPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  const ledgerEntries = useAccountingStore(state => state.ledgerEntries)
  const addLedgerEntry = useAccountingStore(state => state.addLedgerEntry)
  const updateLedgerEntry = useAccountingStore(state => state.updateLedgerEntry)
  const deleteLedgerEntry = useAccountingStore(state => state.deleteLedgerEntry)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingEntry, setEditingEntry] = React.useState<LedgerEntry | null>(null)
  const [search, setSearch] = React.useState("")

  const filteredEntries = ledgerEntries.filter(e => e.description.toLowerCase().includes(search.toLowerCase()))

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addLedgerEntry({
      id: `LED-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: formData.get("description") as string,
      debit: formData.get("debit") ? `$${formData.get("debit")}` : "--",
      credit: formData.get("credit") ? `$${formData.get("credit")}` : "--",
      balance: `$${formData.get("balance")}`,
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingEntry) return
    const formData = new FormData(e.currentTarget)
    
    updateLedgerEntry(editingEntry.id, {
      description: formData.get("description") as string,
      debit: formData.get("debit") ? `$${formData.get("debit")}` : "--",
      credit: formData.get("credit") ? `$${formData.get("credit")}` : "--",
      balance: `$${formData.get("balance")}`,
    })
    setIsEditOpen(false)
    setEditingEntry(null)
  }

  const openEdit = (entry: LedgerEntry) => {
    setEditingEntry(entry)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>General Ledger</CardTitle><CardDescription>Cash account transaction history and running balance.</CardDescription></div>
          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter description..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {canManage && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Entry</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add Ledger Entry</DialogTitle>
                      <DialogDescription>Record a new transaction in the ledger.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Description</Label>
                        <Input name="description" required className="col-span-3" placeholder="e.g. Sales Revenue" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Debit</Label>
                        <Input name="debit" type="number" step="0.01" className="col-span-3" placeholder="0.00" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Credit</Label>
                        <Input name="credit" type="number" step="0.01" className="col-span-3" placeholder="0.00" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Balance</Label>
                        <Input name="balance" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Entry</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead><TableHead className="text-right">Balance</TableHead>{canManage && <TableHead className="text-right">Actions</TableHead>}</TableRow></TableHeader>
          <TableBody>
            {filteredEntries.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="text-muted-foreground">{e.date}</TableCell>
                <TableCell className="font-medium">{e.description}</TableCell>
                <TableCell className="text-right text-emerald-600 font-medium">{e.debit}</TableCell>
                <TableCell className="text-right text-rose-500 font-medium">{e.credit}</TableCell>
                <TableCell className="text-right font-bold">{e.balance}</TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(e)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteLedgerEntry(e.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {filteredEntries.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No ledger entries found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingEntry && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Ledger Entry</DialogTitle>
                <DialogDescription>Update ledger transaction details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <Input name="description" required defaultValue={editingEntry.description} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Debit</Label>
                  <Input name="debit" type="number" step="0.01" defaultValue={editingEntry.debit !== "--" ? editingEntry.debit.replace('$', '') : ""} className="col-span-3" placeholder="0.00" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Credit</Label>
                  <Input name="credit" type="number" step="0.01" defaultValue={editingEntry.credit !== "--" ? editingEntry.credit.replace('$', '') : ""} className="col-span-3" placeholder="0.00" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Balance</Label>
                  <Input name="balance" type="number" step="0.01" required defaultValue={editingEntry.balance.replace('$', '')} className="col-span-3" placeholder="0.00" />
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
