"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity, ArrowUpRight, ArrowDownRight, ShoppingCart, Bell, CheckSquare, Package, PackageOpen } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, AreaChart, Area, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

const revenueData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 2000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 2000 },
]

const salesData = [
  { name: "Mon", sales: 4000, purchases: 2400 },
  { name: "Tue", sales: 3000, purchases: 1398 },
  { name: "Wed", sales: 2000, purchases: 9800 },
  { name: "Thu", sales: 2780, purchases: 3908 },
  { name: "Fri", sales: 1890, purchases: 4800 },
  { name: "Sat", sales: 2390, purchases: 3800 },
  { name: "Sun", sales: 3490, purchases: 4300 },
]

const todaysOrders = [
  { id: "ORD-001", customer: "Acme Corp", amount: "$1,250.00", status: "Completed", time: "10:23 AM" },
  { id: "ORD-002", customer: "Stark Industries", amount: "$5,400.00", status: "Processing", time: "11:45 AM" },
  { id: "ORD-003", customer: "Wayne Enterprises", amount: "$3,200.00", status: "Pending", time: "01:15 PM" },
  { id: "ORD-004", customer: "Oscorp", amount: "$890.00", status: "Completed", time: "02:30 PM" },
  { id: "ORD-005", customer: "Globex", amount: "$12,450.00", status: "Processing", time: "03:45 PM" },
]

const pendingTasks = [
  { id: 1, title: "Review Q3 Marketing Budget", assignee: "Alice", priority: "High" },
  { id: 2, title: "Approve Leave Requests", assignee: "HR Dept", priority: "Medium" },
  { id: 3, title: "Follow up with Wayne Ent.", assignee: "Sales", priority: "High" },
  { id: 4, title: "Update Server Infrastructure", assignee: "IT", priority: "Low" },
]

const notifications = [
  { id: 1, text: "New order received from Stark Industries", time: "5 min ago", type: "order" },
  { id: 2, text: "System maintenance scheduled for midnight", time: "1 hour ago", type: "system" },
  { id: 3, text: "Leave request approved for Bob", time: "2 hours ago", type: "hr" },
  { id: 4, text: "Invoice INV-2041 marked as paid", time: "3 hours ago", type: "finance" },
]

export default function DashboardPage() {
  const { hasPermission } = useAuth()
  const canViewFinancials = hasPermission(["superadmin", "admin", "sales_manager", "accountant"])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Comprehensive overview of your business operations today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {canViewFinancials && (
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-emerald-500 flex items-center font-medium mr-1"><ArrowUpRight className="w-3 h-3 mr-0.5" />+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        )}
        
        {canViewFinancials && (
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-emerald-500 flex items-center font-medium mr-1"><ArrowUpRight className="w-3 h-3 mr-0.5" />+19%</span> from last month
              </p>
            </CardContent>
          </Card>
        )}

        {canViewFinancials && (
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Purchases</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingCart className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,110.00</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-rose-500 flex items-center font-medium mr-1"><ArrowDownRight className="w-3 h-3 mr-0.5" />-4.5%</span> from last month
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-500 flex items-center font-medium mr-1"><ArrowUpRight className="w-3 h-3 mr-0.5" />+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Revenue Analytics & Today's Orders */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {canViewFinancials && (
          <Card className="col-span-4 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Monthly revenue overview for the current fiscal year.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted) / 0.5)' }} 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <Card className={`border-border/50 shadow-sm flex flex-col ${canViewFinancials ? 'col-span-3' : 'col-span-7'}`}>
          <CardHeader>
            <CardTitle>Today's Orders</CardTitle>
            <CardDescription>Live feed of orders received today.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  {canViewFinancials && <TableHead className="text-right">Amount</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{order.customer}</span>
                        <span className="text-xs text-muted-foreground">{order.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === "Completed" ? "default" : 
                        order.status === "Processing" ? "secondary" : 
                        order.status === "Failed" ? "destructive" : "outline"
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    {canViewFinancials && <TableCell className="text-right font-medium">{order.amount}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Sales Chart & Purchase Summary */}
      {canViewFinancials && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Sales vs Purchases</CardTitle>
              <CardDescription>Daily comparison of sales and purchase volume.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }} />
                  <Legend verticalAlign="top" height={36}/>
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="purchases" stroke="#f43f5e" fillOpacity={1} fill="url(#colorPurchases)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Purchase Summary</CardTitle>
              <CardDescription>Overview of recent procurement activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><PackageOpen className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="text-sm font-medium">Pending Deliveries</p>
                      <p className="text-xs text-muted-foreground">Expected this week</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg">12</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/10 p-2 rounded-full"><Package className="w-5 h-5 text-amber-500" /></div>
                    <div>
                      <p className="text-sm font-medium">Low Stock Items</p>
                      <p className="text-xs text-muted-foreground">Needs reordering</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-amber-500">24</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-500/10 p-2 rounded-full"><CheckSquare className="w-5 h-5 text-rose-500" /></div>
                    <div>
                      <p className="text-sm font-medium">Unpaid POs</p>
                      <p className="text-xs text-muted-foreground">Awaiting accounts payable</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-rose-500">5</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Row 4: Pending Tasks & Notifications */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border/50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Tasks requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead className="text-right">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell className="text-muted-foreground">{task.assignee}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={
                        task.priority === "High" ? "destructive" : 
                        task.priority === "Medium" ? "default" : "secondary"
                      } className={task.priority === "Medium" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" : ""}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border/50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent system alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {notifications.map((note) => (
                <div key={note.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    {note.type === "order" && <ShoppingCart className="w-4 h-4 text-emerald-500" />}
                    {note.type === "system" && <Bell className="w-4 h-4 text-blue-500" />}
                    {note.type === "hr" && <Users className="w-4 h-4 text-purple-500" />}
                    {note.type === "finance" && <DollarSign className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{note.text}</span>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
