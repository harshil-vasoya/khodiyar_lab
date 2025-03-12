import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login?callbackUrl=/employee&role=employee")
  }

  // Check if user has employee role
  if (session.user.role !== "employee") {
    redirect("/login?callbackUrl=/employee&role=employee&error=You%20don't%20have%20employee%20privileges")
  }

  return <>{children}</>
}

