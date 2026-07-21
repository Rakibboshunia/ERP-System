"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Download } from "lucide-react"

const inventoryValuation = [
  { name: "Electronics", value: 185000, color: "#10b981" },
  { name: "Furniture", value: 65000, color: "#3b82f6" },
  { name: "Accessories", value: 45000, color: "#f59e0b" },
  { name: "Stationery", value: 12000, color: "#8b5cf6" },
]

export default function InventoryReportPage() {
  return (
    <div className="grid gap-6 mt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Inventory Valuation</h2>
        <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2" /> Export XLS</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Value by Category</CardTitle><CardDescription>Current stock value distribution.</CardDescription></CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={inventoryValuation} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
                    {inventoryValuation.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader><CardTitle>Category Details</CardTitle><CardDescription>Breakdown of stock valuations.</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              {inventoryValuation.map(cat => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold">${cat.value.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 flex items-center justify-between font-bold text-lg">
                <span>Total Valuation</span>
                <span>${inventoryValuation.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
