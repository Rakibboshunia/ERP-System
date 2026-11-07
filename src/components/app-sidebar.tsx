
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

import { 
  Building2, LayoutDashboard, Users, UsersRound, Box, ShoppingCart, Banknote, Briefcase, Settings, Truck, ShoppingBag, Receipt, Monitor, HardDrive, FileText, PieChart,
  LineChart, History, Calculator, FileSpreadsheet, Scale, PiggyBank, BookOpen,
  User, Users2, Building, Layers, MapPin, 
  CreditCard, UserPlus, Target
} from "lucide-react"

import { useAuth, Role } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems: { title: string; icon: any; url: string; roles: Role[]; subItems?: {title: string; url: string; icon?: any}[] }[] = [
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
      { title: "Chart of Accounts", url: "/accounting/coa", icon: Layers },
      { title: "Journal Entry", url: "/accounting/journal", icon: FileSpreadsheet },
      { title: "General Ledger", url: "/accounting/ledger", icon: BookOpen },
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
  const activeModule = filteredMenuItems.find(item => 
    pathname === item.url || (item.url !== "/" && pathname.startsWith(`${item.url}/`))
  ) || filteredMenuItems[0]

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border/60 overflow-hidden group/sidebar">
      <div className="flex flex-row size-full">
        {/* Primary Sidebar */}
        <div className="w-[72px] bg-slate-950 flex flex-col items-center py-4 shrink-0 h-full z-10 relative">
        <div className="mb-8">
          <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-xl font-bold text-xl shadow-lg shadow-orange-500/20">
            E
          </div>
        </div>
        
        <div className="flex-1 w-full flex flex-col gap-2 px-3 overflow-y-auto no-scrollbar">
          {filteredMenuItems.map(item => {
            const isActive = activeModule?.title === item.title
            return (
              <Link 
                key={item.title} 
                href={item.url}
                title={item.title}
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all relative group ${
                  isActive ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
                )}
                <item.icon className="w-5 h-5" />
              </Link>
            )
          })}
        </div>

        {user && (
          <div className="mt-auto pt-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm border border-white/10 cursor-pointer">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Secondary Sidebar */}
      <div className="flex-1 flex flex-col bg-sidebar h-full overflow-hidden min-w-[200px] group-data-[state=collapsed]/sidebar:opacity-0 transition-opacity duration-200">
        <SidebarHeader className="h-20 px-6 flex items-center justify-start border-b border-border/40">
          <div className="flex flex-col pt-2">
            <span className="text-[10px] text-muted-foreground font-semibold tracking-widest uppercase">Enterprise ERP</span>
            <span className="font-bold text-lg leading-tight mt-0.5">{activeModule?.title || "Overview"}</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="px-3 space-y-1">
                {activeModule?.subItems ? (
                  activeModule.subItems.map((sub) => {
                    const isSubActive = pathname === sub.url
                    return (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton
                          render={<Link href={sub.url} />}
                          isActive={isSubActive}
                          className={`rounded-lg transition-all duration-200 py-2.5 font-medium ${
                            isSubActive
                              ? "bg-muted text-primary"
                              : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {sub.icon && <sub.icon className="w-4 h-4 mr-2" />}
                          <span className="text-sm">{sub.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      render={<Link href={activeModule?.url || "/"} />}
                      isActive={true}
                      className="rounded-lg transition-all duration-200 py-4 font-medium bg-muted text-primary"
                    >
                      <span className="text-sm">Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
      </div>
    </Sidebar>
  )
}
