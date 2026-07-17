"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HardDrive, TrendingDown, UserCheck, Plus, MoreHorizontal, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const assets = [
  { id: "AST-001", name: "Dell Server Rack", category: "IT Equipment", purchaseDate: "Jan 10, 2023", cost: "$18,000.00", currentValue: "$13,500.00", location: "Main WH", condition: "Good", status: "In Use" },
  { id: "AST-002", name: "Company Van – TC-1204", category: "Vehicles", purchaseDate: "Mar 05, 2022", cost: "$32,000.00", currentValue: "$22,400.00", location: "HQ Garage", condition: "Good", status: "In Use" },
  { id: "AST-003", name: "CNC Machine X200", category: "Machinery", purchaseDate: "Jun 18, 2021", cost: "$75,000.00", currentValue: "$48,750.00", location: "East WH", condition: "Fair", status: "In Use" },
  { id: "AST-004", name: "Office Laptop Fleet (x20)", category: "IT Equipment", purchaseDate: "Aug 01, 2023", cost: "$40,000.00", currentValue: "$32,000.00", location: "Headquarters", condition: "Good", status: "Allocated" },
  { id: "AST-005", name: "Office Furniture Set", category: "Furniture", purchaseDate: "Feb 14, 2020", cost: "$12,000.00", currentValue: "$4,800.00", location: "Headquarters", condition: "Poor", status: "In Use" },
  { id: "AST-006", name: "Industrial Generator", category: "Machinery", purchaseDate: "Nov 11, 2019", cost: "$28,000.00", currentValue: "$5,600.00", location: "Main WH", condition: "Fair", status: "Under Maintenance" },
]

const depreciationSchedule = [
  { id: "AST-001", name: "Dell Server Rack", method: "Straight-Line", usefulLife: "5 Years", annualDep: "$3,600.00", accumulated: "$9,000.00", bookValue: "$9,000.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-002", name: "Company Van", method: "Declining Balance", usefulLife: "8 Years", annualDep: "$5,600.00", accumulated: "$11,200.00", bookValue: "$20,800.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-003", name: "CNC Machine X200", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$7,500.00", accumulated: "$26,250.00", bookValue: "$48,750.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-004", name: "Laptop Fleet (x20)", method: "Straight-Line", usefulLife: "3 Years", annualDep: "$13,333.00", accumulated: "$8,000.00", bookValue: "$32,000.00", lastUpdated: "Dec 31, 2025" },
  { id: "AST-005", name: "Office Furniture", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$1,200.00", accumulated: "$7,200.00", bookValue: "$4,800.00", lastUpdated: "Dec 31, 2025" },
]

const allocations = [
  { id: "ALC-01", asset: "Dell Server Rack", assetId: "AST-001", assignedTo: "IT Department", custodian: "Alice Johnson", department: "Engineering", allocatedDate: "Jan 15, 2023", returnDate: "--", status: "Active" },
  { id: "ALC-02", asset: "Office Laptop Fleet", assetId: "AST-004", assignedTo: "Sales Team", custodian: "Diana Prince", department: "Sales", allocatedDate: "Aug 05, 2023", returnDate: "--", status: "Active" },
  { id: "ALC-03", asset: "Company Van", assetId: "AST-002", assignedTo: "Logistics", custodian: "Bob Smith", department: "Operations", allocatedDate: "Mar 10, 2022", returnDate: "--", status: "Active" },
  { id: "ALC-04", asset: "Industrial Generator", assetId: "AST-006", assignedTo: "Maintenance", custodian: "Charlie Davis", department: "Facilities", allocatedDate: "Nov 20, 2019", returnDate: "Oct 01, 2026", status: "Returned" },
]

const conditionColor = (c: string) =>
  c === "Good" ? "text-emerald-500 border-emerald-500/30" :
  c === "Fair" ? "text-amber-500 border-amber-500/30" :
  "text-rose-500 border-rose-500/30"

export default function AssetManagementPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const totalAssetValue = 205000
  const totalBookValue = 123650
  const totalDepreciation = totalAssetValue - totalBookValue

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Asset Management</h1>
          <p className="text-muted-foreground">Track company assets, manage depreciation, and monitor allocations.</p>
        </div>
        {canManage && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Register Asset
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><HardDrive className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Total Assets</p><p className="text-2xl font-bold">{assets.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full"><HardDrive className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-muted-foreground">Total Purchase Cost</p><p className="text-2xl font-bold">$205,000</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-full"><TrendingDown className="w-5 h-5 text-emerald-500" /></div>
            <div><p className="text-xs text-muted-foreground">Current Book Value</p><p className="text-2xl font-bold text-emerald-600">$123,650</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-muted-foreground">Total Depreciation</p><p className="text-2xl font-bold text-amber-600">$81,350</p></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto mb-6">
          <TabsTrigger value="assets" className="py-2.5 flex items-center gap-2">
            <HardDrive className="w-4 h-4 hidden sm:inline" /> Company Assets
          </TabsTrigger>
          <TabsTrigger value="depreciation" className="py-2.5 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 hidden sm:inline" /> Depreciation
          </TabsTrigger>
          <TabsTrigger value="allocation" className="py-2.5 flex items-center gap-2">
            <UserCheck className="w-4 h-4 hidden sm:inline" /> Asset Allocation
          </TabsTrigger>
        </TabsList>

        {/* Company Assets */}
        <TabsContent value="assets">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Company Assets</CardTitle>
                  <CardDescription>Full register of all physical and digital assets owned by the company.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Asset</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map(a => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                      <TableCell className="font-semibold">{a.name}</TableCell>
                      <TableCell><Badge variant="outline">{a.category}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{a.purchaseDate}</TableCell>
                      <TableCell className="text-right">{a.cost}</TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">{a.currentValue}</TableCell>
                      <TableCell className="text-muted-foreground">{a.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={conditionColor(a.condition)}>{a.condition}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={a.status === "In Use" ? "default" : a.status === "Allocated" ? "secondary" : "outline"}
                          className={a.status === "In Use" ? "bg-emerald-500/10 text-emerald-600" :
                            a.status === "Allocated" ? "bg-blue-500/10 text-blue-600" :
                            "bg-amber-500/10 text-amber-600"}>
                          {a.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Depreciation */}
        <TabsContent value="depreciation">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Depreciation Schedule</CardTitle>
                  <CardDescription>Annual depreciation values calculated per asset using their respective methods.</CardDescription>
                </div>
                {canManage && <Button size="sm" variant="outline">Run Depreciation</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Useful Life</TableHead>
                    <TableHead className="text-right">Annual Dep.</TableHead>
                    <TableHead className="text-right">Accumulated</TableHead>
                    <TableHead className="text-right">Book Value</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {depreciationSchedule.map(d => (
                    <TableRow key={d.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                      <TableCell className="font-semibold">{d.name}</TableCell>
                      <TableCell><Badge variant="outline">{d.method}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{d.usefulLife}</TableCell>
                      <TableCell className="text-right text-amber-600 font-medium">-{d.annualDep}</TableCell>
                      <TableCell className="text-right text-rose-500 font-medium">-{d.accumulated}</TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">{d.bookValue}</TableCell>
                      <TableCell className="text-muted-foreground">{d.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-bold border-t-2">
                    <TableCell colSpan={4}>TOTALS</TableCell>
                    <TableCell className="text-right text-amber-600">-$31,233/yr</TableCell>
                    <TableCell className="text-right text-rose-500">-$61,650</TableCell>
                    <TableCell className="text-right text-emerald-600">$114,350</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Asset Allocation */}
        <TabsContent value="allocation">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Track which assets are assigned to which employees or departments.</CardDescription>
                </div>
                {canManage && <Button size="sm"><Plus className="w-4 h-4 mr-1" />Allocate Asset</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Allocation ID</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Custodian</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Allocated Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map(alc => (
                    <TableRow key={alc.id}>
                      <TableCell className="font-medium text-muted-foreground">{alc.id}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{alc.asset}</div>
                        <div className="text-xs text-muted-foreground font-mono">{alc.assetId}</div>
                      </TableCell>
                      <TableCell>{alc.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {alc.custodian.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{alc.custodian}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{alc.department}</TableCell>
                      <TableCell className="text-muted-foreground">{alc.allocatedDate}</TableCell>
                      <TableCell className="text-muted-foreground">{alc.returnDate}</TableCell>
                      <TableCell>
                        <Badge variant={alc.status === "Active" ? "default" : "secondary"}
                          className={alc.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "text-muted-foreground"}>
                          {alc.status}
                        </Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell>
                          {alc.status === "Active" && (
                            <Button size="sm" variant="outline" className="text-xs">Return</Button>
                          )}
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
