"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const ledgerEntries = [
  { date: "Oct 01", description: "Opening Balance", debit: "--", credit: "--", balance: "$98,000.00" },
  { date: "Oct 05", description: "Sales – Acme Corp", debit: "$12,400.00", credit: "--", balance: "$110,400.00" },
  { date: "Oct 10", description: "Supplier Payment – TechParts", debit: "--", credit: "$14,200.00", balance: "$96,200.00" },
  { date: "Oct 17", description: "Sales – Stark Ind.", debit: "$54,000.00", credit: "--", balance: "$150,200.00" },
]

export default function LedgerPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>General Ledger</CardTitle><CardDescription>Cash account transaction history and running balance.</CardDescription></div>
          <div className="relative w-48"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Filter account..." className="pl-8" /></div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Debit</TableHead><TableHead className="text-right">Credit</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
          <TableBody>
            {ledgerEntries.map((e, i) => (
              <TableRow key={i}>
                <TableCell className="text-muted-foreground">{e.date}</TableCell>
                <TableCell className="font-medium">{e.description}</TableCell>
                <TableCell className="text-right text-emerald-600 font-medium">{e.debit}</TableCell>
                <TableCell className="text-right text-rose-500 font-medium">{e.credit}</TableCell>
                <TableCell className="text-right font-bold">{e.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
