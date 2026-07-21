"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AttendanceRecord {
  id: number
  emp: string
  date: string
  checkIn: string
  checkOut: string
  status: "Present" | "Late" | "On Leave"
  hrs: string
}

export default function AttendancePage() {
  const { user } = useAuth()
  const [records, setRecords] = React.useState<AttendanceRecord[]>([
    { id: 1, emp: "Alice Johnson", date: "Today", checkIn: "08:55 AM", checkOut: "05:10 PM", status: "Present", hrs: "8h 15m" },
    { id: 2, emp: "Bob Smith", date: "Today", checkIn: "09:15 AM", checkOut: "--", status: "Late", hrs: "--" },
    { id: 3, emp: "Charlie Davis", date: "Today", checkIn: "--", checkOut: "--", status: "On Leave", hrs: "0h" },
  ])

  const [checkedIn, setCheckedIn] = React.useState(false)

  const handleCheckIn = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userName = user?.name || "Current User"
    
    // Check if user already exists
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

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>Monitor live check-ins and working hours.</CardDescription>
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
        <Table>
          <TableHeader>
            <TableRow><TableHead>Employee</TableHead><TableHead>Date</TableHead><TableHead>Check-In</TableHead><TableHead>Check-Out</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total Hrs</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
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
  )
}
