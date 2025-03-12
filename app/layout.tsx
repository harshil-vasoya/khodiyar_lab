import type React from "react"
import { AuthProvider } from "../providers/auth-provider"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { ToastProvider } from "../providers/toast-provider"


export const metadata = {
  title: "Khodiyar Pathology",
  description: "Advanced diagnostics for better health",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>{children}
          <ToastProvider />
          </ClientLayout>
          </AuthProvider>
      </body>
    </html>
  )
}

