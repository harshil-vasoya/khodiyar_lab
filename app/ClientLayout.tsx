"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen">
        {!isAdminPage && <Header />}
        <main className={`flex-1 ${!isAdminPage ? "" : "p-0"}`}>{children}</main>
        {!isAdminPage && <Footer />}
      </div>
    </ThemeProvider>
  )
}

