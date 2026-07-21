"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const customers = [
  { id: "CUST-001", name: "Acme Corp", contact: "John Doe", email: "john@acme.corp", phone: "+1 (555) 123-4567", status: "Active" },
  { id: "CUST-002", name: "Stark Industries", contact: "Tony Stark", email: "tony@stark.com", phone: "+1 (555) 987-6543", status: "Active" },
  { id: "CUST-003", name: "Wayne Enterprises", contact: "Bruce Wayne", email: "bruce@wayne.com", phone: "+1 (555) 555-5555", status: "Inactive" },
]

export default function CustomersPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>A comprehensive directory of your onboarded clients.</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="w-full bg-background pl-8" />
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
            {customers.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell className="font-medium text-muted-foreground">{cust.id}</TableCell>
                <TableCell className="font-semibold">{cust.name}</TableCell>
                <TableCell>{cust.contact}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3"/> {cust.phone}</span>
                    <span className="text-muted-foreground">{cust.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={cust.status === "Active" ? "default" : "secondary"} className={cust.status === "Active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}>
                    {cust.status}
                  </Badge>
                </TableCell>
                {canManageCRM && (
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
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
