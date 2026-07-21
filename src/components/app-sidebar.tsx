"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Building2, LayoutDashboard, Users, UsersRound, Box, ShoppingCart, Banknote, Briefcase, Settings, Truck, ShoppingBag, Receipt, Monitor, HardDrive, FileText, PieChart } from "lucide-react"
import { useAuth, Role } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems: { title: string; icon: any; url: string; roles: Role[]; subItems?: {title: string; url: string}[] }[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/", roles: ["superadmin", "admin", "sales_manager", "inventory_manager", "employee", "hr", "accountant"] },
  { 
    title: "Company Management", 
    icon: Building2, 
    url: "/company", 
    roles: ["superadmin", "admin"],
    subItems: [
      { title: "Profile", url: "/company/profile" },
      { title: "Branches", url: "/company/branches" },
      { title: "Departments", url: "/company/departments" },
      { title: "Designations", url: "/company/designations" },
      { title: "Fiscal Year", url: "/company/fiscal" },
    ]
  },
  { 
    title: "HR & Employees", 
    icon: UsersRound, 
    url: "/hr", 
    roles: ["superadmin", "admin", "hr", "employee"],
    subItems: [
      { title: "Employee Directory", url: "/hr/profiles" },
      { title: "Attendance", url: "/hr/attendance" },
      { title: "Leave Management", url: "/hr/leaves" },
      { title: "Payroll Runs", url: "/hr/payroll" },
      { title: "Salary Slips", url: "/hr/slips" },
      { title: "Performance Reviews", url: "/hr/performance" },
    ]
  },
  { 
    title: "CRM & Customers", 
    icon: Users, 
    url: "/crm", 
    roles: ["superadmin", "admin", "sales_manager"],
    subItems: [
      { title: "Customers", url: "/crm/customers" },
      { title: "Leads", url: "/crm/leads" },
      { title: "Opportunities", url: "/crm/opportunities" },
      { title: "Meetings", url: "/crm/meetings" },
      { title: "Customer Notes", url: "/crm/notes" },
    ]
  },
  { 
    title: "Inventory", 
    icon: Box, 
    url: "/inventory", 
    roles: ["superadmin", "admin", "inventory_manager"],
    subItems: [
      { title: "Products", url: "/inventory/products" },
      { title: "Categories", url: "/inventory/categories" },
      { title: "Warehouses", url: "/inventory/warehouse" },
      { title: "Low Stock Alerts", url: "/inventory/lowstock" },
    ]
  },
  { 
    title: "Purchase Management", 
    icon: ShoppingBag, 
    url: "/purchases", 
    roles: ["superadmin", "admin", "inventory_manager", "accountant"],
    subItems: [
      { title: "Purchase Requests", url: "/purchases/requests" },
      { title: "Purchase Orders", url: "/purchases/orders" },
      { title: "Goods Receive Note", url: "/purchases/grn" },
      { title: "Supplier Invoices", url: "/purchases/invoices" },
    ]
  },
  { 
    title: "Sales Management", 
    icon: Receipt, 
    url: "/sales-management", 
    roles: ["superadmin", "admin", "sales_manager", "accountant"],
    subItems: [
      { title: "Quotations", url: "/sales-management/quotations" },
      { title: "Sales Orders", url: "/sales-management/orders" },
      { title: "Invoices", url: "/sales-management/invoices" },
      { title: "Delivery Notes", url: "/sales-management/delivery" },
      { title: "Returns (RMA)", url: "/sales-management/returns" },
    ]
  },
  { title: "POS Terminal", icon: Monitor, url: "/pos", roles: ["superadmin", "admin", "sales_manager"] },
  { 
    title: "Accounting", 
    icon: Banknote, 
    url: "/accounting", 
    roles: ["superadmin", "admin", "accountant"],
    subItems: [
      { title: "Chart of Accounts", url: "/accounting/coa" },
      { title: "Journal Entry", url: "/accounting/journal" },
      { title: "General Ledger", url: "/accounting/ledger" },
      { title: "Trial Balance", url: "/accounting/trial" },
      { title: "Profit & Loss", url: "/accounting/pl" },
      { title: "Balance Sheet", url: "/accounting/balance" },
      { title: "Expenses", url: "/accounting/expense" },
      { title: "Income", url: "/accounting/income" },
    ]
  },
  { 
    title: "Asset Management", 
    icon: HardDrive, 
    url: "/assets", 
    roles: ["superadmin", "admin", "accountant"],
    subItems: [
      { title: "Company Assets", url: "/assets/list" },
      { title: "Depreciation", url: "/assets/depreciation" },
      { title: "Asset Allocation", url: "/assets/allocation" },
    ]
  },
  { 
    title: "Suppliers", 
    icon: Truck, 
    url: "/suppliers", 
    roles: ["superadmin", "admin", "inventory_manager", "accountant"],
    subItems: [
      { title: "Supplier List", url: "/suppliers/list" },
      { title: "Purchase History", url: "/suppliers/history" },
      { title: "Payment Due", url: "/suppliers/payments" },
      { title: "Supplier Ratings", url: "/suppliers/ratings" },
    ]
  },
  { 
    title: "Projects", 
    icon: Briefcase, 
    url: "/projects", 
    roles: ["superadmin", "admin", "employee"],
    subItems: [
      { title: "All Projects", url: "/projects/list" },
      { title: "Tasks", url: "/projects/tasks" },
      { title: "Team", url: "/projects/team" },
      { title: "Kanban Board", url: "/projects/kanban" },
      { title: "Time Tracking", url: "/projects/time" },
    ]
  },
  { 
    title: "Documents", 
    icon: FileText, 
    url: "/documents", 
    roles: ["superadmin", "admin", "hr", "accountant", "sales_manager", "inventory_manager", "employee"],
    subItems: [
      { title: "File Upload", url: "/documents/files" },
      { title: "Contracts", url: "/documents/contracts" },
      { title: "PDF Export", url: "/documents/exports" },
      { title: "Attachments", url: "/documents/attachments" },
    ]
  },
  { 
    title: "Reports", 
    icon: PieChart, 
    url: "/reports", 
    roles: ["superadmin", "admin", "hr", "accountant", "sales_manager", "inventory_manager"],
    subItems: [
      { title: "Sales Report", url: "/reports/sales" },
      { title: "Purchase Report", url: "/reports/purchase" },
      { title: "Inventory Report", url: "/reports/inventory" },
      { title: "Employee Report", url: "/reports/employee" },
      { title: "Financial Report", url: "/reports/financial" },
      { title: "Tax Report", url: "/reports/tax" },
    ]
  },
  { 
    title: "Settings", 
    icon: Settings, 
    url: "/settings", 
    roles: ["superadmin", "admin"],
    subItems: [
      { title: "Company Information", url: "/settings/company" },
      { title: "Theme", url: "/settings/theme" },
      { title: "Currency", url: "/settings/currency" },
      { title: "Tax Settings", url: "/settings/tax" },
      { title: "Invoice Templates", url: "/settings/invoice" },
      { title: "Email Settings", url: "/settings/email" },
      { title: "Backup & Restore", url: "/settings/backup" },
    ]
  },
]

export function AppSidebar() {
  const { user, hasPermission } = useAuth()
  const pathname = usePathname()

  // Make sure it doesn't break during SSR if user isn't loaded yet
  const filteredMenuItems = user ? menuItems.filter(item => hasPermission(item.roles)) : []

  return (
    <Sidebar variant="sidebar" className="border-r border-border/60 backdrop-blur-xl">
      <SidebarHeader className="h-16 px-6 flex items-center justify-start border-b border-border/50">
        <div className="flex items-center gap-3 font-bold text-lg">
          <div className="bg-gradient-to-tr from-primary via-indigo-600 to-violet-500 text-primary-foreground p-2 rounded-xl shadow-md shadow-primary/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Enterprise ERP</span>
            <span className="text-[10px] text-muted-foreground font-normal tracking-wide uppercase">Workspace v2.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2 px-6">
            Core Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 space-y-1">
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      className={`rounded-xl transition-all duration-200 py-5 font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/25 hover:from-primary/95 hover:to-indigo-600/95"
                          : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-70"}`} />
                        <span className="text-xs">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                    {item.subItems && isActive && (
                      <SidebarMenuSub className="ml-5 border-l-2 border-primary/30 pl-2 my-1 space-y-0.5">
                        {item.subItems.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              isActive={pathname === sub.url}
                              render={<Link href={sub.url} />}
                              className={`text-xs rounded-lg py-1.5 px-3 transition-colors ${
                                pathname === sub.url
                                  ? "font-semibold text-primary bg-primary/10"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <span>{sub.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4 bg-muted/20">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">{user.name}</span>
              <span className="text-[10px] text-muted-foreground capitalize">{user.role.replace("_", " ")}</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
