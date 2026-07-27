"use client"

import { useState } from "react"
import { useStore, Role } from "@/store/useStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Eye, EyeOff, CheckCircle2, ArrowRight, Sparkles, Command, ShieldCheck, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const users: Record<string, { id: string, name: string, email: string, role: Role }> = {
  "superadmin@erp.com": { id: "1", name: "Super Admin", email: "superadmin@erp.com", role: "superadmin" },
  "admin@erp.com": { id: "2", name: "Admin", email: "admin@erp.com", role: "admin" },
  "hr@erp.com": { id: "3", name: "HR Manager", email: "hr@erp.com", role: "hr" },
  "accountant@erp.com": { id: "4", name: "Accountant", email: "accountant@erp.com", role: "accountant" },
  "sales@erp.com": { id: "5", name: "Sales Manager", email: "sales@erp.com", role: "sales_manager" },
  "inventory@erp.com": { id: "6", name: "Inventory Manager", email: "inventory@erp.com", role: "inventory_manager" },
  "employee@erp.com": { id: "7", name: "Regular Employee", email: "employee@erp.com", role: "employee" },
}

const demoRoles = [
  { role: "Super Admin", email: "superadmin@erp.com", gradient: "from-purple-500/20 to-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/50" },
  { role: "Admin", email: "admin@erp.com", gradient: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/50" },
  { role: "HR", email: "hr@erp.com", gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50" },
  { role: "Accountant", email: "accountant@erp.com", gradient: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/50" },
  { role: "Sales Manager", email: "sales@erp.com", gradient: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/50" },
  { role: "Inventory Manager", email: "inventory@erp.com", gradient: "from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-900/50" },
  { role: "Employee", email: "employee@erp.com", gradient: "from-slate-500/20 to-zinc-500/20 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/50" },
]

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("superadmin@erp.com")
  const [selectedRole, setSelectedRole] = useState("Super Admin")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const user = users[email]
    
    if (user) {
      setUser(user)
      router.push("/")
      router.refresh()
    } else {
      setIsLoading(false)
      alert("Invalid credentials")
    }
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background selection:bg-primary/30">
      {/* LEFT PANEL - Premium Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 overflow-hidden flex-col justify-between p-16 text-white border-r border-white/10">
        {/* Animated ambient mesh gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 100, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-violet-600/20 blur-[140px]" 
          />
        </div>

        {/* Premium subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center gap-4"
        >
          <div className="bg-gradient-to-br from-primary to-primary/60 p-3 rounded-2xl shadow-xl shadow-primary/20 ring-1 ring-white/20">
            <Command className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Enterprise OS</span>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-xl mt-auto mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-bold leading-[1.1] mb-8 tracking-tight">
            The intelligent core of your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">entire business.</span>
          </motion.h2>
          
          <div className="space-y-6">
            {[
              { icon: Activity, title: "Real-time AI Analytics", desc: "Predictive insights powered by machine learning." },
              { icon: ShieldCheck, title: "Enterprise-grade Security", desc: "Bank-level encryption with granular RBAC." },
              { icon: Sparkles, title: "Automated Workflows", desc: "Eliminate manual data entry instantly." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex items-start gap-5 group">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-zinc-400 mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 pt-8 border-t border-white/10 text-sm text-zinc-500 font-medium flex items-center justify-between"
        >
          <span>© 2026 Enterprise OS.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL - Premium Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-background/50 backdrop-blur-3xl">
        {/* Subtle background glow for right side */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="w-full max-w-[440px]"
        >
          {/* Mobile Logo */}
          <motion.div variants={fadeUp} className="lg:hidden flex items-center justify-center gap-3 mb-10">
             <div className="bg-gradient-to-br from-primary to-primary/60 p-2.5 rounded-xl shadow-lg">
               <Command className="w-6 h-6 text-white" />
             </div>
             <span className="text-2xl font-bold tracking-tight">Enterprise OS</span>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center lg:text-left space-y-3 mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-base">Enter your credentials to access your workspace.</p>
          </motion.div>

          <motion.form variants={fadeUp} className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 bg-muted/50 border-border/50 transition-all duration-300 focus-visible:ring-primary/50 focus-visible:bg-background shadow-sm rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  className="h-12 pr-12 bg-muted/50 border-border/50 transition-all duration-300 focus-visible:ring-primary/50 focus-visible:bg-background shadow-sm rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 text-base font-semibold shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm rounded-xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                {isLoading ? "Authenticating..." : "Sign In to Workspace"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Button>
          </motion.form>

          <motion.div variants={fadeUp} className="relative py-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/60" /></div>
            <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
              <span className="bg-background px-4 text-muted-foreground">Quick Access Demo</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
            {demoRoles.map(({ role, email: demoEmail, gradient }) => (
              <button
                key={role}
                onClick={() => { setEmail(demoEmail); setSelectedRole(role) }}
                className={`relative overflow-hidden flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 outline-none
                  ${selectedRole === role 
                    ? "border-transparent ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02]" 
                    : "border-border/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 bg-muted/20"
                  }
                `}
              >
                {/* Background Gradient for selected state */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 ${selectedRole === role ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                
                <span className={`relative z-10 ${selectedRole === role ? 'text-foreground' : 'text-muted-foreground'}`}>{role}</span>
                {selectedRole === role && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
