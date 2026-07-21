"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download } from "lucide-react"

const salesData = [
  { month: "Jan", sales: 45000, target: 40000 },
  { month: "Feb", sales: 52000, target: 45000 },
  { month: "Mar", sales: 48000, target: 50000 },
  { month: "Apr", sales: 61000, target: 55000 },
  { month: "May", sales: 59000, target: 60000 },
  { month: "Jun", sales: 65000, target: 62000 },
  { month: "Jul", sales: 72000, target: 65000 },
]

const topProducts = [
  { name: "Dell XPS 15", units: 124, revenue: "$235,476" },
  { name: "MacBook Pro M3", units: 89, revenue: "$222,411" },
  { name: "Ergonomic Chair", units: 156, revenue: "$155,844" },
]

export default function SalesReportPage() {
  return (
    <div className="grid gap-6 mt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sales Performance</h2>
        <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader><CardTitle>Revenue vs Target</CardTitle><CardDescription>Monthly sales revenue compared to set targets.</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }} />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Sales" />
                <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Top Selling Products</CardTitle><CardDescription>By revenue generated.</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Product</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader>
              <TableBody>
                {topProducts.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.units} units sold</div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-emerald-600">{p.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
