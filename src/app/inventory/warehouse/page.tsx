"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const warehouses = [
  { id: "WH-01", name: "Main Warehouse", location: "Tech City", capacity: 5000, used: 3800, manager: "Tom Riley" },
  { id: "WH-02", name: "East Hub", location: "New York", capacity: 2000, used: 1100, manager: "Sara Kim" },
]

export default function WarehousePage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div><CardTitle>Warehouses</CardTitle><CardDescription>Physical storage locations and capacity.</CardDescription></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {warehouses.map(wh => {
            const pct = Math.round((wh.used / wh.capacity) * 100)
            return (
              <Card key={wh.id} className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{wh.name}</CardTitle>
                  <CardDescription>{wh.location} · {wh.manager}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Capacity used</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct > 85 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{wh.used.toLocaleString()} units used</span>
                    <span>{wh.capacity.toLocaleString()} total</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
