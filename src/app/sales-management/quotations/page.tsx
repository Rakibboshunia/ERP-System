"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const quotations = [
  { id: "QT-2001", customer: "Acme Corp", contact: "John Doe", items: 5, amount: "$12,400.00", validUntil: "Oct 30, 2026", status: "Sent" },
  { id: "QT-2002", customer: "LexCorp", contact: "Lex Luthor", items: 3, amount: "$8,750.00", validUntil: "Nov 05, 2026", status: "Draft" },
  { id: "QT-2003", customer: "Stark Industries", contact: "Pepper Potts", items: 12, amount: "$54,000.00", validUntil: "Oct 25, 2026", status: "Accepted" },
  { id: "QT-2004", customer: "Wayne Enterprises", contact: "Alfred Pennyworth", items: 2, amount: "$3,200.00", validUntil: "Oct 20, 2026", status: "Expired" },
]

export default function QuotationsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "sales_manager"])

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
              <Input type="search" placeholder="Search quotations..." className="pl-8" />
            </div>
            {canManage && <Button size="sm" variant="outline">Export</Button>}
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
              {canManage && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map(qt => (
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
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {qt.status === "Draft" && <Button size="sm" variant="outline">Send</Button>}
                      {qt.status === "Sent" && <Button size="sm" variant="outline">Convert to SO</Button>}
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
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
