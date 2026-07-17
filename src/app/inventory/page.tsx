"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Package, Tag, Award, Warehouse, ArrowRightLeft, SlidersHorizontal, Scan, AlertTriangle, Plus, Search, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Product } from "@/store/useStore"

const categories = [
  { id: "CAT-01", name: "Electronics", description: "Computers, phones, and gadgets", products: 320, status: "Active" },
  { id: "CAT-02", name: "Furniture", description: "Office and home furniture", products: 85, status: "Active" },
  { id: "CAT-03", name: "Accessories", description: "Peripherals and add-ons", products: 210, status: "Active" },
]

const brands = [
  { id: "BRD-01", name: "Apple", country: "USA", products: 48, status: "Active" },
  { id: "BRD-02", name: "Dell", country: "USA", products: 62, status: "Active" },
  { id: "BRD-03", name: "Logitech", country: "Switzerland", products: 77, status: "Active" },
]

const warehouses = [
  { id: "WH-01", name: "Main Warehouse", location: "Tech City", capacity: 5000, used: 3800, manager: "Tom Riley" },
  { id: "WH-02", name: "East Hub", location: "New York", capacity: 2000, used: 1100, manager: "Sara Kim" },
]

const transfers = [
  { id: "TRF-201", product: "Dell XPS 15", from: "Main WH", to: "East Hub", qty: 10, date: "Oct 16, 2026", status: "Completed" },
]

const adjustments = [
  { id: "ADJ-101", product: "USB-C Hub", type: "Damage Write-off", qty: -5, reason: "Found damaged in storage", date: "Oct 15, 2026", by: "Inv. Manager" },
]

export default function InventoryPage() {
  const [search, setSearch] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  const { products, addProduct, deleteProduct } = useStore()

  const lowStockItems = products.filter(p => p.stock <= p.minStock)
  const outOfStockCount = products.filter(p => p.stock === 0).length

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Manage products, warehouses, stock levels, and movements.</p>
        </div>
        {canManage && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
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

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><Package className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Total Products</p><p className="text-2xl font-bold">{products.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><Warehouse className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Warehouses</p><p className="text-2xl font-bold">{warehouses.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Low Stock Alerts</p><p className="text-2xl font-bold text-amber-500">{lowStockItems.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-rose-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-rose-500/10 p-2 rounded-full"><Package className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-muted-foreground">Out of Stock</p><p className="text-2xl font-bold text-rose-500">{outOfStockCount}</p></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto mb-6">
          <TabsTrigger value="products" className="py-2 text-xs flex items-center gap-1"><Package className="w-3.5 h-3.5 hidden sm:inline" />Products</TabsTrigger>
          <TabsTrigger value="categories" className="py-2 text-xs flex items-center gap-1"><Tag className="w-3.5 h-3.5 hidden sm:inline" />Categories</TabsTrigger>
          <TabsTrigger value="warehouse" className="py-2 text-xs flex items-center gap-1"><Warehouse className="w-3.5 h-3.5 hidden sm:inline" />Warehouse</TabsTrigger>
          <TabsTrigger value="lowstock" className="py-2 text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 hidden sm:inline" />Low Stock</TabsTrigger>
        </TabsList>

        {/* Products */}
        <TabsContent value="products">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div><CardTitle>Products</CardTitle><CardDescription>Full product catalog (Live from Local Storage).</CardDescription></div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Filter products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
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
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Categories</CardTitle><CardDescription>Product classification groups.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Category</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Products</TableHead><TableHead>Status</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="text-muted-foreground text-xs">{c.id}</TableCell>
                      <TableCell className="font-semibold">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground">{c.description}</TableCell>
                      <TableCell className="text-right">{c.products}</TableCell>
                      <TableCell><Badge variant="default" className="bg-emerald-500/10 text-emerald-600">{c.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warehouse */}
        <TabsContent value="warehouse">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Warehouses</CardTitle><CardDescription>Physical storage locations and capacity.</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {warehouses.map(wh => {
                  const pct = Math.round((wh.used / wh.capacity) * 100)
                  return (
                    <Card key={wh.id} className="border-border/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{wh.name}</CardTitle>
                        <CardDescription>{wh.location} · {wh.manager}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Capacity used</span>
                          <span className="font-semibold">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct > 85 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{wh.used.toLocaleString()} units used</span>
                          <span>{wh.capacity.toLocaleString()} total</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Low Stock Alert */}
        <TabsContent value="lowstock">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Low Stock Alerts</CardTitle>
                  <CardDescription>{lowStockItems.length} items are at or below their minimum stock threshold.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Warehouse</TableHead>
                    <TableHead className="text-right">Current Stock</TableHead><TableHead className="text-right">Min. Required</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItems.map(p => {
                    const severity = p.stock === 0 ? "Critical" : p.stock <= p.minStock / 2 ? "High" : "Low"
                    return (
                      <TableRow key={p.id} className={p.stock === 0 ? "bg-rose-500/5" : "bg-amber-500/5"}>
                        <TableCell>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.id}</div>
                        </TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>{p.warehouse}</TableCell>
                        <TableCell className={`text-right font-bold ${p.stock === 0 ? "text-rose-500" : "text-amber-500"}`}>{p.stock}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{p.minStock}</TableCell>
                        <TableCell>
                          <Badge variant={severity === "Critical" ? "destructive" : "default"}
                            className={severity === "High" ? "bg-amber-500/10 text-amber-600" : severity === "Low" ? "bg-yellow-500/10 text-yellow-600" : ""}>
                            {severity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
