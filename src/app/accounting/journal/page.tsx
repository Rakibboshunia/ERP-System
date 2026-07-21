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

export default function JournalPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  const journalEntries = useAccountingStore(state => state.journalEntries)
  const addJournalEntry = useAccountingStore(state => state.addJournalEntry)
  const updateJournalStatus = useAccountingStore(state => state.updateJournalStatus)
  const deleteJournalEntry = useAccountingStore(state => state.deleteJournalEntry)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    description: "",
    debit: "",
    credit: "",
    by: "Accountant",
  })

  const handleAdd = () => {
    addJournalEntry({
      id: `JE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: formData.description,
      debit: formData.debit.startsWith("$") ? formData.debit : `$${formData.debit}`,
      credit: formData.credit.startsWith("$") ? formData.credit : `$${formData.credit}`,
      by: formData.by,
      status: "Posted",
    })
    setIsAddOpen(false)
    setFormData({ description: "", debit: "", credit: "", by: "Accountant" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Journal Entries</CardTitle><CardDescription>Double-entry bookkeeping records.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Entry</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Journal Entry</DialogTitle>
                  <DialogDescription>Record a new double-entry transaction.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="col-span-3" placeholder="Revenue Recognition" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="debit" className="text-right">Debit</Label>
                    <Input id="debit" value={formData.debit} onChange={e => setFormData({ ...formData, debit: e.target.value })} className="col-span-3" placeholder="1000.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="credit" className="text-right">Credit</Label>
                    <Input id="credit" value={formData.credit} onChange={e => setFormData({ ...formData, credit: e.target.value })} className="col-span-3" placeholder="1000.00" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Entry</Button>
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
              <TableHead>Entry No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead>Posted By</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries.map(je => (
              <TableRow key={je.id}>
                <TableCell className="font-medium">{je.id}</TableCell>
                <TableCell className="text-muted-foreground">{je.date}</TableCell>
                <TableCell>{je.description}</TableCell>
                <TableCell className="text-right font-medium text-emerald-600">{je.debit}</TableCell>
                <TableCell className="text-right font-medium text-rose-500">{je.credit}</TableCell>
                <TableCell className="text-muted-foreground">{je.by}</TableCell>
                <TableCell>
                  <Badge variant={je.status === "Posted" ? "default" : "outline"}
                    className={je.status === "Posted" ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
                    {je.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateJournalStatus(je.id, je.status === "Posted" ? "Draft" : "Posted")}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteJournalEntry(je.id)}>
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
