"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  name: string
  href: string
  children?: MenuItem[]
}

const departments = [
  { name: "Hematology", href: "/departments/hematology" },
  { name: "Biochemistry", href: "/departments/biochemistry" },
  { name: "Immunoassay", href: "/departments/immunoassay" },
  { name: "Clinical Pathology", href: "/departments/clinical-pathology" },
  { name: "Histopathology", href: "/departments/histopathology" },
  { name: "Microbiology", href: "/departments/microbiology" },
]

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  {
    name: "Departments",
    href: "#",
    children: departments,
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Departments"])

  const toggleItem = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && path !== "#" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div
      className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col p-6 pt-20 space-y-6 h-full overflow-y-auto">
        <div className="space-y-6">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100 pb-4">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleItem(item.name)}
                    className="flex items-center justify-between w-full text-left text-lg font-medium"
                  >
                    <span className={pathname.includes("/departments") ? "text-primary" : "text-foreground/80"}>
                      {item.name}
                    </span>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {expandedItems.includes(item.name) && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block py-2 text-base ${
                            isActive(child.href) ? "text-primary font-medium" : "text-foreground/80"
                          }`}
                          onClick={onClose}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block text-lg font-medium ${isActive(item.href) ? "text-primary" : "text-foreground/80"}`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 flex flex-col space-y-4">
          <Link href="/login" onClick={onClose}>
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/register" onClick={onClose}>
            <Button className="w-full">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

