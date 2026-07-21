"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Timer, Play, Pause } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useProjectStore } from "@/store/useProjectStore"

export default function TimeTrackingPage() {
  const { user, hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const timeLogs = useProjectStore(state => state.timeLogs)
  const addTimeLog = useProjectStore(state => state.addTimeLog)

  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSec, setTimerSec] = useState(0)
  const [taskDescription, setTaskDescription] = useState("")
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    const id = setInterval(() => setTimerSec(s => s + 1), 1000)
    setIntervalId(id)
    setTimerRunning(true)
  }

  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId)
    setTimerRunning(false)
    if (timerSec > 0) {
      const hrs = Math.floor(timerSec / 3600)
      const mins = Math.floor((timerSec % 3600) / 60)
      const secs = timerSec % 60
      const durationStr = `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`
      
      addTimeLog({
        id: `TL-${Math.floor(10 + Math.random() * 90)}`,
        member: user?.name || "Current Employee",
        project: "ERP System Rollout",
        task: taskDescription || "General Tasks",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        duration: durationStr,
        billable: true,
      })
      setTimerSec(0)
      setTaskDescription("")
    }
  }

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="grid gap-6 mt-0">
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Timer className="w-5 h-5" />Live Timer</CardTitle>
          <CardDescription>Track time spent on your current task in real-time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-5xl font-mono font-bold tabular-nums text-primary">{formatTime(timerSec)}</div>
            <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
              <Input
                placeholder="What are you working on?"
                className="w-full"
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
              />
              <div className="flex gap-2">
                <Button className="flex-1" variant={timerRunning ? "destructive" : "default"} onClick={timerRunning ? stopTimer : startTimer}>
                  {timerRunning ? <><Pause className="w-4 h-4 mr-2" />Stop & Save Log</> : <><Play className="w-4 h-4 mr-2" />Start Timer</>}
                </Button>
                <Button variant="outline" onClick={() => { stopTimer(); setTimerSec(0) }}>Reset</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <TableHead>Member</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead>Billable</TableHead>
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
                    <Badge variant={log.billable ? "default" : "outline"} className={log.billable ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
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
  )
}
