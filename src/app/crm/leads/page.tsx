"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCRMStore, Lead } from "@/store/useCRMStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LeadsPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  const leads = useCRMStore((state) => state.leads)
  const addLead = useCRMStore((state) => state.addLead)
  const updateLeadStatus = useCRMStore((state) => state.updateLeadStatus)
  const deleteLead = useCRMStore((state) => state.deleteLead)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    source: "Website",
    score: 70,
  })

  const handleAdd = () => {
    addLead({
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      contact: formData.contact,
      source: formData.source,
      status: "New",
      score: Number(formData.score),
    })
    setIsAddOpen(false)
    setFormData({ name: "", contact: "", source: "Website", score: 70 })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leads</CardTitle>
            <CardDescription>Manage and qualify new prospective clients.</CardDescription>
          </div>
          {canManageCRM && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Lead</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                  <DialogDescription>Create a new prospective lead in the CRM.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Company / Name</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="LexCorp" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">Contact Person</Label>
                    <Input id="contact" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="col-span-3" placeholder="Lex Luthor" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="source" className="text-right">Source</Label>
                    <Input id="source" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="col-span-3" placeholder="Website / Referral" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="score" className="text-right">Lead Score</Label>
                    <Input id="score" type="number" min="0" max="100" value={formData.score} onChange={e => setFormData({ ...formData, score: Number(e.target.value) })} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Lead</Button>
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
              <TableHead>Lead ID</TableHead>
              <TableHead>Company / Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Lead Score</TableHead>
              <TableHead>Status</TableHead>
              {canManageCRM && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-muted-foreground">{lead.id}</TableCell>
                <TableCell className="font-semibold">{lead.name}</TableCell>
                <TableCell>{lead.contact}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${lead.score > 80 ? 'bg-emerald-500' : lead.score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${lead.score}%` }} />
                    </div>
                    <span className="text-xs font-medium">{lead.score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={lead.status === "New" ? "text-blue-500 border-blue-500/30" : lead.status === "Qualified" ? "text-emerald-500 border-emerald-500/30" : ""}>
                    {lead.status}
                  </Badge>
                </TableCell>
                {canManageCRM && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, lead.status === "New" ? "Contacted" : lead.status === "Contacted" ? "Qualified" : "New")}>
                          <Edit className="mr-2 h-4 w-4" /> Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteLead(lead.id)}>
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
