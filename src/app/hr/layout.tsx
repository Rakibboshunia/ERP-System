"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, CalendarRange, FileText, Download } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HRLayout({ children }: { children: React.ReactNode }) {
  const { user, hasPermission } = useAuth()
  const canManageHR = hasPermission(["superadmin", "admin", "hr"])

  if (!canManageHR) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile & HR</h1>
          <p className="text-muted-foreground">Manage your personal information, attendance, and leave requests.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCircle className="w-5 h-5"/> Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Name</span>
                  <p className="text-base font-semibold">{user?.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Email</span>
                  <p className="text-base">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Current Role</span>
                  <p className="text-base capitalize">{user?.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><CalendarRange className="w-5 h-5"/> Leave Balance</CardTitle>
                <Button size="sm" variant="outline">Request Leave</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="text-xs font-medium text-muted-foreground">Annual Leave</span>
                  <div className="text-2xl font-bold mt-1">14 <span className="text-sm font-normal text-muted-foreground">days</span></div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="text-xs font-medium text-muted-foreground">Sick Leave</span>
                  <div className="text-2xl font-bold mt-1">5 <span className="text-sm font-normal text-muted-foreground">days</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5"/> My Salary Slips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
                <div>
                  <p className="font-medium">September 2026</p>
                  <p className="text-xs text-muted-foreground">Processed on Oct 1, 2026</p>
                </div>
                <Button size="sm" variant="secondary"><Download className="w-4 h-4 mr-2"/> Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
