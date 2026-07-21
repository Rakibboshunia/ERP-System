"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const performanceReviews = [
  { id: 1, emp: "Alice Johnson", reviewer: "Engineering Lead", score: "4.8/5.0", status: "Completed", date: "Q3 2026" },
  { id: 2, emp: "Bob Smith", reviewer: "VP of Product", score: "4.2/5.0", status: "Completed", date: "Q3 2026" },
  { id: 3, emp: "Diana Prince", reviewer: "Sales Director", score: "--", status: "Scheduled", date: "Nov 01, 2026" },
]

export default function PerformancePage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Performance Reviews</CardTitle><CardDescription>Track employee KPI evaluations and feedback.</CardDescription></div>
          <Button size="sm">Schedule Review</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Employee</TableHead><TableHead>Reviewer</TableHead><TableHead>Date / Cycle</TableHead><TableHead>Score</TableHead><TableHead>Status</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {performanceReviews.map((rev) => (
              <TableRow key={rev.id}>
                <TableCell className="font-medium">{rev.emp}</TableCell>
                <TableCell>{rev.reviewer}</TableCell>
                <TableCell className="text-muted-foreground">{rev.date}</TableCell>
                <TableCell className="font-medium">{rev.score}</TableCell>
                <TableCell><Badge variant={rev.status === "Completed" ? "default" : "secondary"}>{rev.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
