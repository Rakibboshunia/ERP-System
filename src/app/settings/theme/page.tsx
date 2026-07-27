"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, Save, Check } from "lucide-react"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

const ACCENT_COLORS = [
  { hex: "#09090b", name: "Default" },
  { hex: "#10b981", name: "Emerald" },
  { hex: "#3b82f6", name: "Blue" },
  { hex: "#f43f5e", name: "Rose" },
  { hex: "#f59e0b", name: "Amber" },
  { hex: "#8b5cf6", name: "Violet" },
]

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [selectedColor, setSelectedColor] = React.useState(ACCENT_COLORS[0].hex)
  const [sidebarLayout, setSidebarLayout] = React.useState("full")
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), [])

  const handleSave = () => {
    toast.success("Theme preferences saved! Some changes apply on next reload.", { duration: 3000 })
  }

  if (!mounted) return null

  const themeOptions = [
    { value: "light", label: "Light Mode", icon: Sun },
    { value: "dark", label: "Dark Mode", icon: Moon },
    { value: "system", label: "System Auto", icon: Monitor },
  ]

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize the appearance of your ERP dashboard.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Mode */}
        <div className="space-y-3">
          <Label>Color Mode</Label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  theme === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{label}</span>
                {theme === value && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-3">
          <Label className="flex justify-between">
            <span>Accent Color</span>
            <span className="text-xs text-muted-foreground">
              {ACCENT_COLORS.find(c => c.hex === selectedColor)?.name}
            </span>
          </Label>
          <div className="flex gap-3 flex-wrap">
            {ACCENT_COLORS.map(color => (
              <button
                key={color.hex}
                type="button"
                title={color.name}
                onClick={() => setSelectedColor(color.hex)}
                className={`w-9 h-9 rounded-full border-2 transition-all relative ${
                  selectedColor === color.hex
                    ? "border-foreground scale-110 shadow-lg"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColor === color.hex && (
                  <Check className="w-3.5 h-3.5 absolute inset-0 m-auto text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Layout */}
        <div className="space-y-3">
          <Label>Sidebar Layout</Label>
          <Select value={sidebarLayout} onValueChange={setSidebarLayout}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Width</SelectItem>
              <SelectItem value="collapsed">Collapsed (Icons Only)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preview swatch */}
        <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preview</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedColor }} />
            <div className="space-y-1 flex-1">
              <div className="h-2.5 rounded-full w-3/4" style={{ backgroundColor: selectedColor, opacity: 0.8 }} />
              <div className="h-2 rounded-full w-1/2 bg-muted" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
