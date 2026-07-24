import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as HotToaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Enterprise ERP System",
  description: "Advanced modular Enterprise ERP System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider>
              <DashboardLayout>
                {children}
              </DashboardLayout>
            </TooltipProvider>
          </AuthProvider>
          <Toaster richColors position="top-right" />
          <HotToaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--card-foreground)',
                border: '1px solid var(--border)',
                borderRadius: '0.875rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)',
              },
              success: {
                iconTheme: { primary: '#22c55e', secondary: 'white' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: 'white' },
              },
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
