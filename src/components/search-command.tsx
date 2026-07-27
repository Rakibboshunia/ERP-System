"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { 
  Search, LayoutDashboard, Users, UsersRound, Box, ShoppingBag,
  Receipt, Banknote, HardDrive, Truck, Briefcase, FileText,
  PieChart, Settings, Monitor, Building2, ArrowRight
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const allModules = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, description: "Business overview & KPIs" },
  { title: "CRM & Customers", url: "/crm/customers", icon: Users, description: "Manage customers and leads" },
  { title: "Leads", url: "/crm/leads", icon: Users, description: "Track sales leads" },
  { title: "Opportunities", url: "/crm/opportunities", icon: Users, description: "Sales pipeline" },
  { title: "HR & Employees", url: "/hr/profiles", icon: UsersRound, description: "Employee directory" },
  { title: "Attendance", url: "/hr/attendance", icon: UsersRound, description: "Daily check-ins" },
  { title: "Payroll", url: "/hr/payroll", icon: UsersRound, description: "Salary and payroll runs" },
  { title: "Leave Management", url: "/hr/leaves", icon: UsersRound, description: "Leave requests" },
  { title: "Inventory", url: "/inventory/products", icon: Box, description: "Products & stock" },
  { title: "Low Stock Alerts", url: "/inventory/lowstock", icon: Box, description: "Items needing reorder" },
  { title: "Purchase Orders", url: "/purchases/orders", icon: ShoppingBag, description: "Procurement orders" },
  { title: "Sales Orders", url: "/sales-management/orders", icon: Receipt, description: "Customer orders" },
  { title: "Invoices", url: "/sales-management/invoices", icon: Receipt, description: "Sales invoices" },
  { title: "POS Terminal", url: "/pos", icon: Monitor, description: "Point of sale" },
  { title: "Accounting", url: "/accounting/coa", icon: Banknote, description: "Chart of accounts" },
  { title: "Journal Entry", url: "/accounting/journal", icon: Banknote, description: "Accounting journals" },
  { title: "Assets", url: "/assets/list", icon: HardDrive, description: "Company assets" },
  { title: "Suppliers", url: "/suppliers/list", icon: Truck, description: "Supplier management" },
  { title: "Projects", url: "/projects/list", icon: Briefcase, description: "Project management" },
  { title: "Documents", url: "/documents/files", icon: FileText, description: "File management" },
  { title: "Reports", url: "/reports", icon: PieChart, description: "Analytics & reports" },
  { title: "Settings", url: "/settings/company", icon: Settings, description: "System configuration" },
  { title: "Company Profile", url: "/company/profile", icon: Building2, description: "Company information" },
  { title: "Departments", url: "/company/departments", icon: Building2, description: "Department management" },
  { title: "Financial Report", url: "/reports/financial", icon: PieChart, description: "Financial analytics" },
  { title: "Sales Report", url: "/reports/sales", icon: PieChart, description: "Sales analytics" },
  { title: "Employee Report", url: "/reports/employee", icon: PieChart, description: "HR analytics" },
]

interface SearchCommandProps {
  open: boolean
  onClose: () => void
}

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = query.trim().length === 0
    ? allModules.slice(0, 8)
    : allModules.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)

  const handleSelect = (url: string) => {
    router.push(url)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search modules, reports, settings..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            onKeyDown={e => {
              if (e.key === "Escape") onClose()
              if (e.key === "Enter" && filtered.length > 0) handleSelect(filtered[0].url)
            }}
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No results for "{query}"
            </div>
          ) : (
            <>
              <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {query ? "Results" : "Quick Access"}
              </p>
              {filtered.map(module => (
                <button
                  key={module.url}
                  onClick={() => handleSelect(module.url)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <module.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{module.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{module.description}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </>
          )}
        </div>

        <div className="border-t border-border/50 px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
          <span><kbd className="bg-muted rounded px-1 font-mono">↵</kbd> Open</span>
          <span><kbd className="bg-muted rounded px-1 font-mono">↑↓</kbd> Navigate</span>
          <span><kbd className="bg-muted rounded px-1 font-mono">ESC</kbd> Close</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
