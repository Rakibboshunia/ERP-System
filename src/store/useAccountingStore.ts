import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
      incomes: [
        { id: "INC-201", source: "Product Sales", customer: "Acme Corp", amount: "$12,400.00", date: "Oct 05, 2026", status: "Received" },
        { id: "INC-202", source: "Consulting Fee", customer: "Wayne Ent.", amount: "$4,200.00", date: "Oct 08, 2026", status: "Received" },
        { id: "INC-203", source: "Product Sales", customer: "Stark Ind.", amount: "$54,000.00", date: "Oct 17, 2026", status: "Pending" },
      ],
      addIncome: (income) => set((state) => ({ incomes: [...state.incomes, income] })),
      updateIncomeStatus: (id, status) => set((state) => ({
        incomes: state.incomes.map(i => i.id === id ? { ...i, status } : i)
      })),
      deleteIncome: (id) => set((state) => ({ incomes: state.incomes.filter(i => i.id !== id) })),

      expenses: [
        { id: "EXP-101", category: "Salaries", description: "October Payroll", amount: "$54,000.00", date: "Oct 01, 2026", status: "Paid" },
        { id: "EXP-102", category: "Software", description: "AWS Hosting – Oct", amount: "$890.00", date: "Oct 05, 2026", status: "Paid" },
        { id: "EXP-103", category: "Office Supplies", description: "Amazon Purchase", amount: "$450.00", date: "Oct 10, 2026", status: "Pending" },
        { id: "EXP-104", category: "Travel", description: "NY Sales Trip", amount: "$2,100.00", date: "Oct 14, 2026", status: "Paid" },
      ],
      addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
      updateExpenseStatus: (id, status) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, status } : e)
      })),
      deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter(e => e.id !== id) })),

      journalEntries: [
        { id: "JE-1001", date: "Oct 17, 2026", description: "Sales Revenue Recognition", debit: "$12,400.00", credit: "$12,400.00", by: "Accountant", status: "Posted" },
        { id: "JE-1002", date: "Oct 16, 2026", description: "Payroll Processing – Oct", debit: "$54,000.00", credit: "$54,000.00", by: "Admin", status: "Posted" },
        { id: "JE-1003", date: "Oct 18, 2026", description: "Office Supplies Purchase", debit: "$1,200.00", credit: "$1,200.00", by: "Accountant", status: "Draft" },
      ],
      addJournalEntry: (entry) => set((state) => ({ journalEntries: [...state.journalEntries, entry] })),
      updateJournalStatus: (id, status) => set((state) => ({
        journalEntries: state.journalEntries.map(j => j.id === id ? { ...j, status } : j)
      })),
      deleteJournalEntry: (id) => set((state) => ({ journalEntries: state.journalEntries.filter(j => j.id !== id) })),
    }),
    {
      name: 'erp-accounting-storage',
    }
  )
)
