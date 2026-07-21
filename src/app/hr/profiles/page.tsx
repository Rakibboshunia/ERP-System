"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useStore, Employee } from "@/store/useStore"

export default function ProfilesPage() {
  const { employees, addEmployee, deleteEmployee, departments } = useStore()
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

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Directory</h1>
          <p className="text-muted-foreground">Manage your workforce, add new employees, or modify their details.</p>
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

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>All Employees</CardTitle>
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
    </>
  )
}
