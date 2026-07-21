"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function SlipsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Salary Slips Archive</CardTitle>
        <CardDescription>Generate or download historical payslips for employees.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 border rounded-lg mb-4 bg-muted/20">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <div><h4 className="font-medium">Batch Generate Slips</h4><p className="text-xs text-muted-foreground">Generate PDFs for October 2026</p></div>
          </div>
          <Button variant="secondary">Generate All</Button>
        </div>
      </CardContent>
    </Card>
  )
}
