"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useProjectStore } from "@/store/useProjectStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${value >= 80 ? "bg-emerald-500" : value >= 50 ? "bg-primary" : "bg-amber-500"}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium w-8">{value}%</span>
    </div>
  )
}

export default function ProjectsListPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const projects = useProjectStore(state => state.projects)
  const addProject = useProjectStore(state => state.addProject)
  const updateProject = useProjectStore(state => state.updateProject)
  const deleteProject = useProjectStore(state => state.deleteProject)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    client: "",
    manager: "",
    team: 1,
    deadline: "",
    progress: 0,
  })

  const handleAdd = () => {
    addProject({
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      client: formData.client,
      manager: formData.manager,
      team: Number(formData.team),
      deadline: formData.deadline,
      progress: Number(formData.progress),
      status: "Active"
    })
    setIsAddOpen(false)
    setFormData({ name: "", client: "", manager: "", team: 1, deadline: "", progress: 0 })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>All Projects</CardTitle><CardDescription>Overview of active and completed projects.</CardDescription></div>
          {canManage && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <DialogDescription>Create a new project in the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Project Name</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="ERP System Rollout" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">Client</Label>
                    <Input id="client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="col-span-3" placeholder="Acme Corp" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manager" className="text-right">Manager</Label>
                    <Input id="manager" value={formData.manager} onChange={e => setFormData({ ...formData, manager: e.target.value })} className="col-span-3" placeholder="Full Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="team" className="text-right">Team Size</Label>
                    <Input id="team" type="number" value={formData.team} onChange={e => setFormData({ ...formData, team: Number(e.target.value) })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">Deadline</Label>
                    <Input id="deadline" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} className="col-span-3" placeholder="Dec 31, 2026" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="progress" className="text-right">Progress %</Label>
                    <Input id="progress" type="number" max="100" value={formData.progress} onChange={e => setFormData({ ...formData, progress: Number(e.target.value) })} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save</Button>
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
              <TableHead>Project</TableHead><TableHead>Client</TableHead><TableHead>Manager</TableHead>
              <TableHead className="text-right">Team</TableHead><TableHead>Deadline</TableHead>
              <TableHead>Progress</TableHead><TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(p => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id}</div>
                </TableCell>
                <TableCell>{p.client}</TableCell>
                <TableCell>{p.manager}</TableCell>
                <TableCell className="text-right">{p.team}</TableCell>
                <TableCell className="text-muted-foreground">{p.deadline}</TableCell>
                <TableCell className="min-w-[140px]"><ProgressBar value={p.progress} /></TableCell>
                <TableCell>
                  <Badge variant={p.status === "Active" ? "default" : p.status === "Completed" ? "secondary" : "outline"}
                    className={p.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : p.status === "On Hold" ? "bg-amber-500/10 text-amber-600" : "bg-muted/50"}>
                    {p.status}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateProject(p.id, { status: p.status === "Active" ? "On Hold" : p.status === "On Hold" ? "Completed" : "Active" })}>
                          <Edit className="mr-2 h-4 w-4" /> Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteProject(p.id)}>
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
