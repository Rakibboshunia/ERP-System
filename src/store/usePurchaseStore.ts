import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export interface PurchaseRequest {
  id: string
  title: string
  requestedBy: string
  department: string
  amount: string
  date: string
  status: "Pending" | "Approved" | "Rejected"
}

export interface PurchaseOrder {
  id: string
  supplier: string
  prRef: string
  items: number
  total: string
  orderDate: string
  deliveryDate: string
  status: "Draft" | "Sent" | "Confirmed"
}

export interface SupplierInvoice {
  id: string
  poRef: string
  supplier: string
  invoiceDate: string
  dueDate: string
  amount: string
  status: "Unpaid" | "Partial" | "Paid"
}

export interface GRN {
  id: string
  poRef: string
  supplier: string
  receivedBy: string
  date: string
  totalItems: number
  receivedItems: number
  status: "Awaiting" | "Partial" | "Fully Received"
}

interface PurchaseState {
  purchaseRequests: PurchaseRequest[]
  addPurchaseRequest: (pr: PurchaseRequest) => void
  updatePurchaseRequest: (id: string, data: Partial<PurchaseRequest>) => void
  deletePurchaseRequest: (id: string) => void

  purchaseOrders: PurchaseOrder[]
  addPurchaseOrder: (po: PurchaseOrder) => void
  updatePurchaseOrder: (id: string, data: Partial<PurchaseOrder>) => void
  deletePurchaseOrder: (id: string) => void

  supplierInvoices: SupplierInvoice[]
  addSupplierInvoice: (inv: SupplierInvoice) => void
  updateSupplierInvoice: (id: string, data: Partial<SupplierInvoice>) => void
  deleteSupplierInvoice: (id: string) => void

  grnList: GRN[]
  addGRN: (grn: GRN) => void
  updateGRN: (id: string, data: Partial<GRN>) => void
  deleteGRN: (id: string) => void
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      purchaseRequests: [
        { id: "PR-3001", title: "Office Supplies Restock", requestedBy: "HR Dept", department: "Human Resources", amount: "$1,200.00", date: "Oct 15, 2026", status: "Approved" },
        { id: "PR-3002", title: "Server RAM Upgrade", requestedBy: "IT Team", department: "Engineering", amount: "$4,500.00", date: "Oct 16, 2026", status: "Pending" },
        { id: "PR-3003", title: "Ergonomic Chairs x10", requestedBy: "Admin", department: "Admin", amount: "$9,990.00", date: "Oct 17, 2026", status: "Pending" },
        { id: "PR-3004", title: "Marketing Banners", requestedBy: "Marketing", department: "Marketing", amount: "$800.00", date: "Oct 14, 2026", status: "Rejected" },
      ],
      addPurchaseRequest: (pr) => set((state) => { toast.success(`Purchase Request added!`); return { purchaseRequests: [...state.purchaseRequests, pr] } }),
      updatePurchaseRequest: (id, data) => set((state) => { toast.success(`Purchase Request updated!`); return {
        purchaseRequests: state.purchaseRequests.map(p => p.id === id ? { ...p, ...data } : p)
      } }),
      deletePurchaseRequest: (id) => set((state) => { toast.error('Purchase Request deleted.', { icon: '🗑️' }); return { purchaseRequests: state.purchaseRequests.filter(p => p.id !== id) } }),

      purchaseOrders: [
        { id: "PO-4101", supplier: "TechParts Inc.", prRef: "PR-3001", items: 12, total: "$14,200.00", orderDate: "Oct 16, 2026", deliveryDate: "Oct 23, 2026", status: "Confirmed" },
        { id: "PO-4102", supplier: "Global Steel Co.", prRef: "PR-3002", items: 5, total: "$32,500.00", orderDate: "Oct 17, 2026", deliveryDate: "Oct 28, 2026", status: "Sent" },
        { id: "PO-4103", supplier: "OfficeWorld", prRef: "PR-3003", items: 8, total: "$780.00", orderDate: "Oct 18, 2026", deliveryDate: "Oct 21, 2026", status: "Draft" },
      ],
      addPurchaseOrder: (po) => set((state) => { toast.success(`Purchase Order added!`); return { purchaseOrders: [...state.purchaseOrders, po] } }),
      updatePurchaseOrder: (id, data) => set((state) => { toast.success(`Purchase Order updated!`); return {
        purchaseOrders: state.purchaseOrders.map(p => p.id === id ? { ...p, ...data } : p)
      } }),
      deletePurchaseOrder: (id) => set((state) => { toast.error('Purchase Order deleted.', { icon: '🗑️' }); return { purchaseOrders: state.purchaseOrders.filter(p => p.id !== id) } }),

      supplierInvoices: [
        { id: "SINV-7001", poRef: "PO-4101", supplier: "TechParts Inc.", invoiceDate: "Oct 24, 2026", dueDate: "Nov 23, 2026", amount: "$14,200.00", status: "Unpaid" },
        { id: "SINV-7002", poRef: "PO-4102", supplier: "Global Steel Co.", invoiceDate: "Oct 26, 2026", dueDate: "Nov 10, 2026", amount: "$19,500.00", status: "Partial" },
        { id: "SINV-7003", poRef: "PO-3990", supplier: "OfficeWorld", invoiceDate: "Oct 10, 2026", dueDate: "Oct 17, 2026", amount: "$780.00", status: "Paid" },
      ],
      addSupplierInvoice: (inv) => set((state) => { toast.success(`Supplier Invoice added!`); return { supplierInvoices: [...state.supplierInvoices, inv] } }),
      updateSupplierInvoice: (id, data) => set((state) => { toast.success(`Supplier Invoice updated!`); return {
        supplierInvoices: state.supplierInvoices.map(s => s.id === id ? { ...s, ...data } : s)
      } }),
      deleteSupplierInvoice: (id) => set((state) => { toast.error('Supplier Invoice deleted.', { icon: '🗑️' }); return { supplierInvoices: state.supplierInvoices.filter(s => s.id !== id) } }),

      grnList: [
        { id: "GRN-5001", poRef: "PO-4101", supplier: "TechParts Inc.", receivedBy: "Inv. Manager", date: "Oct 23, 2026", totalItems: 12, receivedItems: 12, status: "Fully Received" },
        { id: "GRN-5002", poRef: "PO-4102", supplier: "Global Steel Co.", receivedBy: "Inv. Manager", date: "Oct 25, 2026", totalItems: 5, receivedItems: 3, status: "Partial" },
        { id: "GRN-5003", poRef: "PO-4103", supplier: "OfficeWorld", receivedBy: "--", date: "--", totalItems: 8, receivedItems: 0, status: "Awaiting" },
      ],
      addGRN: (grn) => set((state) => { toast.success(`GRN added!`); return { grnList: [...state.grnList, grn] } }),
      updateGRN: (id, data) => set((state) => { toast.success(`GRN updated!`); return {
        grnList: state.grnList.map(g => g.id === id ? { ...g, ...data } : g)
      } }),
      deleteGRN: (id) => set((state) => { toast.error('GRN deleted.', { icon: '🗑️' }); return { grnList: state.grnList.filter(g => g.id !== id) } }),
    }),
    {
      name: 'erp-purchase-storage',
    }
  )
)
