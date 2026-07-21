"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function CurrencySettingsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Currency Settings</CardTitle>
        <CardDescription>Default currency formats used in sales, purchases, and accounting.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Base Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                <SelectItem value="jpy">JPY (¥) - Japanese Yen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency Position</Label>
            <Select defaultValue="left">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="left">Left ($100)</SelectItem><SelectItem value="right">Right (100$)</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Decimal Separator</Label>
            <Select defaultValue="dot">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="dot">Dot (100.00)</SelectItem><SelectItem value="comma">Comma (100,00)</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Thousand Separator</Label>
            <Select defaultValue="comma">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="comma">Comma (1,000)</SelectItem><SelectItem value="dot">Dot (1.000)</SelectItem><SelectItem value="space">Space (1 000)</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button><Save className="w-4 h-4 mr-2" /> Save Currency Details</Button>
      </CardFooter>
    </Card>
  )
}
