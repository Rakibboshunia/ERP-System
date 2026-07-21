"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const taxReport = [
  { period: "Q1 2026", type: "Sales Tax (VAT)", collected: "$45,200", paid: "$12,400", netPayable: "$32,800", status: "Filed" },
  { period: "Q1 2026", type: "Corporate Tax", collected: "--", paid: "--", netPayable: "$15,600", status: "Filed" },
  { period: "Q2 2026", type: "Sales Tax (VAT)", collected: "$52,800", paid: "$15,200", netPayable: "$37,600", status: "Filed" },
  { period: "Q3 2026", type: "Sales Tax (VAT)", collected: "$61,400", paid: "$18,500", netPayable: "$42,900", status: "Pending" },
]

export default function TaxReportPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Tax Liability Summary</CardTitle><CardDescription>Overview of collected vs paid taxes and net payable amounts.</CardDescription></div>
          <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Period</TableHead><TableHead>Tax Type</TableHead><TableHead className="text-right">Tax Collected</TableHead><TableHead className="text-right">Tax Paid (Input)</TableHead><TableHead className="text-right">Net Payable</TableHead><TableHead>Status</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {taxReport.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.period}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell className="text-right text-emerald-600">{t.collected}</TableCell>
                <TableCell className="text-right text-blue-600">{t.paid}</TableCell>
                <TableCell className="text-right font-bold text-rose-500">{t.netPayable}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Filed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {t.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
