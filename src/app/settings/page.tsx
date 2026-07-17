"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Paintbrush, DollarSign, Calculator, FileOutput, Mail, Database, Save, UploadCloud } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])
  const { theme, setTheme } = useTheme()

  if (!isAdmin) {
    return <div className="flex h-[50vh] items-center justify-center text-muted-foreground">You do not have permission to view system settings.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure application preferences, UI themes, and system variables.</p>
      </div>

      <Tabs defaultValue="company" className="flex flex-col md:flex-row gap-6">
        <TabsList className="flex flex-col h-auto w-full md:w-64 bg-transparent space-y-1 p-0 justify-start items-stretch">
          <TabsTrigger value="company" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><Building2 className="w-4 h-4 mr-2" />Company Information</TabsTrigger>
          <TabsTrigger value="theme" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><Paintbrush className="w-4 h-4 mr-2" />Theme</TabsTrigger>
          <TabsTrigger value="currency" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><DollarSign className="w-4 h-4 mr-2" />Currency</TabsTrigger>
          <TabsTrigger value="tax" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><Calculator className="w-4 h-4 mr-2" />Tax Settings</TabsTrigger>
          <TabsTrigger value="invoice" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><FileOutput className="w-4 h-4 mr-2" />Invoice Templates</TabsTrigger>
          <TabsTrigger value="email" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><Mail className="w-4 h-4 mr-2" />Email Settings</TabsTrigger>
          <TabsTrigger value="backup" className="justify-start px-4 py-2.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"><Database className="w-4 h-4 mr-2" />Backup & Restore</TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* Company Information */}
          <TabsContent value="company" className="mt-0">
            <Card className="border-border/50 shadow-sm">
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
          </TabsContent>

          {/* Theme */}
          <TabsContent value="theme" className="mt-0">
            <Card className="border-border/50 shadow-sm">
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
          </TabsContent>

          {/* Currency */}
          <TabsContent value="currency" className="mt-0">
            <Card className="border-border/50 shadow-sm">
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
          </TabsContent>

          {/* Tax */}
          <TabsContent value="tax" className="mt-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>Configure global tax rates and rules.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Tax Name / ID (e.g. VAT, GST)</Label><Input defaultValue="VAT" /></div>
                <div className="space-y-2"><Label>Tax Rate (%)</Label><Input defaultValue="8.00" type="number" step="0.01" /></div>
                <div className="space-y-2"><Label>Tax Number / Registration</Label><Input defaultValue="TX-9988776655" /></div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                  <div className="space-y-0.5">
                    <Label className="text-base">Prices Include Tax</Label>
                    <p className="text-sm text-muted-foreground">If enabled, product prices are considered tax-inclusive by default.</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button><Save className="w-4 h-4 mr-2" /> Save Tax Rules</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Invoice Templates */}
          <TabsContent value="invoice" className="mt-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Invoice Templates</CardTitle>
                <CardDescription>Customize how your PDF invoices look when sent to clients.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-primary rounded-lg p-2 cursor-pointer">
                    <div className="aspect-[1/1.4] bg-muted/30 border rounded mb-2 flex items-center justify-center text-xs text-muted-foreground relative">
                      <Badge className="absolute top-2 right-2 bg-primary">Active</Badge>
                      Standard Layout
                    </div>
                    <p className="text-center font-medium text-sm">Classic</p>
                  </div>
                  <div className="border-2 border-transparent rounded-lg p-2 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="aspect-[1/1.4] bg-muted/30 border rounded mb-2 flex items-center justify-center text-xs text-muted-foreground">Modern Layout</div>
                    <p className="text-center font-medium text-sm text-muted-foreground">Modern</p>
                  </div>
                </div>
                <div className="space-y-2"><Label>Invoice Prefix</Label><Input defaultValue="INV-" /></div>
                <div className="space-y-2"><Label>Default Invoice Terms & Conditions</Label><Textarea defaultValue="Payment is due within 30 days of the invoice date. Late payments are subject to a 1.5% monthly fee." className="h-20" /></div>
                <div className="space-y-2"><Label>Footer Text</Label><Input defaultValue="Thank you for your business!" /></div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button><Save className="w-4 h-4 mr-2" /> Save Template</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="mt-0">
            <Card className="border-border/50 shadow-sm">
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
          </TabsContent>

          {/* Backup */}
          <TabsContent value="backup" className="mt-0">
            <div className="grid gap-6">
              <Card className="border-border/50 shadow-sm border-rose-500/20">
                <CardHeader>
                  <CardTitle>Database Backup</CardTitle>
                  <CardDescription>Download a full SQL/JSON dump of the ERP database.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
                    <div>
                      <p className="font-medium">Last Backup Generated</p>
                      <p className="text-sm text-muted-foreground">Oct 16, 2026 at 03:00 AM (Auto-backup)</p>
                    </div>
                    <Button variant="secondary">Download Latest</Button>
                  </div>
                  <Button className="w-full mt-4"><Database className="w-4 h-4 mr-2" /> Generate Manual Backup Now</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-500 flex items-center gap-2">Database Restore</CardTitle>
                  <CardDescription>Upload a backup file to restore the system state. <strong className="text-rose-500">Warning: This will overwrite all current data!</strong></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-6 text-center">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 text-amber-500/50" />
                    <p className="font-medium">Upload .sql or .json backup file</p>
                    <Button variant="outline" className="mt-4 border-amber-500/50 text-amber-600 hover:bg-amber-500/10">Browse File</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
