"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, EyeOff, Send, CheckCircle } from "lucide-react"
import { useStore } from "@/store/useStore"
import toast from "react-hot-toast"

export default function EmailSettingsPage() {
  const { emailSettings, updateEmailSettings } = useStore()
  const [form, setForm] = React.useState({ ...emailSettings })
  const [showPassword, setShowPassword] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const [testSent, setTestSent] = React.useState(false)

  React.useEffect(() => { setForm({ ...emailSettings }) }, [emailSettings])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateEmailSettings(form)
  }

  const handleTestEmail = async () => {
    setIsTesting(true)
    // Simulate sending test email
    await new Promise(res => setTimeout(res, 1500))
    setIsTesting(false)
    setTestSent(true)
    toast.success(`Test email sent to ${form.fromEmail}!`)
    setTimeout(() => setTestSent(false), 4000)
  }

  return (
    <form onSubmit={handleSave}>
      <Card className="border-border/50 shadow-sm mt-0">
        <CardHeader>
          <CardTitle>Email Settings (SMTP)</CardTitle>
          <CardDescription>Configure outgoing email server for invoices and notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP Host</Label>
              <Input value={form.host} onChange={e => setForm({ ...form, host: e.target.value })} placeholder="smtp.mailgun.org" required />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input value={form.port} onChange={e => setForm({ ...form, port: e.target.value })} placeholder="587" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP Username</Label>
              <Input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="user@domain.com" required />
            </div>
            <div className="space-y-2">
              <Label>SMTP Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mail Encryption</Label>
              <Select value={form.encryption} onValueChange={v => setForm({ ...form, encryption: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>From Email Address</Label>
              <Input type="email" value={form.fromEmail} onChange={e => setForm({ ...form, fromEmail: e.target.value })} placeholder="noreply@domain.com" required />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={handleTestEmail}
            disabled={isTesting || testSent}
          >
            {testSent ? (
              <><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Test Email Sent!</>
            ) : isTesting ? (
              <><Send className="w-4 h-4 mr-2 animate-pulse" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Send Test Email</>
            )}
          </Button>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save SMTP Config</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
