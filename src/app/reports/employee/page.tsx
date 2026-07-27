"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Users, UserCheck, UserX, Clock } from "lucide-react"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#f43f5e"]

export default function EmployeeReportPage() {
  const { employees, leaveRequests, departments } = useStore()
  const [deptFilter, setDeptFilter] = React.useState("all")

  // Stats from live store
  const activeCount = employees.filter(e => e.status === "Active").length
  const onLeaveCount = employees.filter(e => e.status === "On Leave").length
  const terminatedCount = employees.filter(e => e.status === "Terminated").length
  const pendingLeaves = leaveRequests.filter(l => l.status === "Pending").length

  // Department breakdown from real employees
  const deptMap: Record<string, number> = {}
  employees.forEach(e => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1
  })
  const deptData = Object.entries(deptMap).map(([name, count], i) => ({ name, count, color: COLORS[i % COLORS.length] }))

  // Static cost data for the table (augmented with real headcount)
  const deptCostRows = deptData.map(d => ({
    department: d.department,
    headcount: d.count,
    avgSalary: "$75,000",
    totalCost: `$${(d.count * 75000).toLocaleString()}`,
    color: d.color,
  }))
  const totalHeadcount = employees.length
  const totalCost = deptCostRows.reduce((s, d) => s + d.headcount * 75000, 0)

  const filteredEmployees = deptFilter === "all" ? employees : employees.filter(e => e.department === deptFilter)

  const handleExport = () => {
    const rows = [
      ["ID", "Name", "Email", "Role", "Department", "Status"],
      ...filteredEmployees.map(e => [e.id, e.name, e.email, e.role, e.department, e.status]),
    ]
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "employee-report.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Employee report exported as CSV!")
  }

  const allDepts = [...new Set(employees.map(e => e.department))]

  return (
    <div className="grid gap-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Employee Report</h2>
        <div className="flex items-center gap-2">
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Departments" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {allDepts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: totalHeadcount, icon: Users, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Active", value: activeCount, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "On Leave", value: onLeaveCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10" },
          { label: "Pending Leaves", value: pendingLeaves, icon: UserX, color: "text-rose-500", bg: "bg-rose-500/10" },
        ].map(kpi => (
          <Card key={kpi.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-5 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Headcount by Department</CardTitle><CardDescription>Distribution from live HR data.</CardDescription></CardHeader>
          <CardContent>
            {deptData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No employee data yet.</div>
            ) : (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="count" paddingAngle={2}>
                      {deptData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v} employees`} contentStyle={{ borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 flex-1">
                  {deptData.map(d => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} /><span>{d.name}</span></div>
                      <span className="font-bold">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Department Cost Table */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Department Headcount & Costs</CardTitle><CardDescription>Summary of personnel and estimated payroll.</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Department</TableHead><TableHead className="text-center">Staff</TableHead><TableHead className="text-right">Est. Annual Cost</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {deptCostRows.map(d => (
                  <TableRow key={d.department}>
                    <TableCell><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} /><span className="font-medium">{d.department}</span></div></TableCell>
                    <TableCell className="text-center">{d.headcount}</TableCell>
                    <TableCell className="text-right font-bold text-rose-500">{d.totalCost}</TableCell>
                  </TableRow>
                ))}
                <TableRow key="total" className="bg-muted/30 font-bold">
                  <TableCell>TOTAL</TableCell>
                  <TableCell className="text-center">{totalHeadcount}</TableCell>
                  <TableCell className="text-right text-rose-500">${totalCost.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Leave Request Summary</CardTitle><CardDescription>All leave applications from HR module.</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Employee</TableHead><TableHead>Type</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.length === 0 ? (
                <TableRow key="empty"><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No leave requests on file.</TableCell></TableRow>
              ) : leaveRequests.map(lr => (
                <TableRow key={lr.id}>
                  <TableCell className="font-medium">{lr.emp}</TableCell>
                  <TableCell><Badge variant="outline">{lr.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{lr.dates}</TableCell>
                  <TableCell>
                    <Badge variant={lr.status === "Approved" ? "default" : lr.status === "Rejected" ? "destructive" : "secondary"}
                      className={lr.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" : lr.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""}>
                      {lr.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
