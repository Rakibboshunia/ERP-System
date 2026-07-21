"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, ArrowRight, Trash2 } from "lucide-react"
import { useCRMStore, Opportunity } from "@/store/useCRMStore"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function OpportunitiesPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  const opportunities = useCRMStore((state) => state.opportunities)
  const addOpportunity = useCRMStore((state) => state.addOpportunity)
  const updateOpportunityStage = useCRMStore((state) => state.updateOpportunityStage)
  const deleteOpportunity = useCRMStore((state) => state.deleteOpportunity)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    client: "",
    amount: "",
    stage: "Discovery" as Opportunity["stage"],
  })

  const handleAdd = () => {
    addOpportunity({
      id: `OPP-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      client: formData.client,
      amount: formData.amount || "$0",
      stage: formData.stage,
    })
    setIsAddOpen(false)
    setFormData({ title: "", client: "", amount: "", stage: "Discovery" })
  }

  const stages: Opportunity["stage"][] = ["Discovery", "Negotiation", "Proposal Sent", "Closed Won"]

  return (
    <Card className="border-border/50 shadow-sm bg-transparent border-none shadow-none mt-0">
      <CardHeader className="px-0 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Opportunities Pipeline</CardTitle>
          <CardDescription>Kanban board for tracking qualified leads and deals.</CardDescription>
        </div>
        {canManageCRM && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Deal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Opportunity</DialogTitle>
                <DialogDescription>Create a new opportunity in the pipeline.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Deal Title</Label>
                  <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="col-span-3" placeholder="Cloud Migration" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">Client</Label>
                  <Input id="client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="col-span-3" placeholder="Stark Ind." />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Amount</Label>
                  <Input id="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="col-span-3" placeholder="$12,000" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAdd}>Save Deal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const items = opportunities.filter((o) => o.stage === stage)
            return (
              <div key={stage} className="bg-muted/40 rounded-xl p-4 border border-border/50">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex justify-between">
                  <span>{stage}</span>
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{items.length}</span>
                </h3>
                <div className="space-y-3">
                  {items.map((opp) => (
                    <Card key={opp.id} className="shadow-sm hover:border-primary/50 transition-colors relative group">
                      <CardContent className="p-4 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{opp.title}</div>
                          {canManageCRM && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {stage !== "Closed Won" && (
                                  <DropdownMenuItem onClick={() => {
                                    const nextIndex = (stages.indexOf(stage) + 1) % stages.length
                                    updateOpportunityStage(opp.id, stages[nextIndex])
                                  }}>
                                    <ArrowRight className="mr-2 h-4 w-4" /> Move Stage
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => deleteOpportunity(opp.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <div className="text-muted-foreground mt-1">{opp.client}</div>
                        <div className="text-primary font-medium mt-3">{opp.amount}</div>
                      </CardContent>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                      No deals
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
