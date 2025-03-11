"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Calendar, FileText, Users, UserCog, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Employees", href: "/admin/employees", icon: UserCog },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Khodiyar Admin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    // Determine if this item is active
                    const isActive =
                      pathname === item.href ||
                      (pathname.startsWith(item.href + "/") && item.href !== "/admin") ||
                      (item.href === "/admin" && pathname === "/admin")

                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.name}
                          className={isActive ? "bg-primary/10 text-primary font-medium" : ""}
                        >
                          <Link href={item.href}>
                            <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Employee Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/admin/reports/upload" || pathname.startsWith("/admin/reports/upload/")}
                      tooltip="Upload Reports"
                      className={
                        pathname === "/admin/reports/upload" || pathname.startsWith("/admin/reports/upload/")
                          ? "bg-primary/10 text-primary font-medium"
                          : ""
                      }
                    >
                      <Link href="/admin/reports/upload">
                        <FileText
                          className={`h-5 w-5 ${pathname === "/admin/reports/upload" || pathname.startsWith("/admin/reports/upload/") ? "text-primary" : ""}`}
                        />
                        <span>Upload Reports</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/admin/referrals" || pathname.startsWith("/admin/referrals/")}
                      tooltip="Manage Referrals"
                      className={
                        pathname === "/admin/referrals" || pathname.startsWith("/admin/referrals/")
                          ? "bg-primary/10 text-primary font-medium"
                          : ""
                      }
                    >
                      <Link href="/admin/referrals">
                        <Users
                          className={`h-5 w-5 ${pathname === "/admin/referrals" || pathname.startsWith("/admin/referrals/") ? "text-primary" : ""}`}
                        />
                        <span>Manage Referrals</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  )
}

