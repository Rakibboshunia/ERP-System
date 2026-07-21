"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Product } from "@/store/useStore"

export default function ProductsPage() {
  const [search, setSearch] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const { products, addProduct, deleteProduct } = useStore()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const stock = Number(formData.get("stock"))
    const minStock = Number(formData.get("minStock"))
    let status: Product["status"] = "In Stock"
    if (stock === 0) status = "Out of Stock"
    else if (stock <= minStock) status = "Low Stock"

    const newProduct: Product = {
      id: `PRD-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      brand: formData.get("brand") as string,
      warehouse: formData.get("warehouse") as string,
      stock,
      minStock,
      price: `$${formData.get("price")}`,
      status
    }
    
    addProduct(newProduct)
    setIsAddOpen(false)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div><CardTitle>Products</CardTitle><CardDescription>Full product catalog (Live from Local Storage).</CardDescription></div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Filter products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
            </div>
            {canManage && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="default" className="shrink-0"><Plus className="w-4 h-4" /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleAddSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>Add a new product to your local persistent store.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2"><Label>Product Name</Label><Input name="name" required placeholder="e.g. Mechanical Keyboard" /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2"><Label>Category</Label>
                          <Select name="category" required defaultValue="Electronics">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Electronics">Electronics</SelectItem>
                              <SelectItem value="Furniture">Furniture</SelectItem>
                              <SelectItem value="Accessories">Accessories</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2"><Label>Brand</Label><Input name="brand" required placeholder="e.g. Logitech" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2"><Label>Price (USD)</Label><Input name="price" type="number" step="0.01" required placeholder="199.99" /></div>
                        <div className="grid gap-2"><Label>Warehouse</Label>
                          <Select name="warehouse" required defaultValue="Main WH">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Main WH">Main WH</SelectItem>
                              <SelectItem value="East Hub">East Hub</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2"><Label>Initial Stock</Label><Input name="stock" type="number" required defaultValue="0" /></div>
                        <div className="grid gap-2"><Label>Min Stock Alert</Label><Input name="minStock" type="number" required defaultValue="10" /></div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Product</Button>
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
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              {canManage && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No products found. Add one!</TableCell></TableRow>
            ) : filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id}</div>
                </TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.warehouse}</TableCell>
                <TableCell className="text-right font-medium">{p.stock}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "In Stock" ? "default" : p.status === "Low Stock" ? "secondary" : "destructive"}
                    className={p.status === "Low Stock" ? "bg-amber-500/10 text-amber-600" : p.status === "In Stock" ? "bg-emerald-500/10 text-emerald-600" : ""}>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{p.price}</TableCell>
                {canManage && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deleteProduct(p.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
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
