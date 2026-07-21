"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Business Reports</h1>
          <p className="text-muted-foreground">Comprehensive analytics, data visualizations, and exportable reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="ytd">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="q3">Q3 2026</SelectItem>
              <SelectItem value="q2">Q2 2026</SelectItem>
              <SelectItem value="2025">Year 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
