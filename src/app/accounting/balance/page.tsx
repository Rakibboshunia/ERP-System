"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BalancePage() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-0">
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Assets</CardTitle></CardHeader>
        <CardContent>
          {[
            { name: "Cash & Equivalents", val: "$124,500" }, 
            { name: "Accounts Receivable", val: "$45,231" }, 
            { name: "Inventory", val: "$320,000" }, 
            { name: "Fixed Assets", val: "$250,000" }
          ].map(a => (
            <div key={a.name} className="flex justify-between py-2 border-b last:border-0"><span className="text-sm">{a.name}</span><span className="font-semibold">{a.val}</span></div>
          ))}
          <div className="flex justify-between pt-3 font-bold text-emerald-600"><span>Total Assets</span><span>$739,731</span></div>
        </CardContent>
      </Card>
      <Card className="border-border/50 shadow-sm">
        <CardHeader><CardTitle>Liabilities & Equity</CardTitle></CardHeader>
        <CardContent>
          {[
            { name: "Accounts Payable", val: "$33,700" }, 
            { name: "Short-term Loans", val: "$50,000" }, 
            { name: "Long-term Debt", val: "$150,000" }, 
            { name: "Owner's Equity", val: "$400,000" }, 
            { name: "Retained Earnings", val: "$106,031" }
          ].map(l => (
            <div key={l.name} className="flex justify-between py-2 border-b last:border-0"><span className="text-sm">{l.name}</span><span className="font-semibold">{l.val}</span></div>
          ))}
          <div className="flex justify-between pt-3 font-bold text-rose-500"><span>Total L & E</span><span>$739,731</span></div>
        </CardContent>
      </Card>
    </div>
  )
}
