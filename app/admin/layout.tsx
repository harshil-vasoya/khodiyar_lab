import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdminLayoutClient from "./admin-layout-client"

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session) {
    redirect("/login?callbackUrl=/admin")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>
}

