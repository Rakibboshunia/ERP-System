"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, UserCircle, CalendarRange, Clock, Banknote, FileText, Star, Download, Check, X, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Employee, LeaveRequest } from "@/store/useStore"

const attendanceRecords = [
  { id: 1, emp: "Alice Johnson", date: "Today", checkIn: "08:55 AM", checkOut: "05:10 PM", status: "Present", hrs: "8h 15m" },
  { id: 2, emp: "Bob Smith", date: "Today", checkIn: "09:15 AM", checkOut: "--", status: "Late", hrs: "--" },
  { id: 3, emp: "Charlie Davis", date: "Today", checkIn: "--", checkOut: "--", status: "On Leave", hrs: "0h" },
]

const payrollRecords = [
  { id: "PR-10", period: "September 2026", status: "Processed", total: "$124,500.00", date: "Oct 01, 2026" },
  { id: "PR-11", period: "October 2026", status: "Draft", total: "$126,800.00", date: "Pending" },
]

const performanceReviews = [
  { id: 1, emp: "Alice Johnson", reviewer: "Engineering Lead", score: "4.8/5.0", status: "Completed", date: "Q3 2026" },
  { id: 2, emp: "Bob Smith", reviewer: "VP of Product", score: "4.2/5.0", status: "Completed", date: "Q3 2026" },
  { id: 3, emp: "Diana Prince", reviewer: "Sales Director", score: "--", status: "Scheduled", date: "Nov 01, 2026" },
]

export default function HRManagementPage() {
  const { user, hasPermission } = useAuth()
  const canManageHR = hasPermission(["superadmin", "admin", "hr"])
  
  const { 
    employees, addEmployee, deleteEmployee,
    leaveRequests, addLeaveRequest, updateLeaveRequestStatus,
    departments
  } = useStore()

  const [search, setSearch] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newEmp: Employee = {
      id: `EMP-${Date.now().toString().slice(-3)}`,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as string,
      status: formData.get("status") as "Active" | "On Leave" | "Terminated"
    }
    addEmployee(newEmp)
    setIsAddOpen(false)
  }

  if (!canManageHR) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile & HR</h1>
          <p className="text-muted-foreground">Manage your personal information, attendance, and leave requests.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCircle className="w-5 h-5"/> Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Name</span>
                  <p className="text-base font-semibold">{user?.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Email</span>
                  <p className="text-base">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Current Role</span>
                  <p className="text-base capitalize">{user?.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><CalendarRange className="w-5 h-5"/> Leave Balance</CardTitle>
                <Button size="sm" variant="outline">Request Leave</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="text-xs font-medium text-muted-foreground">Annual Leave</span>
                  <div className="text-2xl font-bold mt-1">14 <span className="text-sm font-normal text-muted-foreground">days</span></div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="text-xs font-medium text-muted-foreground">Sick Leave</span>
                  <div className="text-2xl font-bold mt-1">5 <span className="text-sm font-normal text-muted-foreground">days</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5"/> My Salary Slips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
                <div>
                  <p className="font-medium">September 2026</p>
                  <p className="text-xs text-muted-foreground">Processed on Oct 1, 2026</p>
                </div>
                <Button size="sm" variant="secondary"><Download className="w-4 h-4 mr-2"/> Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Management (HRM)</h1>
          <p className="text-muted-foreground">Manage your workforce, attendance, leaves, and payroll.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddEmployee}>
              <DialogHeader><DialogTitle>Add New Employee</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Full Name</Label><Input name="name" required placeholder="e.g. Jane Doe" /></div>
                  <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" required placeholder="jane@acme.corp" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Job Role</Label><Input name="role" required placeholder="e.g. Software Engineer" /></div>
                  <div className="space-y-2"><Label>Department</Label>
                    <Select name="department" defaultValue={departments[0]?.name || "Engineering"}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {departments.length > 0 ? departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>) : <SelectItem value="Engineering">Engineering</SelectItem>}
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select name="status" defaultValue="Active">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter><Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto mb-6">
          <TabsTrigger value="profiles" className="py-2.5 flex items-center gap-2"><UserCircle className="w-4 h-4 hidden sm:inline" /> Profiles</TabsTrigger>
          <TabsTrigger value="attendance" className="py-2.5 flex items-center gap-2"><Clock className="w-4 h-4 hidden sm:inline" /> Attendance</TabsTrigger>
          <TabsTrigger value="leaves" className="py-2.5 flex items-center gap-2"><CalendarRange className="w-4 h-4 hidden sm:inline" /> Leaves</TabsTrigger>
          <TabsTrigger value="payroll" className="py-2.5 flex items-center gap-2"><Banknote className="w-4 h-4 hidden sm:inline" /> Payroll</TabsTrigger>
          <TabsTrigger value="slips" className="py-2.5 flex items-center gap-2"><FileText className="w-4 h-4 hidden sm:inline" /> Salary Slips</TabsTrigger>
          <TabsTrigger value="performance" className="py-2.5 flex items-center gap-2"><Star className="w-4 h-4 hidden sm:inline" /> Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>A complete roster of active and past employees.</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..." className="w-full bg-background pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No employees found.</TableCell></TableRow>
                  ) : filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {employee.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{employee.name}</span>
                            <span className="text-xs text-muted-foreground">{employee.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground">{employee.id}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === "Active" ? "default" : employee.status === "On Leave" ? "secondary" : "destructive"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-rose-500" onClick={() => deleteEmployee(employee.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
              <CardDescription>Monitor live check-ins and working hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Employee</TableHead><TableHead>Date</TableHead><TableHead>Check-In</TableHead><TableHead>Check-Out</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total Hrs</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.emp}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={record.status === "Present" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : record.status === "Late" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : "text-muted-foreground"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{record.hrs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>Review and approve employee time-off requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Request ID</TableHead><TableHead>Employee</TableHead><TableHead>Type</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>{req.emp}</TableCell>
                      <TableCell>{req.type}</TableCell>
                      <TableCell>{req.dates}</TableCell>
                      <TableCell>
                        <Badge variant={req.status === "Approved" ? "default" : req.status === "Rejected" ? "destructive" : "secondary"} className={req.status === "Approved" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {req.status === "Pending" && (
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="outline" onClick={() => updateLeaveRequestStatus(req.id, "Approved")} className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"><Check className="h-4 w-4"/></Button>
                            <Button size="icon" variant="outline" onClick={() => updateLeaveRequestStatus(req.id, "Rejected")} className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50"><X className="h-4 w-4"/></Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card className="border-border/50 shadow-sm">
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
        </TabsContent>

        <TabsContent value="slips">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Salary Slips Archive</CardTitle>
              <CardDescription>Generate or download historical payslips for employees.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg mb-4 bg-muted/20">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div><h4 className="font-medium">Batch Generate Slips</h4><p className="text-xs text-muted-foreground">Generate PDFs for October 2026</p></div>
                </div>
                <Button variant="secondary">Generate All</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="border-border/50 shadow-sm">
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
        </TabsContent>

      </Tabs>
    </div>
  )
}
