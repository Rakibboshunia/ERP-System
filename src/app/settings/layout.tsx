"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Paintbrush, DollarSign, Calculator, FileOutput, Mail, Database } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const sidebarNavItems = [
  { title: "Company Information", href: "/settings/company", icon: Building2 },
  { title: "Theme", href: "/settings/theme", icon: Paintbrush },
  { title: "Currency", href: "/settings/currency", icon: DollarSign },
  { title: "Tax Settings", href: "/settings/tax", icon: Calculator },
  { title: "Invoice Templates", href: "/settings/invoice", icon: FileOutput },
  { title: "Email Settings", href: "/settings/email", icon: Mail },
  { title: "Backup & Restore", href: "/settings/backup", icon: Database },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { hasPermission } = useAuth()
  const isAdmin = hasPermission(["superadmin", "admin"])

  if (!isAdmin) {
    return <div className="flex h-[50vh] items-center justify-center text-muted-foreground">You do not have permission to view system settings.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure application preferences, UI themes, and system variables.</p>
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  )
}
