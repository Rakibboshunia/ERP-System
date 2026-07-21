"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X, Plus, Calendar, Clock, Umbrella, HeartPulse } from "lucide-react"
import { useStore } from "@/store/useStore"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeavesPage() {
  const { user, hasPermission } = useAuth()
  const canApprove = hasPermission(["superadmin", "admin", "hr"])
  const { leaveRequests, addLeaveRequest, updateLeaveRequestStatus } = useStore()

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    type: "Annual Leave",
    dates: "",
    reason: "",
  })

  const handleRequestLeave = () => {
    addLeaveRequest({
      id: `LR-${Math.floor(100 + Math.random() * 900)}`,
      emp: user?.name || "Employee",
      type: formData.type,
      dates: formData.dates || "Nov 01 - Nov 04",
      status: "Pending",
    })
    setIsAddOpen(false)
    setFormData({ type: "Annual Leave", dates: "", reason: "" })
  }

  return (
    <div className="space-y-6 mt-0">
      {/* Leave Quota Overview for Employee */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/50 shadow-sm bg-muted/20">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <Umbrella className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Annual Leave</p>
              <p className="text-xl font-bold">12 Days <span className="text-xs text-muted-foreground font-normal">/ 15</span></p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-muted/20">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Sick Leave</p>
              <p className="text-xl font-bold">7 Days <span className="text-xs text-muted-foreground font-normal">/ 10</span></p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-muted/20">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Casual Leave</p>
              <p className="text-xl font-bold">3 Days <span className="text-xs text-muted-foreground font-normal">/ 5</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Leave Requests & Applications</CardTitle>
              <CardDescription>View time-off history or apply for a new leave.</CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary text-primary-foreground flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Apply for Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Apply for Leave
                  </DialogTitle>
                  <DialogDescription>Submit your leave application for manager approval.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Leave Type</Label>
                    <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                      <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                        <SelectItem value="Maternity / Paternity">Maternity / Paternity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dates" className="text-right">Dates Range</Label>
                    <Input id="dates" value={formData.dates} onChange={e => setFormData({ ...formData, dates: e.target.value })} className="col-span-3" placeholder="e.g. Nov 01 - Nov 05" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">Reason</Label>
                    <Textarea id="reason" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} className="col-span-3" placeholder="Reason for time off request..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                  <Button onClick={handleRequestLeave}>Submit Application</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                {canApprove && <TableHead className="text-right">Manager Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{req.id}</TableCell>
                  <TableCell className="font-semibold">{req.emp}</TableCell>
                  <TableCell><Badge variant="outline">{req.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{req.dates}</TableCell>
                  <TableCell>
                    <Badge variant={req.status === "Approved" ? "default" : req.status === "Rejected" ? "destructive" : "secondary"} className={req.status === "Approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  {canApprove && (
                    <TableCell className="text-right">
                      {req.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateLeaveRequestStatus(req.id, "Approved")} className="h-8 text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-50"><Check className="h-3.5 w-3.5 mr-1"/> Approve</Button>
                          <Button size="sm" variant="outline" onClick={() => updateLeaveRequestStatus(req.id, "Rejected")} className="h-8 text-xs text-rose-600 border-rose-500/30 hover:bg-rose-50"><X className="h-3.5 w-3.5 mr-1"/> Reject</Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Processed</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
