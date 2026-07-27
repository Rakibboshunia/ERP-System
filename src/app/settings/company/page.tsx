"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Save } from "lucide-react"
import { useStore } from "@/store/useStore"

export default function CompanySettingsPage() {
  const { companySettings, updateCompanySettings } = useStore()
  const [form, setForm] = React.useState({ ...companySettings })

  // Sync form if store changes externally
  React.useEffect(() => { setForm({ ...companySettings }) }, [companySettings])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateCompanySettings(form)
  }

  return (
    <form onSubmit={handleSave}>
      <Card className="border-border/50 shadow-sm mt-0">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic details used across the system and in official documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <Input value={form.registrationNo} onChange={e => setForm({ ...form, registrationNo: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Company Address</Label>
            <Textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="h-24" />
          </div>
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border border-dashed">
                <Building2 className="w-6 h-6 opacity-50" />
              </div>
              <Button type="button" variant="outline" size="sm">Upload New Logo</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
