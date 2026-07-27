"use client"

import { useState } from "react"
import { useStore, Role } from "@/store/useStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Eye, EyeOff, CheckCircle2, ArrowRight, Sparkles, Command, ShieldCheck, Activity, Box } from "lucide-react"
import { motion, useMotionValue, useTransform } from "framer-motion"

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
  { role: "Super Admin", email: "superadmin@erp.com", gradient: "from-purple-500/20 to-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/50 shadow-indigo-500/10" },
  { role: "Admin", email: "admin@erp.com", gradient: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/50 shadow-blue-500/10" },
  { role: "HR", email: "hr@erp.com", gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50 shadow-emerald-500/10" },
  { role: "Accountant", email: "accountant@erp.com", gradient: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/50 shadow-amber-500/10" },
  { role: "Sales Manager", email: "sales@erp.com", gradient: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/50 shadow-rose-500/10" },
  { role: "Inventory Manager", email: "inventory@erp.com", gradient: "from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-900/50 shadow-teal-500/10" },
  { role: "Employee", email: "employee@erp.com", gradient: "from-slate-500/20 to-zinc-500/20 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/50 shadow-slate-500/10" },
]

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("superadmin@erp.com")
  const [selectedRole, setSelectedRole] = useState("Super Admin")
  const [isLoading, setIsLoading] = useState(false)

  // 3D Tilt Effect Variables
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Maps mouse position to a rotation angle (-10 to 10 degrees)
  const rotateX = useTransform(y, [-300, 300], [8, -8])
  const rotateY = useTransform(x, [-300, 300], [-8, 8])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background selection:bg-primary/30 overflow-hidden">
      {/* LEFT PANEL - Premium 3D Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 overflow-hidden flex-col justify-between p-16 text-white border-r border-white/10" style={{ perspective: "1000px" }}>
        
        {/* Animated 3D Floating Glass Panels in Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ transformStyle: "preserve-3d" }}>
          
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotateX: [10, 30, 10],
              rotateZ: [-10, 10, -10]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] w-[300px] h-[400px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl" 
            style={{ transform: "translateZ(-100px)" }}
          />

          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotateY: [15, -15, 15],
              rotateZ: [5, -5, 5]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(59,130,246,0.3)]" 
            style={{ transform: "translateZ(-50px)" }}
          />
          
          {/* Ambient light orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" 
          />
        </div>

        {/* Premium subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center gap-4"
        >
          <div className="bg-gradient-to-br from-primary to-blue-600 p-3 rounded-2xl shadow-xl shadow-primary/30 ring-1 ring-white/20">
            <Box className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Enterprise OS 3D</span>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-xl mt-auto mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-extrabold leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
            The intelligent core of your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">entire business.</span>
          </motion.h2>
          
          <div className="space-y-6">
            {[
              { icon: Activity, title: "Real-time AI Analytics", desc: "Predictive insights powered by machine learning." },
              { icon: ShieldCheck, title: "Enterprise-grade Security", desc: "Bank-level encryption with granular RBAC." },
              { icon: Sparkles, title: "Automated Workflows", desc: "Eliminate manual data entry instantly." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex items-start gap-5 group cursor-default">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/15 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white drop-shadow-md">{feature.title}</h4>
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

      {/* RIGHT PANEL - Interactive 3D Login Form */}
      <div 
        className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-background/50 backdrop-blur-3xl"
        style={{ perspective: "1500px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle background glow for right side */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d" 
          }}
          className="w-full max-w-[460px] bg-card border border-border/50 rounded-3xl p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10" style={{ transform: "translateZ(30px)" }}>
             <div className="bg-gradient-to-br from-primary to-primary/60 p-2.5 rounded-xl shadow-lg">
               <Box className="w-6 h-6 text-white" />
             </div>
             <span className="text-2xl font-bold tracking-tight">Enterprise OS</span>
          </div>

          <div className="text-center lg:text-left space-y-3 mb-10" style={{ transform: "translateZ(40px)" }}>
            <h1 className="text-4xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-base">Enter your credentials to access your workspace.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin} style={{ transform: "translateZ(30px)" }}>
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 bg-muted/30 border-border/50 transition-all duration-300 focus-visible:ring-primary/50 focus-visible:bg-background shadow-inner rounded-xl"
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
                  className="h-12 pr-12 bg-muted/30 border-border/50 transition-all duration-300 focus-visible:ring-primary/50 focus-visible:bg-background shadow-inner rounded-xl"
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
              className="w-full h-12 text-base font-semibold shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_15px_25px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none rounded-xl relative overflow-hidden group"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="relative z-10 flex items-center">
                {isLoading ? "Authenticating..." : "Sign In to Workspace"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Button>
          </form>

          <div className="relative py-8" style={{ transform: "translateZ(10px)" }}>
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/60" /></div>
            <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
              <span className="bg-card px-4 text-muted-foreground">Quick Access Demo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" style={{ transform: "translateZ(20px)" }}>
            {demoRoles.map(({ role, email: demoEmail, gradient }) => (
              <button
                key={role}
                onClick={() => { setEmail(demoEmail); setSelectedRole(role) }}
                className={`relative overflow-hidden flex items-center justify-between px-4 py-3 rounded-xl border text-[13px] font-semibold transition-all duration-300 outline-none
                  ${selectedRole === role 
                    ? "border-transparent ring-2 ring-primary ring-offset-2 ring-offset-card shadow-lg scale-[1.02]" 
                    : "border-border/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 bg-muted/20"
                  }
                `}
              >
                {/* Background Gradient for selected state */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 ${selectedRole === role ? 'opacity-100' : 'group-hover:opacity-40'}`} />
                
                <span className={`relative z-10 ${selectedRole === role ? 'text-foreground drop-shadow-sm' : 'text-muted-foreground'}`}>{role}</span>
                {selectedRole === role && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  )
}
