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
import { Search, MoreHorizontal, Phone, Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Customer } from "@/store/useStore"

export default function CustomersPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])
  
  const [search, setSearch] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingCustomer, setEditingCustomer] = React.useState<Customer | null>(null)

  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore()

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newCustomer: Customer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as Customer["status"],
    }
    
    addCustomer(newCustomer)
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCustomer) return
    const formData = new FormData(e.currentTarget)
    
    updateCustomer(editingCustomer.id, {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as Customer["status"],
    })
    
    setIsEditOpen(false)
    setEditingCustomer(null)
  }

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/40 shadow-md card-3d-subtle mt-0 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>A comprehensive directory of your onboarded clients.</CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary/70" />
              <Input 
                type="search" 
                placeholder="Search customers..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/60 dark:bg-black/20 pl-9 rounded-xl border-border/60 focus:border-primary/50 transition-colors" 
              />
            </div>
            {canManageCRM && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl shrink-0"><Plus className="w-4 h-4 mr-2" />Add Customer</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>Enter the details for the new customer here.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name</Label>
                        <Input id="name" name="name" required placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" required placeholder="Acme Corp" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" required placeholder="+1 555-0100" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue="Active">
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button type="submit">Add Customer</Button>
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
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Status</TableHead>
              {canManageCRM && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell className="font-medium text-muted-foreground">{cust.id}</TableCell>
                <TableCell className="font-semibold">{cust.company}</TableCell>
                <TableCell>{cust.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Phone className="w-3.5 h-3.5 text-primary/60"/> {cust.phone}</span>
                    <span className="text-muted-foreground">{cust.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={cust.status === "Active" ? "default" : "secondary"} className={cust.status === "Active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 px-3 py-1 rounded-full shadow-sm" : "bg-slate-500/10 text-slate-600 border-slate-500/20 px-3 py-1 rounded-full shadow-sm"}>
                    {cust.status}
                  </Badge>
                </TableCell>
                  {canManageCRM && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => openEdit(cust)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCustomer(cust.id)} className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update the details for this customer.</DialogDescription>
          </DialogHeader>
          {editingCustomer && (
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Contact Name</Label>
                  <Input id="edit-name" name="name" defaultValue={editingCustomer.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input id="edit-company" name="company" defaultValue={editingCustomer.company} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" name="email" type="email" defaultValue={editingCustomer.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" name="phone" defaultValue={editingCustomer.phone} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="status" defaultValue={editingCustomer.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
