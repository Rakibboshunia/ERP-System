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
} from "@/components/ui/sidebar"
import { Building2, LayoutDashboard, Users, UsersRound, Box, ShoppingCart, Banknote, Briefcase, Settings, Truck, ShoppingBag, Receipt, Monitor, HardDrive, FileText, PieChart } from "lucide-react"
import { useAuth, Role } from "@/contexts/auth-context"

const menuItems: { title: string; icon: any; url: string; roles: Role[] }[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/", roles: ["superadmin", "admin", "sales_manager", "inventory_manager", "employee", "hr", "accountant"] },
  { title: "Company Management", icon: Building2, url: "/company", roles: ["superadmin", "admin"] },
  { title: "HR & Employees", icon: UsersRound, url: "/hr", roles: ["superadmin", "admin", "hr", "employee"] },
  { title: "CRM & Customers", icon: Users, url: "/crm", roles: ["superadmin", "admin", "sales_manager"] },
  { title: "Inventory", icon: Box, url: "/inventory", roles: ["superadmin", "admin", "inventory_manager"] },
  { title: "Purchase Management", icon: ShoppingBag, url: "/purchases", roles: ["superadmin", "admin", "inventory_manager", "accountant"] },
  { title: "Sales Management", icon: Receipt, url: "/sales-management", roles: ["superadmin", "admin", "sales_manager", "accountant"] },
  { title: "POS Terminal", icon: Monitor, url: "/pos", roles: ["superadmin", "admin", "sales_manager"] },
  { title: "Accounting", icon: Banknote, url: "/accounting", roles: ["superadmin", "admin", "accountant"] },
  { title: "Asset Management", icon: HardDrive, url: "/assets", roles: ["superadmin", "admin", "accountant"] },
  { title: "Suppliers", icon: Truck, url: "/suppliers", roles: ["superadmin", "admin", "inventory_manager", "accountant"] },
  { title: "Projects", icon: Briefcase, url: "/projects", roles: ["superadmin", "admin", "employee"] },
  { title: "Documents", icon: FileText, url: "/documents", roles: ["superadmin", "admin", "hr", "accountant", "sales_manager", "inventory_manager", "employee"] },
  { title: "Reports", icon: PieChart, url: "/reports", roles: ["superadmin", "admin", "hr", "accountant", "sales_manager", "inventory_manager"] },
  { title: "Settings", icon: Settings, url: "/settings", roles: ["superadmin", "admin"] },
]

export function AppSidebar() {
  const { user, hasPermission } = useAuth()

  // Make sure it doesn't break during SSR if user isn't loaded yet
  const filteredMenuItems = user ? menuItems.filter(item => hasPermission(item.roles)) : []

  return (
    <Sidebar variant="sidebar" className="border-r">
      <SidebarHeader className="h-16 px-6 flex items-center justify-start border-b">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Building2 className="w-5 h-5" />
          </div>
          <span>Enterprise ERP</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 px-6">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />} className="rounded-lg transition-colors hover:bg-muted font-medium py-5">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 opacity-70" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase">
              {user.name.substring(0, 2)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
