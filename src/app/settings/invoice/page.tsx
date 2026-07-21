"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"

export default function InvoiceSettingsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Invoice Templates</CardTitle>
        <CardDescription>Customize how your PDF invoices look when sent to clients.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-primary rounded-lg p-2 cursor-pointer">
            <div className="aspect-[1/1.4] bg-muted/30 border rounded mb-2 flex items-center justify-center text-xs text-muted-foreground relative">
              <Badge className="absolute top-2 right-2 bg-primary">Active</Badge>
              Standard Layout
            </div>
            <p className="text-center font-medium text-sm">Classic</p>
          </div>
          <div className="border-2 border-transparent rounded-lg p-2 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="aspect-[1/1.4] bg-muted/30 border rounded mb-2 flex items-center justify-center text-xs text-muted-foreground">Modern Layout</div>
            <p className="text-center font-medium text-sm text-muted-foreground">Modern</p>
          </div>
        </div>
        <div className="space-y-2"><Label>Invoice Prefix</Label><Input defaultValue="INV-" /></div>
        <div className="space-y-2"><Label>Default Invoice Terms & Conditions</Label><Textarea defaultValue="Payment is due within 30 days of the invoice date. Late payments are subject to a 1.5% monthly fee." className="h-20" /></div>
        <div className="space-y-2"><Label>Footer Text</Label><Input defaultValue="Thank you for your business!" /></div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button><Save className="w-4 h-4 mr-2" /> Save Template</Button>
      </CardFooter>
    </Card>
  )
}
