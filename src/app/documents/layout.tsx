"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, FileText, Download, UploadCloud } from "lucide-react"

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Document Management</h1>
        <p className="text-muted-foreground">Centralized repository for files, contracts, and exported reports.</p>
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
      <div className="w-full">{children}</div>
    </div>
  )
}
