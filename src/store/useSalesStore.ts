import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export interface Quotation {
  id: string
  customer: string
  contact: string
  items: number
  amount: string
  validUntil: string
  status: "Draft" | "Sent" | "Accepted" | "Expired"
}

export interface SalesOrder {
  id: string
  quoteId: string
  customer: string
  items: number
  totalAmount: string
  orderDate: string
  expectedDelivery: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
}

export interface Invoice {
  id: string
  orderId: string
  customer: string
  amount: string
  issueDate: string
  dueDate: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
}

export interface DeliveryNote {
  id: string
  orderId: string
  customer: string
  deliveryDate: string
  address: string
  driver: string
  status: "Pending" | "In Transit" | "Delivered"
}

interface SalesState {
  quotations: Quotation[]
  addQuotation: (quotation: Quotation) => void
  updateQuotation: (id: string, data: Partial<Quotation>) => void
  deleteQuotation: (id: string) => void

  salesOrders: SalesOrder[]
  addSalesOrder: (order: SalesOrder) => void
  updateSalesOrder: (id: string, data: Partial<SalesOrder>) => void
  deleteSalesOrder: (id: string) => void

  invoices: Invoice[]
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (id: string, data: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void

  deliveryNotes: DeliveryNote[]
  addDeliveryNote: (note: DeliveryNote) => void
  updateDeliveryNote: (id: string, data: Partial<DeliveryNote>) => void
  deleteDeliveryNote: (id: string) => void
}

export const useSalesStore = create<SalesState>()(
  persist(
    (set) => ({
      quotations: [
        { id: "QT-2001", customer: "Acme Corp", contact: "John Doe", items: 5, amount: "$12,400.00", validUntil: "Oct 30, 2026", status: "Sent" },
        { id: "QT-2002", customer: "LexCorp", contact: "Lex Luthor", items: 3, amount: "$8,750.00", validUntil: "Nov 05, 2026", status: "Draft" },
        { id: "QT-2003", customer: "Stark Industries", contact: "Pepper Potts", items: 12, amount: "$54,000.00", validUntil: "Oct 25, 2026", status: "Accepted" },
        { id: "QT-2004", customer: "Wayne Enterprises", contact: "Alfred Pennyworth", items: 2, amount: "$3,200.00", validUntil: "Oct 20, 2026", status: "Expired" },
      ],
      addQuotation: (qt) => set((state) => { toast.success(`Quotation added!`); return { quotations: [...state.quotations, qt] } }),
      updateQuotation: (id, data) => set((state) => { toast.success(`Quotation updated!`); return {
        quotations: state.quotations.map(q => q.id === id ? { ...q, ...data } : q)
      } }),
      deleteQuotation: (id) => set((state) => { toast.error('Quotation deleted.', { icon: '🗑️' }); return { quotations: state.quotations.filter(q => q.id !== id) } }),

      salesOrders: [
        { id: "SO-3001", quoteId: "QT-2003", customer: "Stark Industries", items: 12, totalAmount: "$54,000.00", orderDate: "Oct 15, 2026", expectedDelivery: "Oct 20, 2026", status: "Processing" },
        { id: "SO-3002", quoteId: "--", customer: "Wayne Enterprises", items: 5, totalAmount: "$15,200.00", orderDate: "Oct 10, 2026", expectedDelivery: "Oct 14, 2026", status: "Delivered" },
        { id: "SO-3003", quoteId: "QT-1988", customer: "Acme Corp", items: 1, totalAmount: "$4,500.00", orderDate: "Oct 12, 2026", expectedDelivery: "Oct 18, 2026", status: "Shipped" },
        { id: "SO-3004", quoteId: "--", customer: "LexCorp", items: 20, totalAmount: "$82,000.00", orderDate: "Oct 14, 2026", expectedDelivery: "Oct 25, 2026", status: "Cancelled" },
      ],
      addSalesOrder: (so) => set((state) => { toast.success(`Sales Order added!`); return { salesOrders: [...state.salesOrders, so] } }),
      updateSalesOrder: (id, data) => set((state) => { toast.success(`Sales Order updated!`); return {
        salesOrders: state.salesOrders.map(s => s.id === id ? { ...s, ...data } : s)
      } }),
      deleteSalesOrder: (id) => set((state) => { toast.error('Sales Order deleted.', { icon: '🗑️' }); return { salesOrders: state.salesOrders.filter(s => s.id !== id) } }),

      invoices: [
        { id: "INV-4001", orderId: "SO-3001", customer: "Stark Industries", amount: "$54,000.00", issueDate: "Oct 15, 2026", dueDate: "Nov 15, 2026", status: "Sent" },
        { id: "INV-4002", orderId: "SO-3002", customer: "Wayne Enterprises", amount: "$15,200.00", issueDate: "Oct 10, 2026", dueDate: "Oct 24, 2026", status: "Paid" },
        { id: "INV-3990", orderId: "SO-2980", customer: "Acme Corp", amount: "$8,400.00", issueDate: "Sep 01, 2026", dueDate: "Oct 01, 2026", status: "Overdue" },
        { id: "INV-4003", orderId: "SO-3003", customer: "LexCorp", amount: "$4,500.00", issueDate: "Oct 16, 2026", dueDate: "Nov 16, 2026", status: "Draft" },
      ],
      addInvoice: (inv) => set((state) => { toast.success(`Invoice added!`); return { invoices: [...state.invoices, inv] } }),
      updateInvoice: (id, data) => set((state) => { toast.success(`Invoice updated!`); return {
        invoices: state.invoices.map(i => i.id === id ? { ...i, ...data } : i)
      } }),
      deleteInvoice: (id) => set((state) => { toast.error('Invoice deleted.', { icon: '🗑️' }); return { invoices: state.invoices.filter(i => i.id !== id) } }),

      deliveryNotes: [
        { id: "DN-5001", orderId: "SO-3001", customer: "Stark Industries", deliveryDate: "Oct 20, 2026", address: "10880 Malibu Point, CA", driver: "Frank Castle", status: "Pending" },
        { id: "DN-5002", orderId: "SO-3002", customer: "Wayne Enterprises", deliveryDate: "Oct 14, 2026", address: "1007 Mountain Drive, Gotham", driver: "Dick Grayson", status: "Delivered" },
        { id: "DN-5003", orderId: "SO-3003", customer: "Acme Corp", deliveryDate: "Oct 18, 2026", address: "9000 Looney Blvd, NV", driver: "Wile E.", status: "In Transit" },
      ],
      addDeliveryNote: (dn) => set((state) => { toast.success(`Delivery Note added!`); return { deliveryNotes: [...state.deliveryNotes, dn] } }),
      updateDeliveryNote: (id, data) => set((state) => { toast.success(`Delivery Note updated!`); return {
        deliveryNotes: state.deliveryNotes.map(d => d.id === id ? { ...d, ...data } : d)
      } }),
      deleteDeliveryNote: (id) => set((state) => { toast.error('Delivery Note deleted.', { icon: '🗑️' }); return { deliveryNotes: state.deliveryNotes.filter(d => d.id !== id) } }),
    }),
    {
      name: 'erp-sales-storage',
    }
  )
)
