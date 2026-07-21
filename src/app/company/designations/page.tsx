"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Designation } from "@/store/useStore"

export default function DesignationsPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])
  const { departments, designations, addDesignation, deleteDesignation } = useStore()
  const [isDesigOpen, setIsDesigOpen] = React.useState(false)

  const handleAddDesignation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDesig: Designation = {
      id: `DS-${Date.now().toString().slice(-4)}`,
      title: formData.get("title") as string,
      department: formData.get("department") as string,
      level: formData.get("level") as string
    }
    addDesignation(newDesig)
    setIsDesigOpen(false)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Designations</CardTitle><CardDescription>Manage job titles and hierarchy levels.</CardDescription></div>
          {isAdmin && (
            <Dialog open={isDesigOpen} onOpenChange={setIsDesigOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Designation</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddDesignation}>
                  <DialogHeader><DialogTitle>Add New Designation</DialogTitle></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Job Title</Label><Input name="title" required placeholder="e.g. Senior Developer" /></div>
                    <div className="space-y-2"><Label>Department</Label>
                      <Select name="department" defaultValue={departments[0]?.name || "Engineering"}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Level</Label>
                      <Select name="level" defaultValue="Mid">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Mid">Mid</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead">Lead</SelectItem>
                          <SelectItem value="Director">Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter><Button type="button" variant="outline" onClick={() => setIsDesigOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow><TableHead>ID</TableHead><TableHead>Job Title</TableHead><TableHead>Department</TableHead><TableHead>Level</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
          </TableHeader>
          <TableBody>
            {designations.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No designations found.</TableCell></TableRow>
            ) : designations.map((desig) => (
              <TableRow key={desig.id}>
                <TableCell className="font-medium text-xs text-muted-foreground">{desig.id}</TableCell>
                <TableCell className="font-medium">{desig.title}</TableCell>
                <TableCell className="text-muted-foreground">{desig.department}</TableCell>
                <TableCell><Badge variant="outline">{desig.level}</Badge></TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-500" onClick={() => deleteDesignation(desig.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
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
