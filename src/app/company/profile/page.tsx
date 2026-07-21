"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])

  const [formData, setFormData] = React.useState({
    companyName: "Enterprise ERP Corp",
    email: "contact@enterprise-erp.com",
    phone: "+1 (555) 123-4567",
    website: "https://enterprise-erp.com",
    address: "123 Innovation Drive, Tech City, TC 90210",
  })

  const [saved, setSaved] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Update your main company information and contact details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {saved && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-lg flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Company profile updated successfully!
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                readOnly={!isAdmin}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                readOnly={!isAdmin}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                readOnly={!isAdmin}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                readOnly={!isAdmin}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                readOnly={!isAdmin}
              />
            </div>
          </div>
          {isAdmin && (
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
