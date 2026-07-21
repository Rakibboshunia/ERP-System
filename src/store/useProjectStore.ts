import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string
  name: string
  client: string
  manager: string
  team: number
  deadline: string
  progress: number
  status: "Active" | "On Hold" | "Completed"
}

export interface Task {
  id: string
  project: string
  title: string
  assignee: string
  priority: "High" | "Medium" | "Low"
  due: string
  status: "Todo" | "In Progress" | "Done"
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  projects: number
  tasksOpen: number
  status: "Active" | "On Leave"
}

export interface TimeLog {
  id: string
  member: string
  project: string
  task: string
  date: string
  duration: string
  billable: boolean
}

interface ProjectState {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, data: Partial<Project>) => void
  deleteProject: (id: string) => void

  tasks: Task[]
  addTask: (task: Task) => void
  updateTaskStatus: (id: string, status: "Todo" | "In Progress" | "Done") => void
  deleteTask: (id: string) => void

  teamMembers: TeamMember[]
  addTeamMember: (member: TeamMember) => void
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void

  timeLogs: TimeLog[]
  addTimeLog: (log: TimeLog) => void
  deleteTimeLog: (id: string) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [
        { id: "PRJ-001", name: "ERP System Rollout", client: "Internal", manager: "Alice Johnson", team: 8, deadline: "Dec 31, 2026", progress: 65, status: "Active" },
        { id: "PRJ-002", name: "Website Redesign", client: "Acme Corp", manager: "Bob Smith", team: 4, deadline: "Nov 15, 2026", progress: 80, status: "Active" },
        { id: "PRJ-003", name: "Mobile App v2.0", client: "Stark Industries", manager: "Diana Prince", team: 6, deadline: "Jan 30, 2027", progress: 30, status: "On Hold" },
        { id: "PRJ-004", name: "Data Migration", client: "Wayne Ent.", manager: "Evan Wright", team: 3, deadline: "Oct 30, 2026", progress: 95, status: "Completed" },
      ],
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...data } : p)
      })),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      tasks: [
        { id: "TSK-101", project: "ERP System Rollout", title: "Design database schema", assignee: "Alice Johnson", priority: "High", due: "Oct 25, 2026", status: "Done" },
        { id: "TSK-102", project: "ERP System Rollout", title: "Implement RBAC module", assignee: "Bob Smith", priority: "High", due: "Oct 28, 2026", status: "In Progress" },
        { id: "TSK-103", project: "Website Redesign", title: "Create wireframes", assignee: "Diana Prince", priority: "Medium", due: "Oct 22, 2026", status: "Done" },
        { id: "TSK-104", project: "Website Redesign", title: "Develop landing page", assignee: "Charlie Davis", priority: "High", due: "Oct 30, 2026", status: "In Progress" },
        { id: "TSK-105", project: "Mobile App v2.0", title: "Set up CI/CD pipeline", assignee: "Evan Wright", priority: "Low", due: "Nov 10, 2026", status: "Todo" },
        { id: "TSK-106", project: "ERP System Rollout", title: "Write unit tests", assignee: "Alice Johnson", priority: "Medium", due: "Nov 01, 2026", status: "Todo" },
      ],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
      })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),

      teamMembers: [
        { id: "M1", name: "Alice Johnson", role: "Project Lead", email: "alice@erp.com", projects: 2, tasksOpen: 4, status: "Active" },
        { id: "M2", name: "Bob Smith", role: "Backend Dev", email: "bob@erp.com", projects: 1, tasksOpen: 2, status: "Active" },
        { id: "M3", name: "Charlie Davis", role: "UI/UX Designer", email: "charlie@erp.com", projects: 1, tasksOpen: 1, status: "Active" },
        { id: "M4", name: "Diana Prince", role: "Frontend Dev", email: "diana@erp.com", projects: 2, tasksOpen: 3, status: "Active" },
        { id: "M5", name: "Evan Wright", role: "DevOps Engineer", email: "evan@erp.com", projects: 2, tasksOpen: 1, status: "On Leave" },
      ],
      addTeamMember: (member) => set((state) => ({ teamMembers: [...state.teamMembers, member] })),
      updateTeamMember: (id, data) => set((state) => ({
        teamMembers: state.teamMembers.map(m => m.id === id ? { ...m, ...data } : m)
      })),
      deleteTeamMember: (id) => set((state) => ({ teamMembers: state.teamMembers.filter(m => m.id !== id) })),

      timeLogs: [
        { id: "TL-01", member: "Alice Johnson", project: "ERP System Rollout", task: "Implement RBAC module", date: "Oct 17, 2026", duration: "3h 45m", billable: true },
        { id: "TL-02", member: "Bob Smith", project: "ERP System Rollout", task: "Database schema design", date: "Oct 17, 2026", duration: "2h 30m", billable: true },
        { id: "TL-03", member: "Diana Prince", project: "Website Redesign", task: "Develop landing page", date: "Oct 16, 2026", duration: "5h 00m", billable: true },
        { id: "TL-04", member: "Charlie Davis", project: "Website Redesign", task: "Create wireframes", date: "Oct 15, 2026", duration: "4h 15m", billable: false },
      ],
      addTimeLog: (log) => set((state) => ({ timeLogs: [...state.timeLogs, log] })),
      deleteTimeLog: (id) => set((state) => ({ timeLogs: state.timeLogs.filter(l => l.id !== id) })),
    }),
    {
      name: 'erp-project-storage',
    }
  )
)
