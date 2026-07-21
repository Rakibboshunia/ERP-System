"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Banknote } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FinancialReportPage() {
  const router = useRouter()
  return (
    <Card className="border-border/50 shadow-sm border-dashed mt-0">
      <CardContent className="pt-6 flex flex-col items-center justify-center h-64 text-center">
        <Banknote className="w-12 h-12 mb-4 text-muted-foreground opacity-50" />
        <h3 className="font-semibold text-lg mb-1">Financial Statements Module</h3>
        <p className="text-muted-foreground text-sm max-w-md mb-4">Detailed P&L, Balance Sheet, and Cash Flow statements are managed natively in the Accounting module.</p>
        <Button onClick={() => router.push("/accounting/pl")}>Go to Accounting Hub</Button>
      </CardContent>
    </Card>
  )
}
