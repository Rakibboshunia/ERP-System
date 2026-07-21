import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = "superadmin" | "admin" | "hr" | "accountant" | "sales_manager" | "inventory_manager" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

// ----- DATA TYPES -----
export interface Product {
  id: string
  name: string
  category: string
  brand: string
  warehouse: string
  stock: number
  minStock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  price: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "Active" | "Inactive"
}

export interface Branch {
  id: string
  name: string
  location: string
  head: string
  status: "Active" | "Inactive"
}

export interface Department {
  id: string
  name: string
  branch: string
  head: string
  empCount: number
}

export interface Designation {
  id: string
  title: string
  department: string
  level: string
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "Active" | "On Leave" | "Terminated"
}

export interface LeaveRequest {
  id: string
  emp: string
  type: string
  dates: string
  status: "Approved" | "Pending" | "Rejected"
}

export interface ReturnRequest {
  id: string
  invoiceRef: string
  customer: string
  items: number
  reason: string
  amount: string
  date: string
  status: "Approved" | "Pending" | "Rejected"
}

export interface SupplierRating {
  id: string
  name: string
  onTime: number
  quality: number
  responseTime: string
  returns: number
  overall: number
}

export interface SupplierPayment {
  id: string
  supplier: string
  invoiceNo: string
  amount: string
  dueDate: string
  daysLeft: number
  status: "Upcoming" | "Due Soon" | "Overdue" | "Paid"
}

// ----- STORE INTERFACE -----
interface AppState {
  // Global App State
  user: User | null
  setUser: (user: User | null) => void
  activeFiscalYear: string
  setActiveFiscalYear: (year: string) => void

  // Inventory State
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // CRM State
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, data: Partial<Customer>) => void
  deleteCustomer: (id: string) => void

  // Company State
  branches: Branch[]
  addBranch: (branch: Branch) => void
  deleteBranch: (id: string) => void

  departments: Department[]
  addDepartment: (dept: Department) => void
  deleteDepartment: (id: string) => void

  designations: Designation[]
  addDesignation: (desig: Designation) => void
  deleteDesignation: (id: string) => void

  // HR State
  employees: Employee[]
  addEmployee: (emp: Employee) => void
  deleteEmployee: (id: string) => void

  leaveRequests: LeaveRequest[]
  addLeaveRequest: (lr: LeaveRequest) => void
  updateLeaveRequestStatus: (id: string, status: "Approved" | "Pending" | "Rejected") => void

  // Sales Management State
  returns: ReturnRequest[]
  addReturn: (ret: ReturnRequest) => void
  updateReturnStatus: (id: string, status: "Approved" | "Pending" | "Rejected") => void
  deleteReturn: (id: string) => void

  // Supplier Management State
  supplierRatings: SupplierRating[]
  addSupplierRating: (rating: SupplierRating) => void
  updateSupplierRating: (id: string, data: Partial<SupplierRating>) => void
  deleteSupplierRating: (id: string) => void

  supplierPayments: SupplierPayment[]
  addSupplierPayment: (payment: SupplierPayment) => void
  updateSupplierPaymentStatus: (id: string, status: "Upcoming" | "Due Soon" | "Overdue" | "Paid") => void
  deleteSupplierPayment: (id: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // --- APP STATE ---
      user: {
        id: "U001",
        name: "Admin User",
        email: "admin@enterprise.erp",
        role: "superadmin",
      },
      setUser: (user) => set({ user }),
      activeFiscalYear: "2026",
      setActiveFiscalYear: (year) => set({ activeFiscalYear: year }),

      // --- INVENTORY STATE ---
      products: [
        { id: "PRD-1001", name: "Dell XPS 15", category: "Electronics", brand: "Dell", warehouse: "Main WH", stock: 45, minStock: 10, status: "In Stock", price: "$1,899.00" },
        { id: "PRD-1002", name: "Ergonomic Chair", category: "Furniture", brand: "Herman Miller", warehouse: "Main WH", stock: 12, minStock: 15, status: "Low Stock", price: "$999.00" },
        { id: "PRD-1003", name: "Wireless Keyboard", category: "Accessories", brand: "Logitech", warehouse: "East WH", stock: 150, minStock: 20, status: "In Stock", price: "$129.00" },
        { id: "PRD-1004", name: "USB-C Hub", category: "Accessories", brand: "Anker", warehouse: "Main WH", stock: 0, minStock: 10, status: "Out of Stock", price: "$49.00" },
        { id: "PRD-1005", name: "4K Monitor", category: "Electronics", brand: "LG", warehouse: "East WH", stock: 8, minStock: 10, status: "Low Stock", price: "$450.00" },
        { id: "PRD-1006", name: "MacBook Pro M3", category: "Electronics", brand: "Apple", warehouse: "Main WH", stock: 32, minStock: 5, status: "In Stock", price: "$2,499.00" },
      ],
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, data) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),

      // --- CRM STATE ---
      customers: [
        { id: "CUST-001", name: "Alice Johnson", company: "Acme Corp", email: "alice@acme.com", phone: "+1 555-0100", status: "Active" },
        { id: "CUST-002", name: "Bob Smith", company: "Tech Flow", email: "bob@techflow.io", phone: "+1 555-0200", status: "Inactive" },
      ],
      addCustomer: (customer) => set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, data) => set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? { ...c, ...data } : c)),
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
      })),

      // --- COMPANY STATE ---
      branches: [
        { id: "BR-01", name: "Headquarters", location: "Tech City", head: "Alice Smith", status: "Active" },
        { id: "BR-02", name: "East Coast Hub", location: "New York", head: "Bob Johnson", status: "Active" },
        { id: "BR-03", name: "European Office", location: "London", head: "Claire Williams", status: "Inactive" },
      ],
      addBranch: (branch) => set((state) => ({ branches: [...state.branches, branch] })),
      deleteBranch: (id) => set((state) => ({ branches: state.branches.filter((b) => b.id !== id) })),

      departments: [
        { id: "D-01", name: "Engineering", branch: "Headquarters", head: "David Lee", empCount: 45 },
        { id: "D-02", name: "Sales & Marketing", branch: "All Branches", head: "Eva Green", empCount: 32 },
        { id: "D-03", name: "Human Resources", branch: "Headquarters", head: "Frank Miller", empCount: 8 },
      ],
      addDepartment: (dept) => set((state) => ({ departments: [...state.departments, dept] })),
      deleteDepartment: (id) => set((state) => ({ departments: state.departments.filter((d) => d.id !== id) })),

      designations: [
        { id: "DS-01", title: "Software Engineer", department: "Engineering", level: "Mid" },
        { id: "DS-02", title: "Sales Manager", department: "Sales & Marketing", level: "Senior" },
        { id: "DS-03", title: "HR Generalist", department: "Human Resources", level: "Junior" },
      ],
      addDesignation: (desig) => set((state) => ({ designations: [...state.designations, desig] })),
      deleteDesignation: (id) => set((state) => ({ designations: state.designations.filter((d) => d.id !== id) })),

      // --- HR STATE ---
      employees: [
        { id: "EMP-001", name: "Alice Johnson", email: "alice@acme.corp", role: "Software Engineer", department: "Engineering", status: "Active" },
        { id: "EMP-002", name: "Bob Smith", email: "bob@acme.corp", role: "Product Manager", department: "Product", status: "Active" },
        { id: "EMP-003", name: "Charlie Davis", email: "charlie@acme.corp", role: "HR Specialist", department: "Human Resources", status: "On Leave" },
        { id: "EMP-004", name: "Diana Prince", email: "diana@acme.corp", role: "Sales Executive", department: "Sales", status: "Active" },
        { id: "EMP-005", name: "Evan Wright", email: "evan@acme.corp", role: "Accountant", department: "Finance", status: "Terminated" },
      ],
      addEmployee: (emp) => set((state) => ({ employees: [...state.employees, emp] })),
      deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter((e) => e.id !== id) })),

      leaveRequests: [
        { id: "LR-101", emp: "Charlie Davis", type: "Annual Leave", dates: "Oct 15 - Oct 20", status: "Approved" },
        { id: "LR-102", emp: "Diana Prince", type: "Sick Leave", dates: "Oct 18 - Oct 19", status: "Pending" },
      ],
      addLeaveRequest: (lr) => set((state) => ({ leaveRequests: [...state.leaveRequests, lr] })),
      updateLeaveRequestStatus: (id, status) => set((state) => ({
        leaveRequests: state.leaveRequests.map(lr => lr.id === id ? { ...lr, status } : lr)
      })),

      // --- SALES MANAGEMENT STATE ---
      returns: [
        { id: "RMA-6001", invoiceRef: "INV-4202", customer: "Stark Industries", items: 2, reason: "Defective unit", amount: "$9,000.00", date: "Oct 19, 2026", status: "Approved" },
        { id: "RMA-6002", invoiceRef: "INV-4201", customer: "Acme Corp", items: 1, reason: "Wrong item shipped", amount: "$2,480.00", date: "Oct 20, 2026", status: "Pending" },
        { id: "RMA-6003", invoiceRef: "INV-4203", customer: "Oscorp", items: 3, reason: "Customer changed mind", amount: "$1,620.00", date: "Oct 15, 2026", status: "Rejected" },
      ],
      addReturn: (ret) => set((state) => ({ returns: [...state.returns, ret] })),
      updateReturnStatus: (id, status) => set((state) => ({
        returns: state.returns.map(r => r.id === id ? { ...r, status } : r)
      })),
      deleteReturn: (id) => set((state) => ({ returns: state.returns.filter(r => r.id !== id) })),

      // --- SUPPLIER MANAGEMENT STATE ---
      supplierRatings: [
        { id: "SUP-001", name: "TechParts Inc.", onTime: 96, quality: 4.7, responseTime: "< 2 hours", returns: 1.2, overall: 4.8 },
        { id: "SUP-002", name: "Global Steel Co.", onTime: 88, quality: 4.3, responseTime: "< 4 hours", returns: 3.1, overall: 4.1 },
        { id: "SUP-003", name: "FastShip Logistics", onTime: 72, quality: 3.5, responseTime: "< 1 day", returns: 8.4, overall: 3.2 },
        { id: "SUP-004", name: "OfficeWorld Supplies", onTime: 99, quality: 4.9, responseTime: "< 1 hour", returns: 0.5, overall: 4.9 },
      ],
      addSupplierRating: (rating) => set((state) => ({ supplierRatings: [...state.supplierRatings, rating] })),
      updateSupplierRating: (id, data) => set((state) => ({
        supplierRatings: state.supplierRatings.map(r => r.id === id ? { ...r, ...data } : r)
      })),
      deleteSupplierRating: (id) => set((state) => ({ supplierRatings: state.supplierRatings.filter(r => r.id !== id) })),

      supplierPayments: [
        { id: "PAY-201", supplier: "TechParts Inc.", invoiceNo: "INV-8844", amount: "$14,200.00", dueDate: "Oct 25, 2026", daysLeft: 8, status: "Upcoming" },
        { id: "PAY-202", supplier: "Global Steel Co.", invoiceNo: "INV-9210", amount: "$32,500.00", dueDate: "Oct 20, 2026", daysLeft: 3, status: "Due Soon" },
        { id: "PAY-203", supplier: "OfficeWorld Supplies", invoiceNo: "INV-7721", amount: "$780.00", dueDate: "Oct 15, 2026", daysLeft: -2, status: "Overdue" },
      ],
      addSupplierPayment: (payment) => set((state) => ({ supplierPayments: [...state.supplierPayments, payment] })),
      updateSupplierPaymentStatus: (id, status) => set((state) => ({
        supplierPayments: state.supplierPayments.map(p => p.id === id ? { ...p, status } : p)
      })),
      deleteSupplierPayment: (id) => set((state) => ({ supplierPayments: state.supplierPayments.filter(p => p.id !== id) })),

    }),
    {
      name: 'erp-storage', // Key used in localStorage
    }
  )
)
