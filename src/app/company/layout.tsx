"use client"
import * as React from "react"

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Company Management</h1>
        <p className="text-muted-foreground">Manage your company profile, branches, and organizational structure.</p>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
