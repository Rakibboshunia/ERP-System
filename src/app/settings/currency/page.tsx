"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { useStore } from "@/store/useStore"

export default function CurrencySettingsPage() {
  const { currencySettings, updateCurrencySettings } = useStore()
  const [form, setForm] = React.useState({ ...currencySettings })

  React.useEffect(() => { setForm({ ...currencySettings }) }, [currencySettings])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateCurrencySettings(form)
  }

  return (
    <form onSubmit={handleSave}>
      <Card className="border-border/50 shadow-sm mt-0">
        <CardHeader>
          <CardTitle>Currency Settings</CardTitle>
          <CardDescription>Default currency formats used in sales, purchases, and accounting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Base Currency</Label>
              <Select value={form.baseCurrency} onValueChange={v => setForm({ ...form, baseCurrency: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                  <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                  <SelectItem value="jpy">JPY (¥) - Japanese Yen</SelectItem>
                  <SelectItem value="bdt">BDT (৳) - Bangladeshi Taka</SelectItem>
                  <SelectItem value="inr">INR (₹) - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Currency Position</Label>
              <Select value={form.position} onValueChange={v => setForm({ ...form, position: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left ($100)</SelectItem>
                  <SelectItem value="right">Right (100$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Decimal Separator</Label>
              <Select value={form.decimalSeparator} onValueChange={v => setForm({ ...form, decimalSeparator: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dot">Dot (100.00)</SelectItem>
                  <SelectItem value="comma">Comma (100,00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Thousand Separator</Label>
              <Select value={form.thousandSeparator} onValueChange={v => setForm({ ...form, thousandSeparator: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">Comma (1,000)</SelectItem>
                  <SelectItem value="dot">Dot (1.000)</SelectItem>
                  <SelectItem value="space">Space (1 000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Live preview */}
          <div className="p-4 bg-muted/30 rounded-lg border space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Live Preview</p>
            <p className="text-lg font-bold">
              {form.position === "left" ? (
                <>{form.baseCurrency === "usd" ? "$" : form.baseCurrency === "eur" ? "€" : form.baseCurrency === "gbp" ? "£" : form.baseCurrency === "jpy" ? "¥" : form.baseCurrency === "bdt" ? "৳" : "₹"}1{form.thousandSeparator === "comma" ? "," : form.thousandSeparator === "dot" ? "." : " "}250{form.decimalSeparator === "dot" ? "." : ","}00</>
              ) : (
                <>1{form.thousandSeparator === "comma" ? "," : form.thousandSeparator === "dot" ? "." : " "}250{form.decimalSeparator === "dot" ? "." : ","}00{form.baseCurrency === "usd" ? "$" : form.baseCurrency === "eur" ? "€" : form.baseCurrency === "gbp" ? "£" : form.baseCurrency === "jpy" ? "¥" : form.baseCurrency === "bdt" ? "৳" : "₹"}</>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Currency Details</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
