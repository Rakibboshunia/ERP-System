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
import { Search, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSalesStore, Quotation } from "@/store/useSalesStore"

export default function QuotationsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

  const quotations = useSalesStore(state => state.quotations)
  const addQuotation = useSalesStore(state => state.addQuotation)
  const updateQuotation = useSalesStore(state => state.updateQuotation)
  const deleteQuotation = useSalesStore(state => state.deleteQuotation)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingQT, setEditingQT] = React.useState<Quotation | null>(null)
  const [search, setSearch] = React.useState("")

  const filteredQuotations = quotations.filter(q => q.customer.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase()))

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addQuotation({
      id: `QT-${Math.floor(2000 + Math.random() * 900)}`,
      customer: formData.get("customer") as string,
      contact: formData.get("contact") as string,
      items: parseInt(formData.get("items") as string, 10) || 1,
      amount: `$${formData.get("amount")}`,
      validUntil: formData.get("validUntil") as string,
      status: formData.get("status") as Quotation["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingQT) return
    const formData = new FormData(e.currentTarget)
    
    updateQuotation(editingQT.id, {
      customer: formData.get("customer") as string,
      contact: formData.get("contact") as string,
      items: parseInt(formData.get("items") as string, 10) || 1,
      amount: `$${formData.get("amount")}`,
      validUntil: formData.get("validUntil") as string,
      status: formData.get("status") as Quotation["status"],
    })
    setIsEditOpen(false)
    setEditingQT(null)
  }

  const openEdit = (qt: Quotation) => {
    setEditingQT(qt)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Quotations</CardTitle>
            <CardDescription>Price proposals sent to prospective and existing customers.</CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search quotations..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {canManage && (
              <>
                <Button size="sm" variant="outline">Export</Button>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Quotation</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleAddSubmit}>
                      <DialogHeader>
                        <DialogTitle>New Quotation</DialogTitle>
                        <DialogDescription>Create a new price proposal.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Customer</Label>
                          <Input name="customer" required className="col-span-3" placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Contact</Label>
                          <Input name="contact" required className="col-span-3" placeholder="e.g. John Doe" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Items</Label>
                          <Input name="items" type="number" required defaultValue={1} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Amount</Label>
                          <Input name="amount" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Valid Until</Label>
                          <Input name="validUntil" required className="col-span-3" placeholder="e.g. Oct 30, 2026" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Status</Label>
                          <div className="col-span-3">
                            <Select name="status" required defaultValue="Draft">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Sent">Sent</SelectItem>
                                <SelectItem value="Accepted">Accepted</SelectItem>
                                <SelectItem value="Expired">Expired</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotations.map(qt => (
              <TableRow key={qt.id}>
                <TableCell className="font-medium">{qt.id}</TableCell>
                <TableCell className="font-semibold">{qt.customer}</TableCell>
                <TableCell className="text-muted-foreground">{qt.contact}</TableCell>
                <TableCell className="text-right">{qt.items}</TableCell>
                <TableCell className="text-right font-bold">{qt.amount}</TableCell>
                <TableCell className="text-muted-foreground">{qt.validUntil}</TableCell>
                <TableCell>
                  <Badge variant={
                    qt.status === "Accepted" ? "default" :
                    qt.status === "Expired" ? "destructive" :
                    qt.status === "Sent" ? "secondary" : "outline"
                  } className={
                    qt.status === "Accepted" ? "bg-emerald-500/10 text-emerald-600" :
                    qt.status === "Sent" ? "bg-blue-500/10 text-blue-600" :
                    qt.status === "Draft" ? "text-muted-foreground" : ""
                  }>
                    {qt.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(qt)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteQuotation(qt.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {filteredQuotations.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No quotations found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canManage && editingQT && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Quotation</DialogTitle>
                <DialogDescription>Update quotation details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Customer</Label>
                  <Input name="customer" required defaultValue={editingQT.customer} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Contact</Label>
                  <Input name="contact" required defaultValue={editingQT.contact} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Items</Label>
                  <Input name="items" type="number" required defaultValue={editingQT.items} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <Input name="amount" type="number" step="0.01" required defaultValue={editingQT.amount.replace('$', '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Valid Until</Label>
                  <Input name="validUntil" required defaultValue={editingQT.validUntil} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingQT.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
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
