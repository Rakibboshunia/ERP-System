"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const payrollRecords = [
  { id: "PR-10", period: "September 2026", status: "Processed", total: "$124,500.00", date: "Oct 01, 2026" },
  { id: "PR-11", period: "October 2026", status: "Draft", total: "$126,800.00", date: "Pending" },
]

export default function PayrollPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Payroll Runs</CardTitle><CardDescription>Manage monthly salary processing batches.</CardDescription></div>
          <Button size="sm">Run Payroll</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Batch ID</TableHead><TableHead>Period</TableHead><TableHead>Total Amount</TableHead><TableHead>Processing Date</TableHead><TableHead>Status</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {payrollRecords.map((pr) => (
              <TableRow key={pr.id}>
                <TableCell className="font-medium">{pr.id}</TableCell>
                <TableCell>{pr.period}</TableCell>
                <TableCell className="font-bold">{pr.total}</TableCell>
                <TableCell className="text-muted-foreground">{pr.date}</TableCell>
                <TableCell>
                  <Badge variant={pr.status === "Processed" ? "default" : "outline"} className={pr.status === "Processed" ? "bg-emerald-500/10 text-emerald-600 border-none" : "border-amber-500/50 text-amber-600"}>{pr.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
