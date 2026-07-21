import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  uploader: string
  date: string
}

export interface ExportLog {
  id: string
  type: string
  format: string
  user: string
  date: string
  size: string
}

export interface Contract {
  id: string
  vendor: string
  type: string
  status: "Active" | "Expiring Soon" | "Expired"
  expiry: string
}

export interface Attachment {
  id: string
  relatedTo: string
  filename: string
  uploadedBy: string
  date: string
}

interface DocumentState {
  files: UploadedFile[]
  addFile: (file: UploadedFile) => void
  deleteFile: (id: string) => void

  exportsLog: ExportLog[]
  addExport: (exp: ExportLog) => void
  deleteExport: (id: string) => void

  contracts: Contract[]
  addContract: (contract: Contract) => void
  updateContractStatus: (id: string, status: "Active" | "Expiring Soon" | "Expired") => void
  deleteContract: (id: string) => void

  attachments: Attachment[]
  addAttachment: (att: Attachment) => void
  deleteAttachment: (id: string) => void
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
      files: [
        { id: "DOC-001", name: "Q3_Financial_Report.pdf", size: "2.4 MB", type: "PDF", uploader: "Accountant", date: "Oct 16, 2026" },
        { id: "DOC-002", name: "Employee_Handbook_2026.docx", size: "1.8 MB", type: "Word", uploader: "HR Dept", date: "Oct 15, 2026" },
        { id: "DOC-003", name: "Marketing_Assets_v2.zip", size: "45.2 MB", type: "Archive", uploader: "Marketing", date: "Oct 14, 2026" },
        { id: "DOC-004", name: "Inventory_Count_Oct.xlsx", size: "850 KB", type: "Excel", uploader: "Inv. Manager", date: "Oct 10, 2026" },
      ],
      addFile: (file) => set((state) => ({ files: [...state.files, file] })),
      deleteFile: (id) => set((state) => ({ files: state.files.filter(f => f.id !== id) })),

      exportsLog: [
        { id: "EXP-001", type: "Inventory Report", format: "CSV", user: "Admin", date: "Oct 20, 2026", size: "45 KB" },
        { id: "EXP-002", type: "Employee List", format: "PDF", user: "HR Manager", date: "Oct 19, 2026", size: "1.2 MB" },
      ],
      addExport: (exp) => set((state) => ({ exportsLog: [...state.exportsLog, exp] })),
      deleteExport: (id) => set((state) => ({ exportsLog: state.exportsLog.filter(e => e.id !== id) })),

      contracts: [
        { id: "CNT-4001", vendor: "TechParts Inc.", type: "Supplier Agreement", status: "Active", expiry: "Dec 31, 2027" },
        { id: "CNT-4002", vendor: "Global Cleaning", type: "Service Contract", status: "Expiring Soon", expiry: "Nov 15, 2026" },
      ],
      addContract: (contract) => set((state) => ({ contracts: [...state.contracts, contract] })),
      updateContractStatus: (id, status) => set((state) => ({
        contracts: state.contracts.map(c => c.id === id ? { ...c, status } : c)
      })),
      deleteContract: (id) => set((state) => ({ contracts: state.contracts.filter(c => c.id !== id) })),

      attachments: [
        { id: "ATT-101", relatedTo: "Invoice #INV-4202", filename: "receipt_scan.jpg", uploadedBy: "Sales", date: "Oct 19, 2026" },
        { id: "ATT-102", relatedTo: "Employee #EMP-003", filename: "medical_cert.pdf", uploadedBy: "HR", date: "Oct 15, 2026" },
      ],
      addAttachment: (att) => set((state) => ({ attachments: [...state.attachments, att] })),
      deleteAttachment: (id) => set((state) => ({ attachments: state.attachments.filter(a => a.id !== id) })),
    }),
    {
      name: 'erp-document-storage',
    }
  )
)
