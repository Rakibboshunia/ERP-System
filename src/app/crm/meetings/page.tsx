"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCRMStore } from "@/store/useCRMStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MeetingsPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  const meetings = useCRMStore((state) => state.meetings)
  const addMeeting = useCRMStore((state) => state.addMeeting)
  const deleteMeeting = useCRMStore((state) => state.deleteMeeting)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    client: "",
    date: "",
    time: "",
    type: "Video Call",
  })

  const handleAdd = () => {
    addMeeting({
      id: `MTG-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      client: formData.client,
      date: formData.date || "Oct 22, 2026",
      time: formData.time || "10:00 AM",
      type: formData.type,
    })
    setIsAddOpen(false)
    setFormData({ title: "", client: "", date: "", time: "", type: "Video Call" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>Upcoming appointments and client calls.</CardDescription>
          </div>
          {canManageCRM && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Schedule Meeting</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Meeting</DialogTitle>
                  <DialogDescription>Create a new client meeting event.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="col-span-3" placeholder="Product Demo" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">Client</Label>
                    <Input id="client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="col-span-3" placeholder="Acme Corp" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Date</Label>
                    <Input id="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="col-span-3" placeholder="Oct 20, 2026" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">Time</Label>
                    <Input id="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="col-span-3" placeholder="02:00 PM" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Input id="type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="col-span-3" placeholder="Video Call / In Person" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Meeting</Button>
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
              <TableHead>Meeting Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              {canManageCRM && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meet) => (
              <TableRow key={meet.id}>
                <TableCell className="font-medium">{meet.title}</TableCell>
                <TableCell>{meet.client}</TableCell>
                <TableCell>{meet.date}</TableCell>
                <TableCell>{meet.time}</TableCell>
                <TableCell>
                  <Badge variant="outline">{meet.type}</Badge>
                </TableCell>
                {canManageCRM && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteMeeting(meet.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Cancel Meeting
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
