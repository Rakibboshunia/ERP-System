"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Scan, Trash2, Plus, Minus, Printer, Percent, Tag, ShoppingCart, Search, X, CheckCircle } from "lucide-react"

type Product = { id: string; name: string; price: number; category: string; sku: string }
type CartItem = Product & { qty: number }

const catalog: Product[] = [
  { id: "P1", name: "Dell XPS 15", price: 1899, category: "Electronics", sku: "PRD-1001" },
  { id: "P2", name: "Wireless Keyboard", price: 129, category: "Accessories", sku: "PRD-1003" },
  { id: "P3", name: "USB-C Hub", price: 49, category: "Accessories", sku: "PRD-1004" },
  { id: "P4", name: "4K Monitor", price: 450, category: "Electronics", sku: "PRD-1005" },
  { id: "P5", name: "MacBook Pro M3", price: 2499, category: "Electronics", sku: "PRD-1006" },
  { id: "P6", name: "MX Master 3S", price: 99, category: "Accessories", sku: "PRD-1008" },
  { id: "P7", name: "Webcam HD", price: 79, category: "Accessories", sku: "PRD-1009" },
  { id: "P8", name: "Standing Desk", price: 699, category: "Furniture", sku: "PRD-1007" },
  { id: "P9", name: "Ergonomic Chair", price: 999, category: "Furniture", sku: "PRD-1002" },
  { id: "P10", name: "LED Desk Lamp", price: 45, category: "Accessories", sku: "PRD-1010" },
  { id: "P11", name: "AirPods Pro", price: 249, category: "Electronics", sku: "PRD-1011" },
  { id: "P12", name: "iPad Air", price: 749, category: "Electronics", sku: "PRD-1012" },
]

const TAX_RATE = 0.08

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [barcodeInput, setBarcodeInput] = useState("")
  const [search, setSearch] = useState("")
  const [discount, setDiscount] = useState("")
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent")
  const [receiptVisible, setReceiptVisible] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("All")
  const receiptRef = useRef<HTMLDivElement>(null)

  const categories = ["All", ...Array.from(new Set(catalog.map(p => p.category)))]

  const filteredProducts = catalog.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "All" || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const handleBarcode = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const found = catalog.find(p => p.sku.toLowerCase() === barcodeInput.toLowerCase())
      if (found) { addToCart(found); setBarcodeInput("") }
      else { alert(`No product found for SKU: ${barcodeInput}`); setBarcodeInput("") }
    }
  }

  const changeQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  const removeItem = (id: string) => setCart(prev => prev.filter(i => i.id !== id))

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountAmt = discount
    ? discountType === "percent" ? subtotal * (parseFloat(discount) / 100) : parseFloat(discount)
    : 0
  const taxable = Math.max(0, subtotal - discountAmt)
  const taxAmt = taxable * TAX_RATE
  const total = taxable + taxAmt
  const receiptNo = `RCP-${Date.now().toString().slice(-6)}`

  const handlePrint = () => {
    if (cart.length === 0) return
    setReceiptVisible(true)
    setTimeout(() => window.print(), 300)
  }

  const handleNewSale = () => {
    setCart([])
    setDiscount("")
    setBarcodeInput("")
    setReceiptVisible(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">POS Terminal</h1>
          <p className="text-muted-foreground text-sm">Point of Sale — scan or select products to add to cart.</p>
        </div>
        <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 px-3 py-1">● Terminal Active</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* LEFT — Product Browser */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Barcode Scanner */}
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <Scan className="w-5 h-5 text-muted-foreground shrink-0" />
                <Input
                  placeholder="Scan barcode or type SKU and press Enter (e.g. PRD-1001)"
                  value={barcodeInput}
                  onChange={e => setBarcodeInput(e.target.value)}
                  onKeyDown={handleBarcode}
                  className="font-mono"
                  autoFocus
                />
              </div>
            </CardContent>
          </Card>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <Button key={c} size="sm" variant={categoryFilter === c ? "default" : "outline"}
                  onClick={() => setCategoryFilter(c)} className="text-xs">
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="text-left p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-150 shadow-sm active:scale-95"
              >
                <div className="text-xs text-muted-foreground mb-1">{product.sku}</div>
                <div className="font-semibold text-sm leading-tight mb-2">{product.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">${product.price.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                </div>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-3 text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">No products found.</div>
            )}
          </div>
        </div>

        {/* RIGHT — Cart & Checkout */}
        <div className="lg:col-span-2 flex flex-col gap-4 sticky top-20">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingCart className="w-5 h-5" /> Cart
                {cart.length > 0 && <Badge className="ml-auto">{cart.reduce((s, i) => s + i.qty, 0)} items</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Cart Items */}
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
                    Cart is empty. Scan or click a product.
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price} each</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => changeQty(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                      <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => changeQty(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                    <span className="text-sm font-bold w-20 text-right shrink-0">${(item.price * item.qty).toLocaleString()}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500 shrink-0" onClick={() => removeItem(item.id)}><X className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>

              {/* Discount */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="flex items-center gap-2 text-sm font-medium"><Tag className="w-4 h-4" />Discount</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={discountType === "percent" ? "e.g. 10" : "e.g. 50"}
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    type="number"
                    min="0"
                    className="flex-1"
                  />
                  <Button
                    variant={discountType === "percent" ? "default" : "outline"}
                    size="sm" onClick={() => setDiscountType("percent")} className="px-3">
                    <Percent className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={discountType === "flat" ? "default" : "outline"}
                    size="sm" onClick={() => setDiscountType("flat")} className="px-3">
                    $
                  </Button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-2 border-t text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {discountAmt > 0 && <div className="flex justify-between text-emerald-600"><span>Discount {discountType === "percent" ? `(${discount}%)` : "(flat)"}</span><span>-${discountAmt.toFixed(2)}</span></div>}
                <div className="flex justify-between text-muted-foreground"><span>Tax (8%)</span><span>${taxAmt.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>TOTAL</span><span className="text-primary">${total.toFixed(2)}</span></div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <Button className="w-full h-11 text-base" onClick={handlePrint} disabled={cart.length === 0}>
                  <Printer className="w-4 h-4 mr-2" /> Charge & Print Receipt
                </Button>
                <Button variant="outline" className="w-full" onClick={handleNewSale} disabled={cart.length === 0}>
                  <X className="w-4 h-4 mr-2" /> Clear Sale
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Modal / Print Area */}
      {receiptVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-sm w-full p-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-lg flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" />Sale Complete</h2>
              <Button variant="ghost" size="icon" onClick={() => setReceiptVisible(false)}><X className="w-4 h-4" /></Button>
            </div>
            {/* Receipt Content */}
            <div ref={receiptRef} className="px-6 py-4 font-mono text-sm">
              <div className="text-center mb-4">
                <p className="font-bold text-lg">Enterprise ERP</p>
                <p className="text-muted-foreground text-xs">123 Innovation Drive, Tech City</p>
                <p className="text-muted-foreground text-xs">Tel: +1 (555) 123-4567</p>
                <p className="font-bold mt-2 text-xs">{receiptNo}</p>
                <p className="text-muted-foreground text-xs">{new Date().toLocaleString()}</p>
              </div>
              <div className="border-t border-dashed pt-3 mb-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between py-0.5">
                    <span className="flex-1 truncate pr-2">{item.name} x{item.qty}</span>
                    <span className="shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed pt-3 space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {discountAmt > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-${discountAmt.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span>Tax (8%)</span><span>${taxAmt.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base border-t border-dashed pt-2 mt-2"><span>TOTAL</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="text-center mt-4 text-xs text-muted-foreground">
                <p>★ Thank you for your purchase! ★</p>
                <p>Returns accepted within 30 days with receipt.</p>
              </div>
            </div>
            <div className="flex gap-2 px-6 pb-4">
              <Button className="flex-1" onClick={() => { window.print(); handleNewSale() }}><Printer className="w-4 h-4 mr-2" />Print</Button>
              <Button variant="outline" className="flex-1" onClick={handleNewSale}>New Sale</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
