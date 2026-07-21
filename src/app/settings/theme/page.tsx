"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme()
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize the appearance of your ERP dashboard.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Color Mode</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")} className="justify-start">Light Mode</Button>
            <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")} className="justify-start">Dark Mode</Button>
            <Button variant={theme === "system" ? "default" : "outline"} onClick={() => setTheme("system")} className="justify-start">System Auto</Button>
          </div>
        </div>
        <div className="space-y-3">
          <Label className="flex justify-between"><span>Accent Color</span><span className="text-xs text-muted-foreground">Applies on refresh</span></Label>
          <div className="flex gap-3">
            {["#09090b", "#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6"].map(color => (
              <button key={color} className="w-8 h-8 rounded-full border-2 border-transparent focus:border-primary focus:outline-none ring-2 ring-offset-2 ring-offset-background ring-transparent focus:ring-primary/20" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label>Sidebar Layout</Label>
          <Select defaultValue="full">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="full">Full Width</SelectItem><SelectItem value="collapsed">Collapsed (Icons Only)</SelectItem></SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
