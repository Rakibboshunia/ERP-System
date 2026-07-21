"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function EmailSettingsPage() {
  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <CardTitle>Email Settings (SMTP)</CardTitle>
        <CardDescription>Configure outgoing email server for invoices and notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>SMTP Host</Label><Input defaultValue="smtp.mailgun.org" /></div>
          <div className="space-y-2"><Label>SMTP Port</Label><Input defaultValue="587" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>SMTP Username</Label><Input defaultValue="postmaster@enterprise-erp.com" /></div>
          <div className="space-y-2"><Label>SMTP Password</Label><Input type="password" defaultValue="********" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Mail Encryption</Label>
            <Select defaultValue="tls">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="tls">TLS</SelectItem><SelectItem value="ssl">SSL</SelectItem><SelectItem value="none">None</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>From Email Address</Label><Input defaultValue="noreply@enterprise-erp.com" /></div>
        </div>
        <Button variant="outline" className="w-full mt-2">Send Test Email</Button>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button><Save className="w-4 h-4 mr-2" /> Save SMTP Config</Button>
      </CardFooter>
    </Card>
  )
}
