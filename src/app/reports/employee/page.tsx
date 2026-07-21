"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const employeeMetrics = [
  { department: "Engineering", headcount: 24, avgSalary: "$95,000", totalCost: "$2,280,000" },
  { department: "Sales", headcount: 15, avgSalary: "$75,000", totalCost: "$1,125,000" },
  { department: "Marketing", headcount: 8, avgSalary: "$70,000", totalCost: "$560,000" },
  { department: "HR & Admin", headcount: 5, avgSalary: "$65,000", totalCost: "$325,000" },
]

export default function EmployeeReportPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Department Headcount & Costs</CardTitle><CardDescription>Summary of personnel distribution and payroll expenses.</CardDescription></div>
          <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Department</TableHead><TableHead className="text-center">Headcount</TableHead><TableHead className="text-right">Avg. Salary</TableHead><TableHead className="text-right">Total Annual Cost</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {employeeMetrics.map(em => (
              <TableRow key={em.department}>
                <TableCell className="font-medium">{em.department}</TableCell>
                <TableCell className="text-center">{em.headcount}</TableCell>
                <TableCell className="text-right text-muted-foreground">{em.avgSalary}</TableCell>
                <TableCell className="text-right font-bold text-rose-500">{em.totalCost}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/30 font-bold border-t-2">
              <TableCell>TOTAL</TableCell>
              <TableCell className="text-center">52</TableCell>
              <TableCell className="text-right text-muted-foreground">--</TableCell>
              <TableCell className="text-right text-rose-500">$4,290,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
