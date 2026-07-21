"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Department } from "@/store/useStore"

export default function DepartmentsPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])
  const { branches, departments, addDepartment, deleteDepartment } = useStore()
  const [isDeptOpen, setIsDeptOpen] = React.useState(false)

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDept: Department = {
      id: `D-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      branch: formData.get("branch") as string,
      head: formData.get("head") as string,
      empCount: Number(formData.get("empCount")) || 0
    }
    addDepartment(newDept)
    setIsDeptOpen(false)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Departments</CardTitle><CardDescription>Manage organizational departments.</CardDescription></div>
          {isAdmin && (
            <Dialog open={isDeptOpen} onOpenChange={setIsDeptOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Department</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddDepartment}>
                  <DialogHeader><DialogTitle>Add New Department</DialogTitle></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Department Name</Label><Input name="name" required placeholder="e.g. IT Support" /></div>
                    <div className="space-y-2"><Label>Assigned Branch</Label>
                      <Select name="branch" defaultValue={branches[0]?.name || "Headquarters"}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {branches.map(b => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}
                          <SelectItem value="All Branches">All Branches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Department Head</Label><Input name="head" required placeholder="e.g. Jane Smith" /></div>
                    <div className="space-y-2"><Label>Initial Employee Count</Label><Input name="empCount" type="number" defaultValue="0" /></div>
                  </div>
                  <DialogFooter><Button type="button" variant="outline" onClick={() => setIsDeptOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Dept ID</TableHead><TableHead>Department Name</TableHead><TableHead>Assigned Branch</TableHead><TableHead>Dept Head</TableHead><TableHead className="text-right">Employees</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No departments found.</TableCell></TableRow>
            ) : departments.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium text-xs text-muted-foreground">{dept.id}</TableCell>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell className="text-muted-foreground">{dept.branch}</TableCell>
                <TableCell>{dept.head}</TableCell>
                <TableCell className="text-right font-medium">{dept.empCount}</TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-500" onClick={() => deleteDepartment(dept.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
