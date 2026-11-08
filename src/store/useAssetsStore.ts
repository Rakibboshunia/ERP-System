import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

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

export interface DepreciationSchedule {
  id: string
  name: string
  method: string
  usefulLife: string
  annualDep: string
  accumulated: string
  bookValue: string
  lastUpdated: string
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

  depreciationSchedules: DepreciationSchedule[]
  addDepreciation: (dep: DepreciationSchedule) => void
  updateDepreciation: (id: string, data: Partial<DepreciationSchedule>) => void
  deleteDepreciation: (id: string) => void
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
      
      addAsset: (asset) => set((state) => { toast.success(`Asset ${asset.name} added!`); return { assets: [...state.assets, asset] } }),
      updateAssetStatus: (id, status) => set((state) => { toast.success(`Asset status updated to ${status}!`); return {
        assets: state.assets.map(a => a.id === id ? { ...a, status } : a)
      } }),
      deleteAsset: (id) => set((state) => { toast.error('Asset deleted.', { icon: '🗑️' }); return { assets: state.assets.filter(a => a.id !== id) } }),

      allocations: [
        { id: "ALC-01", asset: "Dell Server Rack", assetId: "AST-001", assignedTo: "IT Department", custodian: "Alice Johnson", department: "Engineering", allocatedDate: "Jan 15, 2023", returnDate: "--", status: "Active" },
        { id: "ALC-02", asset: "Office Laptop Fleet", assetId: "AST-004", assignedTo: "Sales Team", custodian: "Diana Prince", department: "Sales", allocatedDate: "Aug 05, 2023", returnDate: "--", status: "Active" },
        { id: "ALC-03", asset: "Company Van", assetId: "AST-002", assignedTo: "Logistics", custodian: "Bob Smith", department: "Operations", allocatedDate: "Mar 10, 2022", returnDate: "--", status: "Active" },
        { id: "ALC-04", asset: "Industrial Generator", assetId: "AST-006", assignedTo: "Maintenance", custodian: "Charlie Davis", department: "Facilities", allocatedDate: "Nov 20, 2019", returnDate: "Oct 01, 2026", status: "Returned" },
      ],
      addAllocation: (allocation) => set((state) => { toast.success(`Asset allocated!`); return { allocations: [...state.allocations, allocation] } }),
      returnAllocation: (id) => set((state) => { toast.success(`Asset returned!`); return {
        allocations: state.allocations.map(a => a.id === id ? { ...a, status: "Returned", returnDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : a)
      } }),
      deleteAllocation: (id) => set((state) => { toast.error('Allocation deleted.', { icon: '🗑️' }); return { allocations: state.allocations.filter(a => a.id !== id) } }),

      depreciationSchedules: [
        { id: "AST-001", name: "Dell Server Rack", method: "Straight-Line", usefulLife: "5 Years", annualDep: "$3,600.00", accumulated: "$9,000.00", bookValue: "$9,000.00", lastUpdated: "Dec 31, 2025" },
        { id: "AST-002", name: "Company Van", method: "Declining Balance", usefulLife: "8 Years", annualDep: "$5,600.00", accumulated: "$11,200.00", bookValue: "$20,800.00", lastUpdated: "Dec 31, 2025" },
        { id: "AST-003", name: "CNC Machine X200", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$7,500.00", accumulated: "$26,250.00", bookValue: "$48,750.00", lastUpdated: "Dec 31, 2025" },
        { id: "AST-004", name: "Laptop Fleet (x20)", method: "Straight-Line", usefulLife: "3 Years", annualDep: "$13,333.00", accumulated: "$8,000.00", bookValue: "$32,000.00", lastUpdated: "Dec 31, 2025" },
        { id: "AST-005", name: "Office Furniture", method: "Straight-Line", usefulLife: "10 Years", annualDep: "$1,200.00", accumulated: "$7,200.00", bookValue: "$4,800.00", lastUpdated: "Dec 31, 2025" },
      ],
      addDepreciation: (dep) => set((state) => { toast.success(`Depreciation record added!`); return { depreciationSchedules: [...state.depreciationSchedules, dep] } }),
      updateDepreciation: (id, data) => set((state) => { toast.success(`Depreciation record updated!`); return {
        depreciationSchedules: state.depreciationSchedules.map(d => d.id === id ? { ...d, ...data } : d)
      } }),
      deleteDepreciation: (id) => set((state) => { toast.error('Depreciation record deleted.', { icon: '🗑️' }); return { depreciationSchedules: state.depreciationSchedules.filter(d => d.id !== id) } }),
    }),
    {
      name: 'erp-assets-storage',
    }
  )
)
