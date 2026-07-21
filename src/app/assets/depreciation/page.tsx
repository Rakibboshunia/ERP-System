"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const depreciationSchedule = [
  { id: "AST-001", name: "Dell Server Rack", method: "Straight-Line", usefulLife: "5 Years", annualDep: "$3,600.00", accumulated: "$9,000.00", bookValue: "$9,000.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-002", name: "Company Van", method: "Declining Balance", usefulLife: "8 Years", annualDep: "$5,600.00", accumulated: "$11,200.00", bookValue: "$20,800.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-003", name: "CNC Machine X200", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$7,500.00", accumulated: "$26,250.00", bookValue: "$48,750.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-004", name: "Laptop Fleet (x20)", method: "Straight-Line", usefulLife: "3 Years", annualDep: "$13,333.00", accumulated: "$8,000.00", bookValue: "$32,000.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-005", name: "Office Furniture", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$1,200.00", accumulated: "$7,200.00", bookValue: "$4,800.00", lastUpdated: "Dec 31, 2025" },
]

export default function DepreciationPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Depreciation Schedule</CardTitle>
            <CardDescription>Annual depreciation values calculated per asset using their respective methods.</CardDescription>
          </div>
          {canManage && <Button size="sm" variant="outline">Run Depreciation</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Useful Life</TableHead>
              <TableHead className="text-right">Annual Dep.</TableHead>
              <TableHead className="text-right">Accumulated</TableHead>
              <TableHead className="text-right">Book Value</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depreciationSchedule.map(d => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                <TableCell className="font-semibold">{d.name}</TableCell>
                <TableCell><Badge variant="outline">{d.method}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{d.usefulLife}</TableCell>
                <TableCell className="text-right text-amber-600 font-medium">-{d.annualDep}</TableCell>
                <TableCell className="text-right text-rose-500 font-medium">-{d.accumulated}</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">{d.bookValue}</TableCell>
                <TableCell className="text-muted-foreground">{d.lastUpdated}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/30 font-bold border-t-2">
              <TableCell colSpan={4}>TOTALS</TableCell>
              <TableCell className="text-right text-amber-600">-$31,233/yr</TableCell>
              <TableCell className="text-right text-rose-500">-$61,650</TableCell>
              <TableCell className="text-right text-emerald-600">$114,350</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
