"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const purchaseRequests = [
  { id: "PR-3001", title: "Office Supplies Restock", requestedBy: "HR Dept", department: "Human Resources", amount: "$1,200.00", date: "Oct 15, 2026", status: "Approved" },
  { id: "PR-3002", title: "Server RAM Upgrade", requestedBy: "IT Team", department: "Engineering", amount: "$4,500.00", date: "Oct 16, 2026", status: "Pending" },
  { id: "PR-3003", title: "Ergonomic Chairs x10", requestedBy: "Admin", department: "Admin", amount: "$9,990.00", date: "Oct 17, 2026", status: "Pending" },
  { id: "PR-3004", title: "Marketing Banners", requestedBy: "Marketing", department: "Marketing", amount: "$800.00", date: "Oct 14, 2026", status: "Rejected" },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Approved") return <CheckCircle className="w-4 h-4 text-emerald-500" />
  if (status === "Rejected") return <XCircle className="w-4 h-4 text-rose-500" />
  return <Clock className="w-4 h-4 text-amber-500" />
}

export default function RequestsPage() {
  const { hasPermission } = useAuth()
  const canApprove = hasPermission(["superadmin", "admin"])

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Purchase Requests</CardTitle>
            <CardDescription>Internal requests for procurement that require approval before ordering.</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search requests..." className="pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PR No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseRequests.map(pr => (
              <TableRow key={pr.id}>
                <TableCell className="font-medium">{pr.id}</TableCell>
                <TableCell className="font-semibold">{pr.title}</TableCell>
                <TableCell>{pr.requestedBy}</TableCell>
                <TableCell className="text-muted-foreground">{pr.department}</TableCell>
                <TableCell className="text-right font-medium">{pr.amount}</TableCell>
                <TableCell className="text-muted-foreground">{pr.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={pr.status} />
                    <Badge variant={
                      pr.status === "Approved" ? "default" :
                      pr.status === "Rejected" ? "destructive" : "secondary"
                    } className={
                      pr.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                      pr.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                    }>
                      {pr.status}
                    </Badge>
                  </div>
                </TableCell>
                {canApprove && (
                  <TableCell className="text-right">
                    {pr.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-500/30 hover:bg-emerald-50">Approve</Button>
                        <Button size="sm" variant="outline" className="text-rose-500 border-rose-500/30 hover:bg-rose-50">Reject</Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    )}
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
