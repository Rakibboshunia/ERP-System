"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Paperclip, MoreHorizontal } from "lucide-react"

const attachments = [
  { id: "ATT-301", fileName: "Invoice_INV-4201.pdf", relatedTo: "Invoice #INV-4201", entity: "Sales", date: "Oct 18, 2026" },
  { id: "ATT-302", fileName: "Signed_PO_4101.pdf", relatedTo: "Purchase Order #PO-4101", entity: "Procurement", date: "Oct 16, 2026" },
  { id: "ATT-303", fileName: "Customer_ID_Scan.jpg", relatedTo: "Customer #CUST-002", entity: "CRM", date: "Oct 12, 2026" },
]

export default function AttachmentsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader><CardTitle>Module Attachments</CardTitle><CardDescription>Files attached to specific records across the ERP system.</CardDescription></CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>File Name</TableHead><TableHead>Related To</TableHead><TableHead>Module</TableHead><TableHead>Date</TableHead><TableHead /></TableRow></TableHeader>
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
  )
}
