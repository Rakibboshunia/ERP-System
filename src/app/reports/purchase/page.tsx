"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download } from "lucide-react"

const purchaseData = [
  { month: "Jan", purchases: 25000 },
  { month: "Feb", purchases: 32000 },
  { month: "Mar", purchases: 28000 },
  { month: "Apr", purchases: 35000 },
  { month: "May", purchases: 31000 },
  { month: "Jun", purchases: 38000 },
  { month: "Jul", purchases: 42000 },
]

export default function PurchaseReportPage() {
  return (
    <div className="grid gap-6 mt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Procurement Analysis</h2>
        <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
      </div>
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Monthly Purchase Volume</CardTitle><CardDescription>Total expenditure on vendor purchase orders.</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={purchaseData} margin={{ left: 0, right: 20, top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
              <Line type="monotone" dataKey="purchases" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} name="Total Purchases" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
