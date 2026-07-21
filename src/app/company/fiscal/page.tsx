"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface FiscalYear {
  id: string
  title: string
  startDate: string
  endDate: string
  status: "Active" | "Closed"
}

export default function FiscalPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])

  const [fiscalYears, setFiscalYears] = React.useState<FiscalYear[]>([
    { id: "FY-24", title: "Fiscal Year 2024", startDate: "Jan 01, 2024", endDate: "Dec 31, 2024", status: "Active" },
    { id: "FY-23", title: "Fiscal Year 2023", startDate: "Jan 01, 2023", endDate: "Dec 31, 2023", status: "Closed" },
  ])

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    id: "",
    title: "",
    startDate: "",
    endDate: "",
  })

  const handleAdd = () => {
    setFiscalYears([
      ...fiscalYears,
      {
        id: formData.id || `FY-${Math.floor(25 + Math.random() * 10)}`,
        title: formData.title,
        startDate: formData.startDate || "Jan 01, 2025",
        endDate: formData.endDate || "Dec 31, 2025",
        status: "Active",
      },
    ])
    setIsAddOpen(false)
    setFormData({ id: "", title: "", startDate: "", endDate: "" })
  }

  const toggleStatus = (id: string) => {
    setFiscalYears(fiscalYears.map(fy => fy.id === id ? { ...fy, status: fy.status === "Active" ? "Closed" : "Active" } : fy))
  }

  const deleteFiscalYear = (id: string) => {
    setFiscalYears(fiscalYears.filter(fy => fy.id !== id))
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Fiscal Years</CardTitle><CardDescription>Manage accounting and fiscal periods.</CardDescription></div>
          {isAdmin && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Fiscal Year</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Fiscal Year</DialogTitle>
                  <DialogDescription>Define a new accounting period.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="id" className="text-right">Code</Label>
                    <Input id="id" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} className="col-span-3" placeholder="FY-25" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="col-span-3" placeholder="Fiscal Year 2025" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">Start Date</Label>
                    <Input id="startDate" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="col-span-3" placeholder="Jan 01, 2025" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">End Date</Label>
                    <Input id="endDate" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="col-span-3" placeholder="Dec 31, 2025" />
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
            <TableRow><TableHead>ID</TableHead><TableHead>Title</TableHead><TableHead>Start Date</TableHead><TableHead>End Date</TableHead><TableHead>Status</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
          </TableHeader>
          <TableBody>
            {fiscalYears.map((fy) => (
              <TableRow key={fy.id}>
                <TableCell className="font-medium">{fy.id}</TableCell>
                <TableCell>{fy.title}</TableCell>
                <TableCell className="text-muted-foreground">{fy.startDate}</TableCell>
                <TableCell className="text-muted-foreground">{fy.endDate}</TableCell>
                <TableCell>
                  <Badge variant={fy.status === "Active" ? "default" : "secondary"} className={fy.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>
                    {fy.status}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStatus(fy.id)} title="Toggle Status"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600" onClick={() => deleteFiscalYear(fy.id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
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
