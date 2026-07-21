"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Mail, Phone, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSupplierStore } from "@/store/useSupplierStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplierListPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const suppliers = useSupplierStore(state => state.suppliersList)
  const addSupplier = useSupplierStore(state => state.addSupplier)
  const updateSupplierStatus = useSupplierStore(state => state.updateSupplierStatus)
  const deleteSupplier = useSupplierStore(state => state.deleteSupplier)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    category: "",
  })
  const [search, setSearch] = React.useState("")

  const handleAdd = () => {
    addSupplier({
      id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      status: "Active"
    })
    setIsAddOpen(false)
    setFormData({ name: "", contact: "", email: "", phone: "", category: "" })
  }

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div><CardTitle>Supplier Directory</CardTitle><CardDescription>All registered vendors and supplier contacts.</CardDescription></div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search suppliers..." className="w-full bg-background pl-8" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {canManage && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Supplier</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Supplier</DialogTitle>
                    <DialogDescription>Add a new supplier to the directory.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Company</Label>
                      <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="Company Name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact" className="text-right">Contact Person</Label>
                      <Input id="contact" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="col-span-3" placeholder="Full Name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="col-span-3" placeholder="email@example.com" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">Phone</Label>
                      <Input id="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="col-span-3" placeholder="+1 (555) ..." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                      <Input id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="col-span-3" placeholder="Electronics, Logistics, etc." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAdd}>Save</Button>
                  </DialogFooter>
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
              <TableHead>Supplier ID</TableHead><TableHead>Company</TableHead><TableHead>Contact</TableHead>
              <TableHead>Category</TableHead><TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map(sup => (
              <TableRow key={sup.id}>
                <TableCell className="font-medium text-muted-foreground">{sup.id}</TableCell>
                <TableCell>
                  <div className="font-semibold">{sup.name}</div>
                  <div className="text-xs text-muted-foreground">{sup.contact}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {sup.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {sup.phone}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{sup.category}</Badge></TableCell>
                <TableCell>
                  <Badge variant={sup.status === "Active" ? "default" : "secondary"} className={sup.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>{sup.status}</Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateSupplierStatus(sup.id, sup.status === "Active" ? "Inactive" : "Active")}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteSupplier(sup.id)}>
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
