"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadCloud, FileText, Download, Paperclip, Plus, Search, MoreHorizontal, File, FolderOpen } from "lucide-react"

const uploadedFiles = [
  { id: "DOC-001", name: "Q3_Financial_Report.pdf", size: "2.4 MB", type: "PDF", uploader: "Accountant", date: "Oct 16, 2026" },
  { id: "DOC-002", name: "Employee_Handbook_2026.docx", size: "1.8 MB", type: "Word", uploader: "HR Dept", date: "Oct 15, 2026" },
  { id: "DOC-003", name: "Marketing_Assets_v2.zip", size: "45.2 MB", type: "Archive", uploader: "Marketing", date: "Oct 14, 2026" },
  { id: "DOC-004", name: "Inventory_Count_Oct.xlsx", size: "850 KB", type: "Excel", uploader: "Inv. Manager", date: "Oct 10, 2026" },
]

const contracts = [
  { id: "CTR-101", title: "Enterprise Service Agreement", party: "Acme Corp", validUntil: "Dec 31, 2027", status: "Active" },
  { id: "CTR-102", title: "Vendor Supply Contract", party: "TechParts Inc.", validUntil: "Jun 30, 2026", status: "Expired" },
  { id: "CTR-103", title: "Software Licensing", party: "Microsoft", validUntil: "Mar 15, 2028", status: "Active" },
  { id: "CTR-104", title: "Office Lease Agreement", party: "City Real Estate", validUntil: "Jan 01, 2030", status: "Active" },
]

const exportsLog = [
  { id: "EXP-201", report: "Monthly Sales Summary", format: "PDF", generatedBy: "Sales Manager", date: "Oct 17, 2026, 09:45 AM", status: "Ready" },
  { id: "EXP-202", report: "Q3 Profit & Loss", format: "PDF", generatedBy: "Accountant", date: "Oct 16, 2026, 14:20 PM", status: "Ready" },
  { id: "EXP-203", report: "Employee Directory", format: "PDF", generatedBy: "HR Dept", date: "Oct 15, 2026, 11:10 AM", status: "Ready" },
]

const attachments = [
  { id: "ATT-301", fileName: "Invoice_INV-4201.pdf", relatedTo: "Invoice #INV-4201", entity: "Sales", date: "Oct 18, 2026" },
  { id: "ATT-302", fileName: "Signed_PO_4101.pdf", relatedTo: "Purchase Order #PO-4101", entity: "Procurement", date: "Oct 16, 2026" },
  { id: "ATT-303", fileName: "Customer_ID_Scan.jpg", relatedTo: "Customer #CUST-002", entity: "CRM", date: "Oct 12, 2026" },
]

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Document Management</h1>
          <p className="text-muted-foreground">Centralized repository for files, contracts, and exported reports.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Files", value: "1,245", icon: FolderOpen, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Contracts", value: "32", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Recent Exports", value: "14", icon: Download, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Total Storage", value: "4.2 GB", icon: UploadCloud, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map(k => (
          <Card key={k.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-6 flex items-center gap-3">
              <div className={`${k.bg} p-2 rounded-full`}><k.icon className={`w-5 h-5 ${k.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{k.label}</p><p className="text-2xl font-bold">{k.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto mb-6">
          <TabsTrigger value="files" className="py-2.5 flex items-center gap-2"><UploadCloud className="w-4 h-4 hidden sm:inline" /> File Upload</TabsTrigger>
          <TabsTrigger value="contracts" className="py-2.5 flex items-center gap-2"><FileText className="w-4 h-4 hidden sm:inline" /> Contracts</TabsTrigger>
          <TabsTrigger value="exports" className="py-2.5 flex items-center gap-2"><Download className="w-4 h-4 hidden sm:inline" /> PDF Export</TabsTrigger>
          <TabsTrigger value="attachments" className="py-2.5 flex items-center gap-2"><Paperclip className="w-4 h-4 hidden sm:inline" /> Attachments</TabsTrigger>
        </TabsList>

        {/* File Uploads */}
        <TabsContent value="files">
          <div className="grid gap-6">
            <Card className="border-border/50 shadow-sm border-dashed">
              <CardContent className="pt-6 flex flex-col items-center justify-center h-48 text-muted-foreground">
                <UploadCloud className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-medium text-foreground">Drag & drop files here</p>
                <p className="text-sm mt-1 mb-4">or click to browse from your computer</p>
                <Button size="sm">Browse Files</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div><CardTitle>Uploaded Files</CardTitle><CardDescription>General company documents and shared files.</CardDescription></div>
                  <div className="relative w-48"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search files..." className="pl-8" /></div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>File Name</TableHead><TableHead>Type</TableHead><TableHead>Size</TableHead><TableHead>Uploaded By</TableHead><TableHead>Date</TableHead><TableHead></TableHead></TableRow></TableHeader>
                  <TableBody>
                    {uploadedFiles.map(f => (
                      <TableRow key={f.id}>
                        <TableCell className="font-medium flex items-center gap-2"><File className="w-4 h-4 text-muted-foreground" /> {f.name}</TableCell>
                        <TableCell><Badge variant="outline">{f.type}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{f.size}</TableCell>
                        <TableCell>{f.uploader}</TableCell>
                        <TableCell className="text-muted-foreground">{f.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contracts */}
        <TabsContent value="contracts">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Contracts</CardTitle><CardDescription>Legal agreements and vendor contracts.</CardDescription></div>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Contract</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Contract ID</TableHead><TableHead>Title</TableHead><TableHead>Party / Vendor</TableHead><TableHead>Valid Until</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {contracts.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                      <TableCell className="font-semibold">{c.title}</TableCell>
                      <TableCell>{c.party}</TableCell>
                      <TableCell className="text-muted-foreground">{c.validUntil}</TableCell>
                      <TableCell>
                        <Badge variant={c.status === "Active" ? "default" : "destructive"} className={c.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : ""}>{c.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PDF Export */}
        <TabsContent value="exports">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Generated Reports</CardTitle><CardDescription>System-generated PDF exports and reports.</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Export ID</TableHead><TableHead>Report Name</TableHead><TableHead>Format</TableHead><TableHead>Generated By</TableHead><TableHead>Date / Time</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {exportsLog.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{e.id}</TableCell>
                      <TableCell className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-rose-500" /> {e.report}</TableCell>
                      <TableCell><Badge variant="outline">{e.format}</Badge></TableCell>
                      <TableCell>{e.generatedBy}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{e.date}</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Download</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attachments */}
        <TabsContent value="attachments">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Module Attachments</CardTitle><CardDescription>Files attached to specific records across the ERP system.</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>File Name</TableHead><TableHead>Related To</TableHead><TableHead>Module</TableHead><TableHead>Date</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {attachments.map(a => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                      <TableCell className="font-medium flex items-center gap-2"><Paperclip className="w-4 h-4 text-muted-foreground" /> {a.fileName}</TableCell>
                      <TableCell className="text-primary text-sm">{a.relatedTo}</TableCell>
                      <TableCell><Badge variant="secondary">{a.entity}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{a.date}</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
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
