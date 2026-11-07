"use client"

import * as React from "react"
import { ShoppingCart, Bell, Users, DollarSign, Package, AlertTriangle, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  title: string
  desc: string
  time: string
  type: "order" | "hr" | "finance" | "system" | "alert"
  read: boolean
}

const INITIAL: Notification[] = [
  { id: 1, title: "New Order Received", desc: "ORD-0291 from Stark Industries — $5,400", time: "2m ago", type: "order", read: false },
  { id: 2, title: "Low Stock Alert", desc: "Product 'Laptop Stand X2' below threshold (3 left)", time: "15m ago", type: "alert", read: false },
  { id: 3, title: "Leave Request", desc: "Bob Smith submitted a 3-day leave request", time: "1h ago", type: "hr", read: false },
  { id: 4, title: "Invoice Paid", desc: "INV-2041 marked as paid — $12,450", time: "2h ago", type: "finance", read: true },
  { id: 5, title: "Payroll Processed", desc: "June payroll run completed for 42 employees", time: "3h ago", type: "finance", read: true },
  { id: 6, title: "System Maintenance", desc: "Scheduled downtime tonight at 2:00 AM", time: "5h ago", type: "system", read: true },
]

const iconMap = {
  order: { icon: ShoppingCart, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  alert: { icon: AlertTriangle, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  hr: { icon: Users, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  finance: { icon: DollarSign, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  system: { icon: Bell, color: "text-slate-500 bg-slate-500/10 border-slate-500/20" },
}

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}

export function NotificationPanel({ open, onClose, anchorRef }: NotificationPanelProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>(INITIAL)
  const panelRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id))
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose, anchorRef])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      className="absolute right-4 top-[68px] w-[380px] z-50 rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Badge className="h-5 px-1.5 text-[10px] bg-primary text-primary-foreground rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] text-primary font-medium hover:underline px-2"
            >
              Mark all read
            </button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="overflow-y-auto max-h-[420px]">
        {notifications.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">No new notifications</p>
          </div>
        ) : (
          notifications.map(n => {
            const { icon: Icon, color } = iconMap[n.type]
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-3 px-4 py-3 border-b border-border/30 cursor-pointer transition-colors hover:bg-muted/40 ${!n.read ? "bg-primary/3" : ""}`}
              >
                <div className={`mt-0.5 p-2 rounded-xl border shrink-0 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium leading-tight ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                </div>
                
                <button
                  onClick={e => { e.stopPropagation(); dismiss(n.id) }}
                  className="p-1 rounded-lg opacity-0 hover:opacity-100 group-hover:opacity-100 hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )
          })
        )}
      </div>

      <div className="px-4 py-3 border-t border-border/40 text-center">
        <button className="text-xs text-primary font-semibold hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  )
}
