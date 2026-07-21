"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const accounts = [
  { code: "1000", name: "Cash & Cash Equivalents", type: "Asset", balance: "$124,500.00", status: "Active" },
  { code: "1100", name: "Accounts Receivable", type: "Asset", balance: "$45,231.00", status: "Active" },
  { code: "1500", name: "Inventory", type: "Asset", balance: "$320,000.00", status: "Active" },
  { code: "2000", name: "Accounts Payable", type: "Liability", balance: "$33,700.00", status: "Active" },
  { code: "3000", name: "Owner's Equity", type: "Equity", balance: "$400,000.00", status: "Active" },
  { code: "4000", name: "Sales Revenue", type: "Income", balance: "$512,000.00", status: "Active" },
  { code: "5000", name: "Cost of Goods Sold", type: "Expense", balance: "$210,000.00", status: "Active" },
  { code: "5100", name: "Salaries Expense", type: "Expense", balance: "$124,500.00", status: "Active" },
]

export default function CoaPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Chart of Accounts</CardTitle><CardDescription>Master list of all financial accounts.</CardDescription></div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Account</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Account Name</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {accounts.map(a => (
              <TableRow key={a.code}>
                <TableCell className="font-mono text-muted-foreground">{a.code}</TableCell>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    a.type === "Asset" ? "text-blue-500 border-blue-500/30" :
                    a.type === "Liability" ? "text-rose-500 border-rose-500/30" :
                    a.type === "Income" ? "text-emerald-500 border-emerald-500/30" :
                    a.type === "Expense" ? "text-amber-500 border-amber-500/30" : ""
                  }>{a.type}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{a.balance}</TableCell>
                <TableCell><Badge className="bg-emerald-500/10 text-emerald-600">{a.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
