"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Sparkles, X, Plus, FileText, Users, ShoppingCart, 
  BarChart2, Zap, Settings, ArrowRight 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const quickActions = [
  { label: "New Sales Order", icon: ShoppingCart, url: "/sales-management/orders", color: "text-emerald-500 bg-emerald-500/10" },
  { label: "Add Customer", icon: Users, url: "/crm/customers", color: "text-blue-500 bg-blue-500/10" },
  { label: "New Invoice", icon: FileText, url: "/sales-management/invoices", color: "text-purple-500 bg-purple-500/10" },
  { label: "View Reports", icon: BarChart2, url: "/reports", color: "text-amber-500 bg-amber-500/10" },
  { label: "Add Employee", icon: Plus, url: "/hr/profiles", color: "text-pink-500 bg-pink-500/10" },
  { label: "Settings", icon: Settings, url: "/settings/company", color: "text-slate-500 bg-slate-500/10" },
]

const aiInsights = [
  "💡 Revenue is up 20% this month. Top performer: Stark Industries.",
  "⚠️ 24 inventory items are below reorder level. Consider restocking soon.",
  "📊 Q2 sales exceeded target by 12%. Great performance by the sales team!",
  "🔔 3 invoices are overdue totaling $18,200. Follow up with collections.",
]

interface QuickActionsPanelProps {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}

export function QuickActionsPanel({ open, onClose, anchorRef }: QuickActionsPanelProps) {
  const router = useRouter()
  const { user } = useAuth()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [insightIdx] = React.useState(() => Math.floor(Math.random() * aiInsights.length))

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
      className="absolute right-16 sm:right-20 top-[68px] w-[340px] z-50 rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Quick Actions</h3>
            <p className="text-[10px] text-muted-foreground">AI-powered shortcuts</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>

      
      {/* AI Insight */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
        <div className="flex items-start gap-2">
          <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">AI Insight</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{aiInsights[insightIdx]}</p>
          </div>
        </div>
      </div>

      
      {/* Quick Actions grid */}
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Common Actions</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => { router.push(action.url); onClose() }}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/40 transition-all text-left group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
                <action.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => { router.push("/"); onClose() }}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-primary font-semibold hover:bg-primary/5 rounded-xl transition-colors border border-primary/20"
        >
          Go to Dashboard <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
