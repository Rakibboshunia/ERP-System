"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, CheckCircle } from "lucide-react"
import { useStore } from "@/store/useStore"

export default function InvoiceSettingsPage() {
  const { invoiceSettings, updateInvoiceSettings } = useStore()
  const [form, setForm] = React.useState({ ...invoiceSettings })

  React.useEffect(() => { setForm({ ...invoiceSettings }) }, [invoiceSettings])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateInvoiceSettings(form)
  }

  return (
    <form onSubmit={handleSave}>
      <Card className="border-border/50 shadow-sm mt-0">
        <CardHeader>
          <CardTitle>Invoice Templates</CardTitle>
          <CardDescription>Customize how your PDF invoices look when sent to clients.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selector */}
          <div className="space-y-2">
            <Label>Invoice Layout</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "classic", label: "Classic", desc: "Standard Layout" },
                { value: "modern", label: "Modern", desc: "Clean Layout" },
                { value: "minimal", label: "Minimal", desc: "Simple Layout" },
              ].map(tpl => (
                <div
                  key={tpl.value}
                  onClick={() => setForm({ ...form, template: tpl.value })}
                  className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                    form.template === tpl.value
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className="aspect-[1/1.4] bg-muted/30 border rounded mb-2 flex items-center justify-center text-xs text-muted-foreground relative">
                    {form.template === tpl.value && (
                      <Badge className="absolute top-1 right-1 bg-primary text-[10px] px-1 py-0">
                        <CheckCircle className="w-2.5 h-2.5 mr-0.5" /> Active
                      </Badge>
                    )}
                    {tpl.desc}
                  </div>
                  <p className={`text-center font-medium text-sm ${form.template === tpl.value ? "text-primary" : "text-muted-foreground"}`}>
                    {tpl.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Invoice Prefix</Label>
            <Input value={form.prefix} onChange={e => setForm({ ...form, prefix: e.target.value })} placeholder="INV-" />
            <p className="text-xs text-muted-foreground">Example: {form.prefix || "INV-"}0001</p>
          </div>

          <div className="space-y-2">
            <Label>Default Invoice Terms & Conditions</Label>
            <Textarea value={form.terms} onChange={e => setForm({ ...form, terms: e.target.value })} className="h-20" />
          </div>

          <div className="space-y-2">
            <Label>Footer Text</Label>
            <Input value={form.footerText} onChange={e => setForm({ ...form, footerText: e.target.value })} placeholder="Thank you for your business!" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Template</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
