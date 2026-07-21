import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  category: string
  status: "Active" | "Inactive"
}

export interface PurchaseHistory {
  id: string
  supplier: string
  date: string
  items: number
  total: string
  status: "Received" | "Pending" | "Cancelled"
}

interface SupplierState {
  suppliersList: Supplier[]
  addSupplier: (supplier: Supplier) => void
  updateSupplierStatus: (id: string, status: "Active" | "Inactive") => void
  deleteSupplier: (id: string) => void

  purchaseHistory: PurchaseHistory[]
  addPurchaseHistory: (history: PurchaseHistory) => void
  updatePurchaseStatus: (id: string, status: "Received" | "Pending" | "Cancelled") => void
  deletePurchaseHistory: (id: string) => void
}

export const useSupplierStore = create<SupplierState>()(
  persist(
    (set) => ({
      suppliersList: [
        { id: "SUP-001", name: "TechParts Inc.", contact: "Michael Tanaka", email: "m.tanaka@techparts.com", phone: "+1 (555) 201-3344", category: "Electronics", status: "Active" },
        { id: "SUP-002", name: "Global Steel Co.", contact: "Sarah Chen", email: "s.chen@globalsteel.com", phone: "+1 (555) 882-7755", category: "Raw Materials", status: "Active" },
        { id: "SUP-003", name: "FastShip Logistics", contact: "Omar Hassan", email: "o.hassan@fastship.com", phone: "+1 (555) 443-6621", category: "Logistics", status: "Inactive" },
        { id: "SUP-004", name: "OfficeWorld Supplies", contact: "Linda Park", email: "l.park@officeworld.com", phone: "+1 (555) 339-0011", category: "Office Supplies", status: "Active" },
      ],
      addSupplier: (supplier) => set((state) => ({ suppliersList: [...state.suppliersList, supplier] })),
      updateSupplierStatus: (id, status) => set((state) => ({
        suppliersList: state.suppliersList.map(s => s.id === id ? { ...s, status } : s)
      })),
      deleteSupplier: (id) => set((state) => ({ suppliersList: state.suppliersList.filter(s => s.id !== id) })),

      purchaseHistory: [
        { id: "PO-4021", supplier: "TechParts Inc.", date: "Oct 10, 2026", items: 48, total: "$14,200.00", status: "Received" },
        { id: "PO-4022", supplier: "Global Steel Co.", date: "Oct 12, 2026", items: 12, total: "$32,500.00", status: "Pending" },
        { id: "PO-4023", supplier: "OfficeWorld Supplies", date: "Oct 14, 2026", items: 5, total: "$780.00", status: "Received" },
        { id: "PO-4024", supplier: "FastShip Logistics", date: "Oct 15, 2026", items: 1, total: "$3,100.00", status: "Cancelled" },
      ],
      addPurchaseHistory: (history) => set((state) => ({ purchaseHistory: [...state.purchaseHistory, history] })),
      updatePurchaseStatus: (id, status) => set((state) => ({
        purchaseHistory: state.purchaseHistory.map(p => p.id === id ? { ...p, status } : p)
      })),
      deletePurchaseHistory: (id) => set((state) => ({ purchaseHistory: state.purchaseHistory.filter(p => p.id !== id) })),
    }),
    {
      name: 'erp-supplier-storage',
    }
  )
)
