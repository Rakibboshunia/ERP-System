"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"
import { useStore } from "@/store/useStore"

export default function TaxSettingsPage() {
  const { taxSettings, updateTaxSettings } = useStore()
  const [form, setForm] = React.useState({ ...taxSettings })

  React.useEffect(() => { setForm({ ...taxSettings }) }, [taxSettings])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateTaxSettings(form)
  }

  return (
    <form onSubmit={handleSave}>
      <Card className="border-border/50 shadow-sm mt-0">
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>Configure global tax rates and rules.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tax Name / ID (e.g. VAT, GST)</Label>
            <Input
              value={form.taxName}
              onChange={e => setForm({ ...form, taxName: e.target.value })}
              placeholder="VAT"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tax Rate (%)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={form.taxRate}
              onChange={e => setForm({ ...form, taxRate: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              A {form.taxRate}% {form.taxName} will be applied to taxable transactions.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Tax Number / Registration</Label>
            <Input
              value={form.taxNumber}
              onChange={e => setForm({ ...form, taxNumber: e.target.value })}
              placeholder="TX-0000000000"
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-base">Prices Include Tax</Label>
              <p className="text-sm text-muted-foreground">If enabled, product prices are considered tax-inclusive by default.</p>
            </div>
            <Switch
              checked={form.pricesIncludeTax}
              onCheckedChange={v => setForm({ ...form, pricesIncludeTax: v })}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Tax Rules</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
