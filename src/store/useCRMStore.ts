import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Lead {
  id: string
  name: string
  contact: string
  source: string
  status: "New" | "Contacted" | "Qualified" | "Lost"
  score: number
}

export interface Meeting {
  id: string
  title: string
  client: string
  date: string
  time: string
  type: string
}

export interface CustomerNote {
  id: string
  client: string
  author: string
  text: string
  date: string
}

export interface Opportunity {
  id: string
  title: string
  client: string
  amount: string
  stage: "Discovery" | "Negotiation" | "Proposal Sent" | "Closed Won"
}

interface CRMState {
  leads: Lead[]
  addLead: (lead: Lead) => void
  updateLeadStatus: (id: string, status: Lead["status"]) => void
  deleteLead: (id: string) => void

  meetings: Meeting[]
  addMeeting: (meeting: Meeting) => void
  deleteMeeting: (id: string) => void

  notes: CustomerNote[]
  addNote: (note: CustomerNote) => void
  deleteNote: (id: string) => void

  opportunities: Opportunity[]
  addOpportunity: (opp: Opportunity) => void
  updateOpportunityStage: (id: string, stage: Opportunity["stage"]) => void
  deleteOpportunity: (id: string) => void
}

export const useCRMStore = create<CRMState>()(
  persist(
    (set) => ({
      leads: [
        { id: "LD-101", name: "LexCorp", contact: "Lex Luthor", source: "Website", status: "New", score: 85 },
        { id: "LD-102", name: "Daily Planet", contact: "Perry White", source: "Referral", status: "Contacted", score: 60 },
        { id: "LD-103", name: "Queen Consolidated", contact: "Oliver Queen", source: "Cold Call", status: "Qualified", score: 92 },
      ],
      addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
      updateLeadStatus: (id, status) => set((state) => ({
        leads: state.leads.map(l => l.id === id ? { ...l, status } : l)
      })),
      deleteLead: (id) => set((state) => ({ leads: state.leads.filter(l => l.id !== id) })),

      meetings: [
        { id: "MTG-1", title: "Q3 Review & Renewals", client: "Acme Corp", date: "Oct 18, 2026", time: "10:00 AM", type: "Video Call" },
        { id: "MTG-2", title: "Product Demo", client: "LexCorp", date: "Oct 19, 2026", time: "02:00 PM", type: "In Person" },
      ],
      addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting] })),
      deleteMeeting: (id) => set((state) => ({ meetings: state.meetings.filter(m => m.id !== id) })),

      notes: [
        { id: "N-1", client: "Wayne Enterprises", author: "Sales Manager", text: "Client requested a delay in the rollout until next quarter.", date: "2 hours ago" },
        { id: "N-2", client: "Stark Industries", author: "Account Exec", text: "Sent the updated pricing proposal. Awaiting feedback.", date: "Yesterday" },
        { id: "N-3", client: "Daily Planet", author: "Sales Rep", text: "Initial contact made. They are interested in the enterprise tier.", date: "2 days ago" },
      ],
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),

      opportunities: [
        { id: "OPP-1", title: "TechCorp Upgrade", client: "Acme Corp", amount: "$5,000", stage: "Discovery" },
        { id: "OPP-2", title: "Cloud Migration", client: "Stark Ind.", amount: "$12,000", stage: "Discovery" },
        { id: "OPP-3", title: "Consulting Retainer", client: "Wayne Ent.", amount: "$2,500/mo", stage: "Negotiation" },
        { id: "OPP-4", title: "ERP Implementation", client: "Oscorp", amount: "$45,000", stage: "Proposal Sent" },
      ],
      addOpportunity: (opp) => set((state) => ({ opportunities: [...state.opportunities, opp] })),
      updateOpportunityStage: (id, stage) => set((state) => ({
        opportunities: state.opportunities.map(o => o.id === id ? { ...o, stage } : o)
      })),
      deleteOpportunity: (id) => set((state) => ({ opportunities: state.opportunities.filter(o => o.id !== id) })),
    }),
    {
      name: 'erp-crm-storage',
    }
  )
)
