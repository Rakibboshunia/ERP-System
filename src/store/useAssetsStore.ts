import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Asset {
  id: string
  name: string
  category: string
  purchaseDate: string
  cost: string
  currentValue: string
  location: string
  condition: "Good" | "Fair" | "Poor"
  status: "In Use" | "Allocated" | "Under Maintenance"
}

export interface AssetAllocation {
  id: string
  asset: string
  assetId: string
  assignedTo: string
  custodian: string
  department: string
  allocatedDate: string
  returnDate: string
  status: "Active" | "Returned"
}

interface AssetsState {
  assets: Asset[]
  addAsset: (asset: Asset) => void
  updateAssetStatus: (id: string, status: Asset["status"]) => void
  deleteAsset: (id: string) => void

  allocations: AssetAllocation[]
  addAllocation: (allocation: AssetAllocation) => void
  returnAllocation: (id: string) => void
  deleteAllocation: (id: string) => void
}

export const useAssetsStore = create<AssetsState>()(
  persist(
    (set) => ({
      assets: [
        { id: "AST-001", name: "Dell Server Rack", category: "IT Equipment", purchaseDate: "Jan 10, 2023", cost: "$18,000.00", currentValue: "$13,500.00", location: "Main WH", condition: "Good", status: "In Use" },
        { id: "AST-002", name: "Company Van – TC-1204", category: "Vehicles", purchaseDate: "Mar 05, 2022", cost: "$32,000.00", currentValue: "$22,400.00", location: "HQ Garage", condition: "Good", status: "In Use" },
        { id: "AST-003", name: "CNC Machine X200", category: "Machinery", purchaseDate: "Jun 18, 2021", cost: "$75,000.00", currentValue: "$48,750.00", location: "East WH", condition: "Fair", status: "In Use" },
        { id: "AST-004", name: "Office Laptop Fleet (x20)", category: "IT Equipment", purchaseDate: "Aug 01, 2023", cost: "$40,000.00", currentValue: "$32,000.00", location: "Headquarters", condition: "Good", status: "Allocated" },
        { id: "AST-005", name: "Office Furniture Set", category: "Furniture", purchaseDate: "Feb 14, 2020", cost: "$12,000.00", currentValue: "$4,800.00", location: "Headquarters", condition: "Poor", status: "In Use" },
        { id: "AST-006", name: "Industrial Generator", category: "Machinery", purchaseDate: "Nov 11, 2019", cost: "$28,000.00", currentValue: "$5,600.00", location: "Main WH", condition: "Fair", status: "Under Maintenance" },
      ],
      addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
      updateAssetStatus: (id, status) => set((state) => ({
        assets: state.assets.map(a => a.id === id ? { ...a, status } : a)
      })),
      deleteAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),

      allocations: [
        { id: "ALC-01", asset: "Dell Server Rack", assetId: "AST-001", assignedTo: "IT Department", custodian: "Alice Johnson", department: "Engineering", allocatedDate: "Jan 15, 2023", returnDate: "--", status: "Active" },
        { id: "ALC-02", asset: "Office Laptop Fleet", assetId: "AST-004", assignedTo: "Sales Team", custodian: "Diana Prince", department: "Sales", allocatedDate: "Aug 05, 2023", returnDate: "--", status: "Active" },
        { id: "ALC-03", asset: "Company Van", assetId: "AST-002", assignedTo: "Logistics", custodian: "Bob Smith", department: "Operations", allocatedDate: "Mar 10, 2022", returnDate: "--", status: "Active" },
        { id: "ALC-04", asset: "Industrial Generator", assetId: "AST-006", assignedTo: "Maintenance", custodian: "Charlie Davis", department: "Facilities", allocatedDate: "Nov 20, 2019", returnDate: "Oct 01, 2026", status: "Returned" },
      ],
      addAllocation: (allocation) => set((state) => ({ allocations: [...state.allocations, allocation] })),
      returnAllocation: (id) => set((state) => ({
        allocations: state.allocations.map(a => a.id === id ? { ...a, status: "Returned", returnDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : a)
      })),
      deleteAllocation: (id) => set((state) => ({ allocations: state.allocations.filter(a => a.id !== id) })),
    }),
    {
      name: 'erp-assets-storage',
    }
  )
)
