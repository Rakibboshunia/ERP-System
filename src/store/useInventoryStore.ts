import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export interface InventoryCategory {
  id: string
  name: string
  description: string
  products: number
  status: "Active" | "Inactive"
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  used: number
  manager: string
}

interface InventoryState {
  categories: InventoryCategory[]
  addCategory: (category: InventoryCategory) => void
  updateCategory: (id: string, data: Partial<InventoryCategory>) => void
  deleteCategory: (id: string) => void

  warehouses: Warehouse[]
  addWarehouse: (warehouse: Warehouse) => void
  updateWarehouse: (id: string, data: Partial<Warehouse>) => void
  deleteWarehouse: (id: string) => void
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      categories: [
        { id: "CAT-01", name: "Electronics", description: "Computers, phones, and gadgets", products: 320, status: "Active" },
        { id: "CAT-02", name: "Furniture", description: "Office and home furniture", products: 85, status: "Active" },
        { id: "CAT-03", name: "Accessories", description: "Peripherals and add-ons", products: 210, status: "Active" },
      ],
      addCategory: (category) => set((state) => { toast.success(`Category added!`); return { categories: [...state.categories, category] } }),
      updateCategory: (id, data) => set((state) => { toast.success(`Category updated!`); return {
        categories: state.categories.map(c => c.id === id ? { ...c, ...data } : c)
      } }),
      deleteCategory: (id) => set((state) => { toast.error('Category deleted.', { icon: '🗑️' }); return { categories: state.categories.filter(c => c.id !== id) } }),

      warehouses: [
        { id: "WH-01", name: "Main Warehouse", location: "Tech City", capacity: 5000, used: 3800, manager: "Tom Riley" },
        { id: "WH-02", name: "East Hub", location: "New York", capacity: 2000, used: 1100, manager: "Sara Kim" },
      ],
      addWarehouse: (warehouse) => set((state) => { toast.success(`Warehouse added!`); return { warehouses: [...state.warehouses, warehouse] } }),
      updateWarehouse: (id, data) => set((state) => { toast.success(`Warehouse updated!`); return {
        warehouses: state.warehouses.map(w => w.id === id ? { ...w, ...data } : w)
      } }),
      deleteWarehouse: (id) => set((state) => { toast.error('Warehouse deleted.', { icon: '🗑️' }); return { warehouses: state.warehouses.filter(w => w.id !== id) } }),
    }),
    {
      name: 'erp-inventory-storage',
    }
  )
)
