"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const categories = [
  { id: "CAT-01", name: "Electronics", description: "Computers, phones, and gadgets", products: 320, status: "Active" },
  { id: "CAT-02", name: "Furniture", description: "Office and home furniture", products: 85, status: "Active" },
  { id: "CAT-03", name: "Accessories", description: "Peripherals and add-ons", products: 210, status: "Active" },
]

export default function CategoriesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "inventory_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
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
  )
}
