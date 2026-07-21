"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const trialBalance = [
  { account: "Cash & Cash Equivalents", debit: "$124,500.00", credit: "--" },
  { account: "Accounts Receivable", debit: "$45,231.00", credit: "--" },
  { account: "Inventory", debit: "$320,000.00", credit: "--" },
  { account: "Accounts Payable", debit: "--", credit: "$33,700.00" },
  { account: "Owner's Equity", debit: "--", credit: "$400,000.00" },
  { account: "Sales Revenue", debit: "--", credit: "$512,000.00" },
  { account: "COGS", debit: "$210,000.00", credit: "--" },
  { account: "Salaries Expense", debit: "$124,500.00", credit: "--" },
]

export default function TrialBalancePage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin", "accountant"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Trial Balance</CardTitle><CardDescription>Summary of all account debits and credits to verify balancing.</CardDescription></div>
          {canManage && <Button size="sm" variant="outline">Export PDF</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Account Name</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead></TableRow></TableHeader>
          <TableBody>
            {trialBalance.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.account}</TableCell>
                <TableCell className="text-right font-medium text-emerald-600">{t.debit}</TableCell>
                <TableCell className="text-right font-medium text-rose-500">{t.credit}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2 font-bold bg-muted/30">
              <TableCell>TOTAL</TableCell>
              <TableCell className="text-right text-emerald-600">$824,231.00</TableCell>
              <TableCell className="text-right text-rose-500">$945,700.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
