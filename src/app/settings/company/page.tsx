"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Save } from "lucide-react"

export default function CompanySettingsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Basic details used across the system and in official documents.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Company Name</Label><Input defaultValue="Enterprise ERP Corp" /></div>
          <div className="space-y-2"><Label>Registration Number</Label><Input defaultValue="REG-99382100" /></div>
        </div>
        <div className="space-y-2"><Label>Email Address</Label><Input defaultValue="contact@enterprise-erp.com" type="email" /></div>
        <div className="space-y-2"><Label>Phone Number</Label><Input defaultValue="+1 (555) 123-4567" /></div>
        <div className="space-y-2"><Label>Company Address</Label><Textarea defaultValue="123 Innovation Drive&#10;Tech City, TC 90210&#10;United States" className="h-24" /></div>
        <div className="space-y-2">
          <Label>Company Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border border-dashed"><Building2 className="w-6 h-6 opacity-50" /></div>
            <Button variant="outline" size="sm">Upload New Logo</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
