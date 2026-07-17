"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Target, Calendar, ClipboardList, Plus, Search, MoreHorizontal, MessageSquare, Phone, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

const customers = [
  { id: "CUST-001", name: "Acme Corp", contact: "John Doe", email: "john@acme.corp", phone: "+1 (555) 123-4567", status: "Active" },
  { id: "CUST-002", name: "Stark Industries", contact: "Tony Stark", email: "tony@stark.com", phone: "+1 (555) 987-6543", status: "Active" },
  { id: "CUST-003", name: "Wayne Enterprises", contact: "Bruce Wayne", email: "bruce@wayne.com", phone: "+1 (555) 555-5555", status: "Inactive" },
]

const leads = [
  { id: "LD-101", name: "LexCorp", contact: "Lex Luthor", source: "Website", status: "New", score: 85 },
  { id: "LD-102", name: "Daily Planet", contact: "Perry White", source: "Referral", status: "Contacted", score: 60 },
  { id: "LD-103", name: "Queen Consolidated", contact: "Oliver Queen", source: "Cold Call", status: "Qualified", score: 92 },
]

const meetings = [
  { id: 1, title: "Q3 Review & Renewals", client: "Acme Corp", date: "Oct 18, 2026", time: "10:00 AM", type: "Video Call" },
  { id: 2, title: "Product Demo", client: "LexCorp", date: "Oct 19, 2026", time: "02:00 PM", type: "In Person" },
]

const notes = [
  { id: 1, client: "Wayne Enterprises", author: "Sales Manager", text: "Client requested a delay in the rollout until next quarter.", date: "2 hours ago" },
  { id: 2, client: "Stark Industries", author: "Account Exec", text: "Sent the updated pricing proposal. Awaiting feedback.", date: "Yesterday" },
  { id: 3, client: "Daily Planet", author: "Sales Rep", text: "Initial contact made. They are interested in the enterprise tier.", date: "2 days ago" },
]

export default function CRMPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage your entire sales pipeline, customers, and interactions.</p>
        </div>
        {canManageCRM && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </Button>
        )}
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto mb-6">
          <TabsTrigger value="customers" className="py-2.5 flex items-center gap-2">
            <Users className="w-4 h-4 hidden sm:inline" /> Customers
          </TabsTrigger>
          <TabsTrigger value="leads" className="py-2.5 flex items-center gap-2">
            <Filter className="w-4 h-4 hidden sm:inline" /> Leads
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="py-2.5 flex items-center gap-2">
            <Target className="w-4 h-4 hidden sm:inline" /> Opportunities
          </TabsTrigger>
          <TabsTrigger value="meetings" className="py-2.5 flex items-center gap-2">
            <Calendar className="w-4 h-4 hidden sm:inline" /> Meetings
          </TabsTrigger>
          <TabsTrigger value="notes" className="py-2.5 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 hidden sm:inline" /> Customer Notes
          </TabsTrigger>
        </TabsList>
        
        {/* Customer Management */}
        <TabsContent value="customers">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>A comprehensive directory of your onboarded clients.</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search customers..." className="w-full bg-background pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Status</TableHead>
                    {canManageCRM && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((cust) => (
                    <TableRow key={cust.id}>
                      <TableCell className="font-medium text-muted-foreground">{cust.id}</TableCell>
                      <TableCell className="font-semibold">{cust.name}</TableCell>
                      <TableCell>{cust.contact}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3"/> {cust.phone}</span>
                          <span className="text-muted-foreground">{cust.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={cust.status === "Active" ? "default" : "secondary"} className={cust.status === "Active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}>
                          {cust.status}
                        </Badge>
                      </TableCell>
                      {canManageCRM && (
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leads */}
        <TabsContent value="leads">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leads</CardTitle>
                  <CardDescription>Manage and qualify new prospective clients.</CardDescription>
                </div>
                {canManageCRM && <Button size="sm" variant="outline">Import Leads</Button>}
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
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities / Pipeline */}
        <TabsContent value="opportunities">
          <Card className="border-border/50 shadow-sm bg-transparent border-none shadow-none">
            <CardHeader className="px-0">
              <CardTitle>Opportunities Pipeline</CardTitle>
              <CardDescription>Kanban board for tracking qualified leads and deals.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Discovery Stage */}
                <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex justify-between">
                    <span>Discovery</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full text-xs">2</span>
                  </h3>
                  <div className="space-y-3">
                    <Card className="shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold">TechCorp Upgrade</div>
                        <div className="text-muted-foreground mt-1">Acme Corp</div>
                        <div className="text-primary font-medium mt-3">$5,000</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold">Cloud Migration</div>
                        <div className="text-muted-foreground mt-1">Stark Ind.</div>
                        <div className="text-primary font-medium mt-3">$12,000</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Contacted Stage */}
                <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex justify-between">
                    <span>Negotiation</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full text-xs">1</span>
                  </h3>
                  <div className="space-y-3">
                    <Card className="shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold">Consulting Retainer</div>
                        <div className="text-muted-foreground mt-1">Wayne Ent.</div>
                        <div className="text-primary font-medium mt-3">$2,500/mo</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Proposal Stage */}
                <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex justify-between">
                    <span>Proposal Sent</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full text-xs">1</span>
                  </h3>
                  <div className="space-y-3">
                    <Card className="shadow-sm cursor-pointer hover:border-primary/50 transition-colors border-l-4 border-l-amber-500">
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold">ERP Implementation</div>
                        <div className="text-muted-foreground mt-1">Oscorp</div>
                        <div className="text-primary font-medium mt-3">$45,000</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Won Stage */}
                <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex justify-between">
                    <span>Closed Won</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full text-xs">0</span>
                  </h3>
                  <div className="h-24 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                    Drag deals here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meetings */}
        <TabsContent value="meetings">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meetings</CardTitle>
                  <CardDescription>Upcoming appointments and client calls.</CardDescription>
                </div>
                {canManageCRM && <Button size="sm">Schedule</Button>}
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
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes */}
        <TabsContent value="notes">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Customer Notes</CardTitle>
              <CardDescription>Activity logs and interactions with clients.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 border rounded-xl bg-muted/10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">{note.client}</span>
                        <span className="text-xs text-muted-foreground px-2">—</span>
                        <span className="text-xs text-muted-foreground">{note.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm pl-6">{note.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
