"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const plData = [
  { month: "Jan", income: 45000, expense: 32000 },
  { month: "Feb", income: 52000, expense: 34000 },
  { month: "Mar", income: 48000, expense: 31000 },
  { month: "Apr", income: 61000, expense: 38000 },
  { month: "May", income: 59000, expense: 42000 },
  { month: "Jun", income: 65000, expense: 39000 },
  { month: "Jul", income: 72000, expense: 44000 },
]

export default function PlPage() {
  return (
    <div className="grid gap-6 mt-0">
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Profit & Loss Statement</CardTitle><CardDescription>Income vs expenses over the last 7 months.</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={plData} margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
              <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", val: "$512,000", cls: "text-emerald-600" }, 
          { label: "Total Expenses", val: "$398,000", cls: "text-rose-500" }, 
          { label: "Net Profit", val: "$114,000", cls: "text-primary" }
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground text-sm">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.cls}`}>{s.val}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
