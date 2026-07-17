import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        
        // Mock Users DB for Real World ERP
        const users: Record<string, { id: string, name: string, email: string, role: string }> = {
          "superadmin@erp.com": { id: "1", name: "Super Admin", email: "superadmin@erp.com", role: "superadmin" },
          "admin@erp.com": { id: "2", name: "Admin", email: "admin@erp.com", role: "admin" },
          "hr@erp.com": { id: "3", name: "HR Manager", email: "hr@erp.com", role: "hr" },
          "accountant@erp.com": { id: "4", name: "Accountant", email: "accountant@erp.com", role: "accountant" },
          "sales@erp.com": { id: "5", name: "Sales Manager", email: "sales@erp.com", role: "sales_manager" },
          "inventory@erp.com": { id: "6", name: "Inventory Manager", email: "inventory@erp.com", role: "inventory_manager" },
          "employee@erp.com": { id: "7", name: "Regular Employee", email: "employee@erp.com", role: "employee" },
        }

        const user = users[credentials.email]
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: "jwt"
  }
}
