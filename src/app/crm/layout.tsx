"use client"
import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage your entire sales pipeline, customers, and interactions.</p>
        </div>
        {canManageCRM && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </Button>
        )}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
