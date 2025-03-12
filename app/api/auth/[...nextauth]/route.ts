import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyUserCredentials } from "@/lib/services/user-service"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Add role to credentials
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        try {
          console.log(`Authorizing user: ${credentials.email}`)
          const user = await verifyUserCredentials(credentials.email, credentials.password)

          if (!user) {
            console.log(`Authorization failed for user: ${credentials.email}`)
            return null
          }

          // Check if user has the required role
          if (credentials.role && credentials.role !== "user") {
            if (user.role !== credentials.role) {
              console.log(`User ${credentials.email} does not have ${credentials.role} role`)
              throw new Error(`You don't have ${credentials.role} privileges`)
            }
          }

          console.log(`User authorized: ${credentials.email} with role: ${user.role}`)
          return user
        } catch (error) {
          console.error("Auth error:", error)
          // Re-throw the error to be caught by NextAuth
          throw new Error(error instanceof Error ? error.message : "Authentication failed")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Setting JWT token with user data:", user._id)
        token.id = user._id
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        console.log("Setting session with token data:", token.id)
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

