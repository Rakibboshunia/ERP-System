"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, Trash2, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useProjectStore } from "@/store/useProjectStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function KanbanPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const tasks = useProjectStore(state => state.tasks)
  const addTask = useProjectStore(state => state.addTask)
  const updateTaskStatus = useProjectStore(state => state.updateTaskStatus)
  const deleteTask = useProjectStore(state => state.deleteTask)

  const kanbanCols = [
    { id: "todo", label: "To Do", color: "border-muted-foreground/30", items: tasks.filter(t => t.status === "Todo") },
    { id: "inprogress", label: "In Progress", color: "border-blue-500/50", items: tasks.filter(t => t.status === "In Progress") },
    { id: "done", label: "Done", color: "border-emerald-500/50", items: tasks.filter(t => t.status === "Done") },
  ]

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
    <div className="mt-0">
      <div className="flex items-center justify-between mb-4">
        <div><h2 className="text-lg font-semibold">Kanban Board</h2><p className="text-sm text-muted-foreground">Visual task board organized by status.</p></div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kanbanCols.map(col => (
          <div key={col.id} className={`bg-muted/30 rounded-xl p-4 border-2 ${col.color}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{col.label}</h3>
              <span className="bg-muted text-xs font-bold px-2 py-0.5 rounded-full">{col.items.length}</span>
            </div>
            <div className="space-y-3">
              {col.items.map(task => (
                <Card key={task.id} className="shadow-sm hover:border-primary/40 transition-colors group relative">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm leading-tight flex-1 pr-2">{task.title}</p>
                      <Badge variant="outline" className={`text-xs shrink-0 ${task.priority === "High" ? "text-rose-500 border-rose-500/30" : task.priority === "Medium" ? "text-amber-500 border-amber-500/30" : "text-muted-foreground"}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{task.project}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{task.assignee.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{task.assignee.split(" ")[0]}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{task.due}</span>
                    </div>
                    {canManage && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateTaskStatus(task.id, task.status === "Todo" ? "In Progress" : task.status === "In Progress" ? "Done" : "Todo")}>
                              <ArrowRight className="mr-2 h-4 w-4" /> Move Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteTask(task.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {col.items.length === 0 && <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">No tasks here</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
