"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"

const contracts = [
  { id: "CTR-101", title: "Enterprise Service Agreement", party: "Acme Corp", validUntil: "Dec 31, 2027", status: "Active" },
  { id: "CTR-102", title: "Vendor Supply Contract", party: "TechParts Inc.", validUntil: "Jun 30, 2026", status: "Expired" },
  { id: "CTR-103", title: "Software Licensing", party: "Microsoft", validUntil: "Mar 15, 2028", status: "Active" },
  { id: "CTR-104", title: "Office Lease Agreement", party: "City Real Estate", validUntil: "Jan 01, 2030", status: "Active" },
]

export default function ContractsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Contracts</CardTitle><CardDescription>Legal agreements and vendor contracts.</CardDescription></div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Contract</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Contract ID</TableHead><TableHead>Title</TableHead><TableHead>Party / Vendor</TableHead><TableHead>Valid Until</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {contracts.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                <TableCell className="font-semibold">{c.title}</TableCell>
                <TableCell>{c.party}</TableCell>
                <TableCell className="text-muted-foreground">{c.validUntil}</TableCell>
                <TableCell>
                  <Badge variant={c.status === "Active" ? "default" : "destructive"} className={c.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>{c.status}</Badge>
                </TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
