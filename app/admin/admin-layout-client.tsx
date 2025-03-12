"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  UserCog,
  Settings,
  Gift,
  LogOut,
  Menu,
  ChevronDown,
  Activity,
  Database,
  ClipboardList,
  Home,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdminLayoutProps {
  children: ReactNode
  session: any
}

export default function AdminLayoutClient({ children, session }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Appointments", href: "/admin/appointments", icon: <Calendar className="h-5 w-5" /> },
    { name: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
    { name: "Services", href: "/admin/services", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { name: "Employees", href: "/admin/employees", icon: <UserCog className="h-5 w-5" /> },
    { name: "Referrals", href: "/admin/referrals", icon: <Gift className="h-5 w-5" /> },
    { name: "Analytics", href: "/admin/analytics", icon: <Activity className="h-5 w-5" /> },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: <Database className="h-5 w-5" /> },
    { name: "Batch Operations", href: "/admin/batch-operations", icon: <ClipboardList className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  const isActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") {
      return true
    }
    if (href !== "/admin" && pathname.startsWith(href)) {
      return true
    }
    return false
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-background border-b h-16">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 flex flex-col h-full overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="border-b p-4">
                    <Link href="/admin" className="flex items-center gap-2">
                      <span className="font-bold text-xl">Khodiyar Admin</span>
                    </Link>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 mx-2 px-3 py-2 my-1 rounded-md transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t p-4 mt-auto">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <Home className="h-5 w-5" />
                        <span>Back to Website</span>
                      </Link>
                      <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="mr-2 h-5 w-5" />
                        <span>Log out</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-bold text-xl">Khodiyar Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>{session.user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Back to Website</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Area with Fixed Sidebar */}
      <div className="flex pt-16 min-h-screen">
        {/* Fixed Sidebar - Hidden on Mobile */}
        <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-64 border-r bg-background z-20 overflow-hidden">
          <div className="flex flex-col h-full">
            <nav className="flex-1 overflow-y-auto py-4 px-2">
              <TooltipProvider>
                {navItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 my-1 rounded-md transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </nav>
            <div className="border-t p-4 mt-auto">
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Website</span>
                </Link>
                <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Offset on Desktop */}
        <main className="w-full md:pl-64 min-h-[calc(100vh-4rem)]">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

