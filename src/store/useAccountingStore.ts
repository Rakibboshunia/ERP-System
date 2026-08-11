import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export interface Account {
  code: string
  name: string
  type: "Asset" | "Liability" | "Equity" | "Income" | "Expense"
  balance: string
  status: "Active" | "Inactive"
}

export interface LedgerEntry {
  id: string
  date: string
  description: string
  debit: string
  credit: string
  balance: string
}

export interface Income {
  id: string
  source: string
  customer: string
  amount: string
  date: string
  status: "Received" | "Pending"
}

export interface Expense {
  id: string
  category: string
  description: string
  amount: string
  date: string
  status: "Paid" | "Pending"
}

export interface JournalEntry {
  id: string
  date: string
  description: string
  debit: string
  credit: string
  by: string
  status: "Posted" | "Draft"
}

interface AccountingState {
  accounts: Account[]
  addAccount: (account: Account) => void
  updateAccount: (code: string, data: Partial<Account>) => void
  deleteAccount: (code: string) => void

  ledgerEntries: LedgerEntry[]
  addLedgerEntry: (entry: LedgerEntry) => void
  updateLedgerEntry: (id: string, data: Partial<LedgerEntry>) => void
  deleteLedgerEntry: (id: string) => void

  incomes: Income[]
  addIncome: (income: Income) => void
  updateIncomeStatus: (id: string, status: "Received" | "Pending") => void
  deleteIncome: (id: string) => void

  expenses: Expense[]
  addExpense: (expense: Expense) => void
  updateExpenseStatus: (id: string, status: "Paid" | "Pending") => void
  deleteExpense: (id: string) => void

  journalEntries: JournalEntry[]
  addJournalEntry: (entry: JournalEntry) => void
  updateJournalStatus: (id: string, status: "Posted" | "Draft") => void
  deleteJournalEntry: (id: string) => void
}

export const useAccountingStore = create<AccountingState>()(
  persist(
    (set) => ({
      accounts: [
        { code: "1000", name: "Cash & Cash Equivalents", type: "Asset", balance: "$124,500.00", status: "Active" },
        { code: "1100", name: "Accounts Receivable", type: "Asset", balance: "$45,231.00", status: "Active" },
        { code: "1500", name: "Inventory", type: "Asset", balance: "$320,000.00", status: "Active" },
        { code: "2000", name: "Accounts Payable", type: "Liability", balance: "$33,700.00", status: "Active" },
        { code: "3000", name: "Owner's Equity", type: "Equity", balance: "$400,000.00", status: "Active" },
        { code: "4000", name: "Sales Revenue", type: "Income", balance: "$512,000.00", status: "Active" },
        { code: "5000", name: "Cost of Goods Sold", type: "Expense", balance: "$210,000.00", status: "Active" },
        { code: "5100", name: "Salaries Expense", type: "Expense", balance: "$124,500.00", status: "Active" },
      ],
      addAccount: (account) => set((state) => { toast.success(`Account ${account.code} added!`); return { accounts: [...state.accounts, account] } }),
      updateAccount: (code, data) => set((state) => { toast.success(`Account updated!`); return { accounts: state.accounts.map(a => a.code === code ? { ...a, ...data } : a) } }),
      deleteAccount: (code) => set((state) => { toast.error('Account deleted.', { icon: '🗑️' }); return { accounts: state.accounts.filter(a => a.code !== code) } }),

      ledgerEntries: [
        { id: "LED-01", date: "Oct 01, 2026", description: "Opening Balance", debit: "--", credit: "--", balance: "$98,000.00" },
        { id: "LED-02", date: "Oct 05, 2026", description: "Sales – Acme Corp", debit: "$12,400.00", credit: "--", balance: "$110,400.00" },
        { id: "LED-03", date: "Oct 10, 2026", description: "Supplier Payment – TechParts", debit: "--", credit: "$14,200.00", balance: "$96,200.00" },
        { id: "LED-04", date: "Oct 17, 2026", description: "Sales – Stark Ind.", debit: "$54,000.00", credit: "--", balance: "$150,200.00" },
      ],
      addLedgerEntry: (entry) => set((state) => { toast.success(`Ledger entry added!`); return { ledgerEntries: [...state.ledgerEntries, entry] } }),
      updateLedgerEntry: (id, data) => set((state) => { toast.success(`Ledger entry updated!`); return { ledgerEntries: state.ledgerEntries.map(l => l.id === id ? { ...l, ...data } : l) } }),
      deleteLedgerEntry: (id) => set((state) => { toast.error('Ledger entry deleted.', { icon: '🗑️' }); return { ledgerEntries: state.ledgerEntries.filter(l => l.id !== id) } }),

      incomes: [
        { id: "INC-201", source: "Product Sales", customer: "Acme Corp", amount: "$12,400.00", date: "Oct 05, 2026", status: "Received" },
        { id: "INC-202", source: "Consulting Fee", customer: "Wayne Ent.", amount: "$4,200.00", date: "Oct 08, 2026", status: "Received" },
        { id: "INC-203", source: "Product Sales", customer: "Stark Ind.", amount: "$54,000.00", date: "Oct 17, 2026", status: "Pending" },
      ],
      addIncome: (income) => set((state) => { toast.success(`Income added!`); return { incomes: [...state.incomes, income] } }),
      updateIncomeStatus: (id, status) => set((state) => { toast.success(`Status updated to ${status}!`); return { incomes: state.incomes.map(i => i.id === id ? { ...i, status } : i) } }),
      deleteIncome: (id) => set((state) => { toast.error('Income deleted.', { icon: '🗑️' }); return { incomes: state.incomes.filter(i => i.id !== id) } }),

      expenses: [
        { id: "EXP-101", category: "Salaries", description: "October Payroll", amount: "$54,000.00", date: "Oct 01, 2026", status: "Paid" },
        { id: "EXP-102", category: "Software", description: "AWS Hosting – Oct", amount: "$890.00", date: "Oct 05, 2026", status: "Paid" },
        { id: "EXP-103", category: "Office Supplies", description: "Amazon Purchase", amount: "$450.00", date: "Oct 10, 2026", status: "Pending" },
        { id: "EXP-104", category: "Travel", description: "NY Sales Trip", amount: "$2,100.00", date: "Oct 14, 2026", status: "Paid" },
      ],
      addExpense: (expense) => set((state) => { toast.success(`Expense added!`); return { expenses: [...state.expenses, expense] } }),
      updateExpenseStatus: (id, status) => set((state) => { toast.success(`Status updated to ${status}!`); return { expenses: state.expenses.map(e => e.id === id ? { ...e, status } : e) } }),
      deleteExpense: (id) => set((state) => { toast.error('Expense deleted.', { icon: '🗑️' }); return { expenses: state.expenses.filter(e => e.id !== id) } }),

      journalEntries: [
        { id: "JE-1001", date: "Oct 17, 2026", description: "Sales Revenue Recognition", debit: "$12,400.00", credit: "$12,400.00", by: "Accountant", status: "Posted" },
        { id: "JE-1002", date: "Oct 16, 2026", description: "Payroll Processing – Oct", debit: "$54,000.00", credit: "$54,000.00", by: "Admin", status: "Posted" },
        { id: "JE-1003", date: "Oct 18, 2026", description: "Office Supplies Purchase", debit: "$1,200.00", credit: "$1,200.00", by: "Accountant", status: "Draft" },
      ],
      addJournalEntry: (entry) => set((state) => { toast.success(`Journal entry added!`); return { journalEntries: [...state.journalEntries, entry] } }),
      updateJournalStatus: (id, status) => set((state) => { toast.success(`Status updated to ${status}!`); return { journalEntries: state.journalEntries.map(j => j.id === id ? { ...j, status } : j) } }),
      deleteJournalEntry: (id) => set((state) => { toast.error('Journal entry deleted.', { icon: '🗑️' }); return { journalEntries: state.journalEntries.filter(j => j.id !== id) } }),
    }),
    {
      name: 'erp-accounting-storage',
    }
  )
)
