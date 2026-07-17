"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Briefcase, CheckSquare, Users, LayoutGrid, Clock, Plus, MoreHorizontal, Play, Pause, Timer } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const projects = [
  { id: "PRJ-001", name: "ERP System Rollout", client: "Internal", manager: "Alice Johnson", team: 8, deadline: "Dec 31, 2026", progress: 65, status: "Active" },
  { id: "PRJ-002", name: "Website Redesign", client: "Acme Corp", manager: "Bob Smith", team: 4, deadline: "Nov 15, 2026", progress: 80, status: "Active" },
  { id: "PRJ-003", name: "Mobile App v2.0", client: "Stark Industries", manager: "Diana Prince", team: 6, deadline: "Jan 30, 2027", progress: 30, status: "On Hold" },
  { id: "PRJ-004", name: "Data Migration", client: "Wayne Ent.", manager: "Evan Wright", team: 3, deadline: "Oct 30, 2026", progress: 95, status: "Completed" },
]

const tasks = [
  { id: "TSK-101", project: "ERP System Rollout", title: "Design database schema", assignee: "Alice Johnson", priority: "High", due: "Oct 25, 2026", status: "Done" },
  { id: "TSK-102", project: "ERP System Rollout", title: "Implement RBAC module", assignee: "Bob Smith", priority: "High", due: "Oct 28, 2026", status: "In Progress" },
  { id: "TSK-103", project: "Website Redesign", title: "Create wireframes", assignee: "Diana Prince", priority: "Medium", due: "Oct 22, 2026", status: "Done" },
  { id: "TSK-104", project: "Website Redesign", title: "Develop landing page", assignee: "Charlie Davis", priority: "High", due: "Oct 30, 2026", status: "In Progress" },
  { id: "TSK-105", project: "Mobile App v2.0", title: "Set up CI/CD pipeline", assignee: "Evan Wright", priority: "Low", due: "Nov 10, 2026", status: "Todo" },
  { id: "TSK-106", project: "ERP System Rollout", title: "Write unit tests", assignee: "Alice Johnson", priority: "Medium", due: "Nov 01, 2026", status: "Todo" },
]

const members = [
  { id: "M1", name: "Alice Johnson", role: "Project Lead", email: "alice@erp.com", projects: 2, tasksOpen: 4, status: "Active" },
  { id: "M2", name: "Bob Smith", role: "Backend Dev", email: "bob@erp.com", projects: 1, tasksOpen: 2, status: "Active" },
  { id: "M3", name: "Charlie Davis", role: "UI/UX Designer", email: "charlie@erp.com", projects: 1, tasksOpen: 1, status: "Active" },
  { id: "M4", name: "Diana Prince", role: "Frontend Dev", email: "diana@erp.com", projects: 2, tasksOpen: 3, status: "Active" },
  { id: "M5", name: "Evan Wright", role: "DevOps Engineer", email: "evan@erp.com", projects: 2, tasksOpen: 1, status: "On Leave" },
]

const kanbanCols = [
  { id: "todo", label: "To Do", color: "border-muted-foreground/30", items: tasks.filter(t => t.status === "Todo") },
  { id: "inprogress", label: "In Progress", color: "border-blue-500/50", items: tasks.filter(t => t.status === "In Progress") },
  { id: "done", label: "Done", color: "border-emerald-500/50", items: tasks.filter(t => t.status === "Done") },
]

const timeLogs = [
  { id: "TL-01", member: "Alice Johnson", project: "ERP System Rollout", task: "Implement RBAC module", date: "Oct 17, 2026", duration: "3h 45m", billable: true },
  { id: "TL-02", member: "Bob Smith", project: "ERP System Rollout", task: "Database schema design", date: "Oct 17, 2026", duration: "2h 30m", billable: true },
  { id: "TL-03", member: "Diana Prince", project: "Website Redesign", task: "Develop landing page", date: "Oct 16, 2026", duration: "5h 00m", billable: true },
  { id: "TL-04", member: "Charlie Davis", project: "Website Redesign", task: "Create wireframes", date: "Oct 15, 2026", duration: "4h 15m", billable: false },
]

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

export default function ProjectsPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSec, setTimerSec] = useState(0)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    const id = setInterval(() => setTimerSec(s => s + 1), 1000)
    setIntervalId(id); setTimerRunning(true)
  }
  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId)
    setTimerRunning(false)
  }
  const formatTime = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Project Management</h1>
          <p className="text-muted-foreground">Track projects, manage tasks, and monitor team performance.</p>
        </div>
        {canManage && <Button className="flex items-center gap-2"><Plus className="w-4 h-4" />New Project</Button>}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Projects", value: "3", icon: Briefcase, color: "text-primary", bg: "bg-primary/10" },
          { label: "Open Tasks", value: "12", icon: CheckSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Team Members", value: "5", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Hours This Week", value: "87h", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map(k => (
          <Card key={k.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-6 flex items-center gap-3">
              <div className={`${k.bg} p-2 rounded-full`}><k.icon className={`w-5 h-5 ${k.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{k.label}</p><p className="text-2xl font-bold">{k.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto mb-6">
          <TabsTrigger value="projects" className="py-2.5 flex items-center gap-2"><Briefcase className="w-4 h-4 hidden sm:inline" />Projects</TabsTrigger>
          <TabsTrigger value="tasks" className="py-2.5 flex items-center gap-2"><CheckSquare className="w-4 h-4 hidden sm:inline" />Tasks</TabsTrigger>
          <TabsTrigger value="team" className="py-2.5 flex items-center gap-2"><Users className="w-4 h-4 hidden sm:inline" />Team</TabsTrigger>
          <TabsTrigger value="kanban" className="py-2.5 flex items-center gap-2"><LayoutGrid className="w-4 h-4 hidden sm:inline" />Kanban</TabsTrigger>
          <TabsTrigger value="time" className="py-2.5 flex items-center gap-2"><Clock className="w-4 h-4 hidden sm:inline" />Time Tracking</TabsTrigger>
        </TabsList>

        {/* Projects */}
        <TabsContent value="projects">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>All Projects</CardTitle><CardDescription>Overview of active and completed projects.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Project</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead><TableHead>Client</TableHead><TableHead>Manager</TableHead>
                    <TableHead className="text-right">Team</TableHead><TableHead>Deadline</TableHead>
                    <TableHead>Progress</TableHead><TableHead>Status</TableHead>
                    {canManage && <TableHead />}
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
                      {canManage && <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Tasks</CardTitle><CardDescription>All active tasks across projects.</CardDescription></div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Task</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead><TableHead>Project</TableHead><TableHead>Assignee</TableHead>
                    <TableHead>Priority</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead>
                    {canManage && <TableHead />}
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
                        <Badge variant="outline" className={t.priority === "High" ? "text-rose-500 border-rose-500/30" : t.priority === "Medium" ? "text-amber-500 border-amber-500/30" : "text-muted-foreground"}>
                          {t.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t.due}</TableCell>
                      <TableCell>
                        <Badge variant={t.status === "Done" ? "default" : t.status === "In Progress" ? "secondary" : "outline"}
                          className={t.status === "Done" ? "bg-emerald-500/10 text-emerald-600" : t.status === "In Progress" ? "bg-blue-500/10 text-blue-600" : "text-muted-foreground"}>
                          {t.status}
                        </Badge>
                      </TableCell>
                      {canManage && <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team">
          <Card className="border-border/50 shadow-sm">
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
        </TabsContent>

        {/* Kanban */}
        <TabsContent value="kanban">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="text-lg font-semibold">Kanban Board</h2><p className="text-sm text-muted-foreground">Drag tasks across stages to update status.</p></div>
            {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Task</Button>}
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
                    <Card key={task.id} className="shadow-sm cursor-pointer hover:border-primary/40 transition-colors">
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
                      </CardContent>
                    </Card>
                  ))}
                  {col.items.length === 0 && (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
                      No tasks here
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Time Tracking */}
        <TabsContent value="time">
          <div className="grid gap-6">
            {/* Live Timer */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Timer className="w-5 h-5" />Live Timer</CardTitle><CardDescription>Track time spent on the current task in real-time.</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-5xl font-mono font-bold tabular-nums text-primary">{formatTime(timerSec)}</div>
                  <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                    <Input placeholder="What are you working on?" className="w-full" />
                    <div className="flex gap-2">
                      <Button className="flex-1" variant={timerRunning ? "destructive" : "default"}
                        onClick={timerRunning ? stopTimer : startTimer}>
                        {timerRunning ? <><Pause className="w-4 h-4 mr-2" />Stop</> : <><Play className="w-4 h-4 mr-2" />Start</>}
                      </Button>
                      <Button variant="outline" onClick={() => { stopTimer(); setTimerSec(0) }}>Reset</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Logs */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div><CardTitle>Time Logs</CardTitle><CardDescription>Recorded hours by team members per task.</CardDescription></div>
                  {canManage && <Button size="sm" variant="outline">Export</Button>}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead><TableHead>Project</TableHead><TableHead>Task</TableHead>
                      <TableHead>Date</TableHead><TableHead className="text-right">Duration</TableHead><TableHead>Billable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">{log.member.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{log.member}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{log.project}</TableCell>
                        <TableCell>{log.task}</TableCell>
                        <TableCell className="text-muted-foreground">{log.date}</TableCell>
                        <TableCell className="text-right font-bold">{log.duration}</TableCell>
                        <TableCell>
                          <Badge variant={log.billable ? "default" : "outline"}
                            className={log.billable ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
                            {log.billable ? "Billable" : "Non-billable"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
