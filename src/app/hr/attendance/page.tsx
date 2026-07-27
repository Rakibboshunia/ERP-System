"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, CheckCircle, Pencil, Check, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttendanceRecord {
  id: number
  emp: string
  date: string
  checkIn: string
  checkOut: string
  status: "Present" | "Late" | "On Leave"
  hrs: string
}

type EditingRow = {
  id: number
  checkIn: string
  checkOut: string
  status: "Present" | "Late" | "On Leave"
} | null

export default function AttendancePage() {
  const { user, hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin", "hr"])

  const [records, setRecords] = React.useState<AttendanceRecord[]>([
    { id: 1, emp: "Alice Johnson", date: "Today", checkIn: "08:55 AM", checkOut: "05:10 PM", status: "Present", hrs: "8h 15m" },
    { id: 2, emp: "Bob Smith", date: "Today", checkIn: "09:15 AM", checkOut: "--", status: "Late", hrs: "--" },
    { id: 3, emp: "Charlie Davis", date: "Today", checkIn: "--", checkOut: "--", status: "On Leave", hrs: "0h" },
    { id: 4, emp: "Diana Prince", date: "Today", checkIn: "08:45 AM", checkOut: "05:00 PM", status: "Present", hrs: "8h 15m" },
    { id: 5, emp: "Edward Norton", date: "Today", checkIn: "09:30 AM", checkOut: "--", status: "Late", hrs: "--" },
  ])

  const [checkedIn, setCheckedIn] = React.useState(false)
  const [editing, setEditing] = React.useState<EditingRow>(null)

  const handleCheckIn = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userName = user?.name || "Current User"
    const existing = records.find(r => r.emp === userName)
    if (existing) {
      setRecords(records.map(r => r.emp === userName ? { ...r, checkIn: timeStr, status: "Present" } : r))
    } else {
      setRecords([
        ...records,
        {
          id: Date.now(),
          emp: userName,
          date: "Today",
          checkIn: timeStr,
          checkOut: "--",
          status: "Present",
          hrs: "Working..."
        }
      ])
    }
    setCheckedIn(true)
  }

  const handleCheckOut = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userName = user?.name || "Current User"
    setRecords(records.map(r => r.emp === userName ? { ...r, checkOut: timeStr, hrs: "8h 00m" } : r))
    setCheckedIn(false)
  }

  const startEdit = (record: AttendanceRecord) => {
    setEditing({ id: record.id, checkIn: record.checkIn, checkOut: record.checkOut, status: record.status })
  }

  const cancelEdit = () => setEditing(null)

  const saveEdit = () => {
    if (!editing) return
    setRecords(records.map(r => {
      if (r.id !== editing.id) return r
      // Recalculate hrs if both times filled
      return { ...r, checkIn: editing.checkIn, checkOut: editing.checkOut, status: editing.status, hrs: editing.checkOut !== "--" && editing.checkIn !== "--" ? "8h 00m" : "--" }
    }))
    setEditing(null)
  }

  const statusBadgeClass = (status: string) =>
    status === "Present" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" :
    status === "Late" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" :
    "text-muted-foreground border-border bg-muted/30"

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>Monitor live check-ins and working hours.{isAdmin && <span className="ml-2 text-primary font-medium">(Admin: click ✎ to edit records)</span>}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {!checkedIn ? (
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1" onClick={handleCheckIn}>
                <Clock className="w-4 h-4" /> Check In
              </Button>
            ) : (
              <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={handleCheckOut}>
                <CheckCircle className="w-4 h-4" /> Check Out
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Hrs</TableHead>
                {isAdmin && <TableHead className="text-center w-24">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => {
                const isEditingThis = editing?.id === record.id
                return (
                  <TableRow key={record.id} className={isEditingThis ? "bg-primary/5 ring-1 ring-inset ring-primary/20" : ""}>
                    <TableCell className="font-medium">{record.emp}</TableCell>
                    <TableCell>{record.date}</TableCell>

                    {/* Check-In */}
                    <TableCell>
                      {isEditingThis ? (
                        <Input
                          value={editing.checkIn}
                          onChange={e => setEditing({ ...editing, checkIn: e.target.value })}
                          className="h-8 w-28 text-sm"
                          placeholder="09:00 AM"
                        />
                      ) : record.checkIn}
                    </TableCell>

                    {/* Check-Out */}
                    <TableCell>
                      {isEditingThis ? (
                        <Input
                          value={editing.checkOut}
                          onChange={e => setEditing({ ...editing, checkOut: e.target.value })}
                          className="h-8 w-28 text-sm"
                          placeholder="05:00 PM"
                        />
                      ) : record.checkOut}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {isEditingThis ? (
                        <Select
                          value={editing.status}
                          onValueChange={(val) => setEditing({ ...editing, status: val as AttendanceRecord["status"] })}
                        >
                          <SelectTrigger className="h-8 w-32 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline" className={statusBadgeClass(record.status)}>
                          {record.status}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right font-medium">{record.hrs}</TableCell>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <TableCell className="text-center">
                        {isEditingThis ? (
                          <div className="flex items-center justify-center gap-1">
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10" onClick={saveEdit} title="Save">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" onClick={cancelEdit} title="Cancel">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => startEdit(record)} title="Edit record">
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
