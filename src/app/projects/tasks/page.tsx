"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useProjectStore } from "@/store/useProjectStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TasksPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const tasks = useProjectStore(state => state.tasks)
  const addTask = useProjectStore(state => state.addTask)
  const updateTaskStatus = useProjectStore(state => state.updateTaskStatus)
  const deleteTask = useProjectStore(state => state.deleteTask)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    project: "",
    assignee: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    due: "",
  })

  const handleAdd = () => {
    addTask({
      id: `TSK-${Math.floor(200 + Math.random() * 800)}`,
      title: formData.title,
      project: formData.project,
      assignee: formData.assignee,
      priority: formData.priority,
      due: formData.due,
      status: "Todo"
    })
    setIsAddOpen(false)
    setFormData({ title: "", project: "", assignee: "", priority: "Medium", due: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Tasks</CardTitle><CardDescription>All active tasks across projects.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Task</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>Create a new task and assign it to a team member.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Task Title</Label>
                    <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="col-span-3" placeholder="Design database schema" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project" className="text-right">Project</Label>
                    <Input id="project" value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })} className="col-span-3" placeholder="ERP System Rollout" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assignee" className="text-right">Assignee</Label>
                    <Input id="assignee" value={formData.assignee} onChange={e => setFormData({ ...formData, assignee: e.target.value })} className="col-span-3" placeholder="Full Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="due" className="text-right">Due Date</Label>
                    <Input id="due" value={formData.due} onChange={e => setFormData({ ...formData, due: e.target.value })} className="col-span-3" placeholder="Oct 25, 2026" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead><TableHead>Project</TableHead><TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map(t => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{t.project}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{t.assignee.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{t.assignee}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={t.priority === "High" ? "text-rose-500 border-rose-500/30" : t.priority === "Medium" ? "text-amber-500 border-amber-500/30" : "text-muted-foreground"}>{t.priority}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{t.due}</TableCell>
                <TableCell>
                  <Badge variant={t.status === "Done" ? "default" : t.status === "In Progress" ? "secondary" : "outline"}
                    className={t.status === "Done" ? "bg-emerald-500/10 text-emerald-600" : t.status === "In Progress" ? "bg-blue-500/10 text-blue-600" : "text-muted-foreground"}>
                    {t.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateTaskStatus(t.id, t.status === "Todo" ? "In Progress" : t.status === "In Progress" ? "Done" : "Todo")}>
                          <Edit className="mr-2 h-4 w-4" /> Move Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteTask(t.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
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
