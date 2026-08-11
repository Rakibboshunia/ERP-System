"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, CheckCircle, Clock, XCircle, Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { usePurchaseStore, PurchaseRequest } from "@/store/usePurchaseStore"

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Approved") return <CheckCircle className="w-4 h-4 text-emerald-500" />
  if (status === "Rejected") return <XCircle className="w-4 h-4 text-rose-500" />
  return <Clock className="w-4 h-4 text-amber-500" />
}

export default function RequestsPage() {
  const { hasPermission } = useAuth()
  const canApprove = hasPermission(["superadmin", "admin"])

  const purchaseRequests = usePurchaseStore(state => state.purchaseRequests)
  const addPurchaseRequest = usePurchaseStore(state => state.addPurchaseRequest)
  const updatePurchaseRequest = usePurchaseStore(state => state.updatePurchaseRequest)
  const deletePurchaseRequest = usePurchaseStore(state => state.deletePurchaseRequest)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingPR, setEditingPR] = React.useState<PurchaseRequest | null>(null)
  const [search, setSearch] = React.useState("")

  const filteredPRs = purchaseRequests.filter(pr => pr.title.toLowerCase().includes(search.toLowerCase()) || pr.id.toLowerCase().includes(search.toLowerCase()))

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    addPurchaseRequest({
      id: `PR-${Math.floor(3000 + Math.random() * 900)}`,
      title: formData.get("title") as string,
      requestedBy: formData.get("requestedBy") as string,
      department: formData.get("department") as string,
      amount: `$${formData.get("amount")}`,
      date: formData.get("date") as string,
      status: formData.get("status") as PurchaseRequest["status"],
    })
    setIsAddOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingPR) return
    const formData = new FormData(e.currentTarget)
    
    updatePurchaseRequest(editingPR.id, {
      title: formData.get("title") as string,
      requestedBy: formData.get("requestedBy") as string,
      department: formData.get("department") as string,
      amount: `$${formData.get("amount")}`,
      date: formData.get("date") as string,
      status: formData.get("status") as PurchaseRequest["status"],
    })
    setIsEditOpen(false)
    setEditingPR(null)
  }

  const openEdit = (pr: PurchaseRequest) => {
    setEditingPR(pr)
    setIsEditOpen(true)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Purchase Requests</CardTitle>
            <CardDescription>Internal requests for procurement that require approval before ordering.</CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search requests..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {canApprove && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Request</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddSubmit}>
                    <DialogHeader>
                      <DialogTitle>New Purchase Request</DialogTitle>
                      <DialogDescription>Submit a new internal request for procurement.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Title</Label>
                        <Input name="title" required className="col-span-3" placeholder="e.g. Office Supplies" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Requested By</Label>
                        <Input name="requestedBy" required className="col-span-3" placeholder="e.g. HR Dept" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Department</Label>
                        <Input name="department" required className="col-span-3" placeholder="e.g. Human Resources" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Amount</Label>
                        <Input name="amount" type="number" step="0.01" required className="col-span-3" placeholder="0.00" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Date</Label>
                        <Input name="date" required className="col-span-3" placeholder="e.g. Oct 15, 2026" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Status</Label>
                        <div className="col-span-3">
                          <Select name="status" required defaultValue="Pending">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PR No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPRs.map(pr => (
              <TableRow key={pr.id}>
                <TableCell className="font-medium">{pr.id}</TableCell>
                <TableCell className="font-semibold">{pr.title}</TableCell>
                <TableCell>{pr.requestedBy}</TableCell>
                <TableCell className="text-muted-foreground">{pr.department}</TableCell>
                <TableCell className="text-right font-medium">{pr.amount}</TableCell>
                <TableCell className="text-muted-foreground">{pr.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={pr.status} />
                    <Badge variant={
                      pr.status === "Approved" ? "default" :
                      pr.status === "Rejected" ? "destructive" : "secondary"
                    } className={
                      pr.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                      pr.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""
                    }>
                      {pr.status}
                    </Badge>
                  </div>
                </TableCell>
                {canApprove && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updatePurchaseRequest(pr.id, { status: "Approved" })}>
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updatePurchaseRequest(pr.id, { status: "Rejected" })}>
                          <XCircle className="w-4 h-4 mr-2 text-rose-500" /> Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(pr)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 focus:text-rose-600" onClick={() => deletePurchaseRequest(pr.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {filteredPRs.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No purchase requests found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      {canApprove && editingPR && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Purchase Request</DialogTitle>
                <DialogDescription>Update request details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Title</Label>
                  <Input name="title" required defaultValue={editingPR.title} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Requested By</Label>
                  <Input name="requestedBy" required defaultValue={editingPR.requestedBy} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Department</Label>
                  <Input name="department" required defaultValue={editingPR.department} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <Input name="amount" type="number" step="0.01" required defaultValue={editingPR.amount.replace('$', '').replace(/,/g, '')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date</Label>
                  <Input name="date" required defaultValue={editingPR.date} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select name="status" required defaultValue={editingPR.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
