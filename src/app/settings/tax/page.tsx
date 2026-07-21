"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function TaxSettingsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Tax Settings</CardTitle>
        <CardDescription>Configure global tax rates and rules.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Tax Name / ID (e.g. VAT, GST)</Label><Input defaultValue="VAT" /></div>
        <div className="space-y-2"><Label>Tax Rate (%)</Label><Input defaultValue="8.00" type="number" step="0.01" /></div>
        <div className="space-y-2"><Label>Tax Number / Registration</Label><Input defaultValue="TX-9988776655" /></div>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
          <div className="space-y-0.5">
            <Label className="text-base">Prices Include Tax</Label>
            <p className="text-sm text-muted-foreground">If enabled, product prices are considered tax-inclusive by default.</p>
          </div>
          <Switch defaultChecked={false} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button><Save className="w-4 h-4 mr-2" /> Save Tax Rules</Button>
      </CardFooter>
    </Card>
  )
}
