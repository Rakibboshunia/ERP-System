"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, MapPin, Network, UserSquare2, CalendarDays, Edit, Trash2, Plus, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useStore, Branch, Department, Designation } from "@/store/useStore"

const fiscalYears = [
  { id: "FY-24", title: "Fiscal Year 2024", startDate: "Jan 01, 2024", endDate: "Dec 31, 2024", status: "Active" },
  { id: "FY-23", title: "Fiscal Year 2023", startDate: "Jan 01, 2023", endDate: "Dec 31, 2023", status: "Closed" },
]

export default function CompanyManagementPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])
  
  const { 
    branches, addBranch, deleteBranch,
    departments, addDepartment, deleteDepartment,
    designations, addDesignation, deleteDesignation
  } = useStore()

  // Dialog states
  const [isBranchOpen, setIsBranchOpen] = React.useState(false)
  const [isDeptOpen, setIsDeptOpen] = React.useState(false)
  const [isDesigOpen, setIsDesigOpen] = React.useState(false)

  // Handlers
  const handleAddBranch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newBranch: Branch = {
      id: `BR-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      head: formData.get("head") as string,
      status: formData.get("status") as "Active" | "Inactive"
    }
    addBranch(newBranch)
    setIsBranchOpen(false)
  }

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDept: Department = {
      id: `D-${Date.now().toString().slice(-4)}`,
      name: formData.get("name") as string,
      branch: formData.get("branch") as string,
      head: formData.get("head") as string,
      empCount: Number(formData.get("empCount")) || 0
    }
    addDepartment(newDept)
    setIsDeptOpen(false)
  }

  const handleAddDesignation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDesig: Designation = {
      id: `DS-${Date.now().toString().slice(-4)}`,
      title: formData.get("title") as string,
      department: formData.get("department") as string,
      level: formData.get("level") as string
    }
    addDesignation(newDesig)
    setIsDesigOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Company Management</h1>
        <p className="text-muted-foreground">Manage your company profile, branches, and organizational structure.</p>
      </div>

      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
          <TabsTrigger value="profile" className="py-2.5 flex items-center gap-2">
            <Building2 className="w-4 h-4" /> <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="branches" className="py-2.5 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> <span className="hidden md:inline">Branches</span>
          </TabsTrigger>
          <TabsTrigger value="departments" className="py-2.5 flex items-center gap-2">
            <Network className="w-4 h-4" /> <span className="hidden md:inline">Departments</span>
          </TabsTrigger>
          <TabsTrigger value="designations" className="py-2.5 flex items-center gap-2">
            <UserSquare2 className="w-4 h-4" /> <span className="hidden md:inline">Designations</span>
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="py-2.5 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> <span className="hidden md:inline">Fiscal Year</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Update your main company information and contact details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Enterprise ERP Corp" readOnly={!isAdmin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="contact@enterprise-erp.com" readOnly={!isAdmin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" readOnly={!isAdmin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://enterprise-erp.com" readOnly={!isAdmin} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Innovation Drive, Tech City, TC 90210" readOnly={!isAdmin} />
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex justify-end">
                    <Button type="button">Save Changes</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branches Tab */}
        <TabsContent value="branches" className="mt-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Branches</CardTitle>
                  <CardDescription>Manage your company locations and branches.</CardDescription>
                </div>
                {isAdmin && (
                  <Dialog open={isBranchOpen} onOpenChange={setIsBranchOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Branch</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleAddBranch}>
                        <DialogHeader><DialogTitle>Add New Branch</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2"><Label>Branch Name</Label><Input name="name" required placeholder="e.g. West Coast Hub" /></div>
                          <div className="space-y-2"><Label>Location</Label><Input name="location" required placeholder="e.g. Los Angeles" /></div>
                          <div className="space-y-2"><Label>Branch Head</Label><Input name="head" required placeholder="e.g. John Doe" /></div>
                          <div className="space-y-2"><Label>Status</Label>
                            <Select name="status" defaultValue="Active">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter><Button type="button" variant="outline" onClick={() => setIsBranchOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Branch ID</TableHead><TableHead>Name</TableHead><TableHead>Location</TableHead><TableHead>Branch Head</TableHead><TableHead>Status</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
                </TableHeader>
                <TableBody>
                  {branches.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No branches found.</TableCell></TableRow>
                  ) : branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium text-xs text-muted-foreground">{branch.id}</TableCell>
                      <TableCell className="font-medium">{branch.name}</TableCell>
                      <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                      <TableCell>{branch.head}</TableCell>
                      <TableCell>
                        <Badge variant={branch.status === "Active" ? "default" : "secondary"} className={branch.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>
                          {branch.status}
                        </Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-rose-500" onClick={() => deleteBranch(branch.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
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
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="mt-6">
           <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Departments</CardTitle><CardDescription>Manage organizational departments.</CardDescription></div>
                {isAdmin && (
                  <Dialog open={isDeptOpen} onOpenChange={setIsDeptOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Department</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleAddDepartment}>
                        <DialogHeader><DialogTitle>Add New Department</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2"><Label>Department Name</Label><Input name="name" required placeholder="e.g. IT Support" /></div>
                          <div className="space-y-2"><Label>Assigned Branch</Label>
                            <Select name="branch" defaultValue={branches[0]?.name || "Headquarters"}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {branches.map(b => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}
                                <SelectItem value="All Branches">All Branches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2"><Label>Department Head</Label><Input name="head" required placeholder="e.g. Jane Smith" /></div>
                          <div className="space-y-2"><Label>Initial Employee Count</Label><Input name="empCount" type="number" defaultValue="0" /></div>
                        </div>
                        <DialogFooter><Button type="button" variant="outline" onClick={() => setIsDeptOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Dept ID</TableHead><TableHead>Department Name</TableHead><TableHead>Assigned Branch</TableHead><TableHead>Dept Head</TableHead><TableHead className="text-right">Employees</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
                </TableHeader>
                <TableBody>
                  {departments.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No departments found.</TableCell></TableRow>
                  ) : departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium text-xs text-muted-foreground">{dept.id}</TableCell>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell className="text-muted-foreground">{dept.branch}</TableCell>
                      <TableCell>{dept.head}</TableCell>
                      <TableCell className="text-right font-medium">{dept.empCount}</TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-rose-500" onClick={() => deleteDepartment(dept.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
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
        </TabsContent>

        {/* Designations Tab */}
        <TabsContent value="designations" className="mt-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Designations</CardTitle><CardDescription>Manage job titles and hierarchy levels.</CardDescription></div>
                {isAdmin && (
                  <Dialog open={isDesigOpen} onOpenChange={setIsDesigOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Designation</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleAddDesignation}>
                        <DialogHeader><DialogTitle>Add New Designation</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2"><Label>Job Title</Label><Input name="title" required placeholder="e.g. Senior Developer" /></div>
                          <div className="space-y-2"><Label>Department</Label>
                            <Select name="department" defaultValue={departments[0]?.name || "Engineering"}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2"><Label>Level</Label>
                            <Select name="level" defaultValue="Mid">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Junior">Junior</SelectItem>
                                <SelectItem value="Mid">Mid</SelectItem>
                                <SelectItem value="Senior">Senior</SelectItem>
                                <SelectItem value="Lead">Lead</SelectItem>
                                <SelectItem value="Director">Director</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter><Button type="button" variant="outline" onClick={() => setIsDesigOpen(false)}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>ID</TableHead><TableHead>Job Title</TableHead><TableHead>Department</TableHead><TableHead>Level</TableHead>{isAdmin && <TableHead className="text-right">Actions</TableHead>}</TableRow>
                </TableHeader>
                <TableBody>
                  {designations.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No designations found.</TableCell></TableRow>
                  ) : designations.map((desig) => (
                    <TableRow key={desig.id}>
                      <TableCell className="font-medium text-xs text-muted-foreground">{desig.id}</TableCell>
                      <TableCell className="font-medium">{desig.title}</TableCell>
                      <TableCell className="text-muted-foreground">{desig.department}</TableCell>
                      <TableCell><Badge variant="outline">{desig.level}</Badge></TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-rose-500" onClick={() => deleteDesignation(desig.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
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
        </TabsContent>

        {/* Fiscal Year Tab */}
        <TabsContent value="fiscal" className="mt-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Fiscal Years</CardTitle><CardDescription>Manage accounting and fiscal periods.</CardDescription></div>
                {isAdmin && <Button size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Add Fiscal Year</Button>}
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
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
