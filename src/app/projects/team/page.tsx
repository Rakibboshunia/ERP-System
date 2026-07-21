"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const members = [
  { id: "M1", name: "Alice Johnson", role: "Project Lead", email: "alice@erp.com", projects: 2, tasksOpen: 4, status: "Active" },
  { id: "M2", name: "Bob Smith", role: "Backend Dev", email: "bob@erp.com", projects: 1, tasksOpen: 2, status: "Active" },
  { id: "M3", name: "Charlie Davis", role: "UI/UX Designer", email: "charlie@erp.com", projects: 1, tasksOpen: 1, status: "Active" },
  { id: "M4", name: "Diana Prince", role: "Frontend Dev", email: "diana@erp.com", projects: 2, tasksOpen: 3, status: "Active" },
  { id: "M5", name: "Evan Wright", role: "DevOps Engineer", email: "evan@erp.com", projects: 2, tasksOpen: 1, status: "On Leave" },
]

export default function TeamPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Team Members</CardTitle><CardDescription>Project team roster and workload overview.</CardDescription></div>
          {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Member</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead><TableHead>Role</TableHead>
              <TableHead className="text-right">Projects</TableHead><TableHead className="text-right">Open Tasks</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(m => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{m.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell className="text-right">{m.projects}</TableCell>
                <TableCell className="text-right">{m.tasksOpen}</TableCell>
                <TableCell>
                  <Badge variant={m.status === "Active" ? "default" : "secondary"}
                    className={m.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                    {m.status}
                  </Badge>
                </TableCell>
                {canManage && <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
