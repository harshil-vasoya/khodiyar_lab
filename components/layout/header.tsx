"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"

const departments = [
  { name: "Hematology", href: "/departments/hematology" },
  { name: "Biochemistry", href: "/departments/biochemistry" },
  { name: "Immunoassay", href: "/departments/immunoassay" },
  { name: "Clinical Pathology", href: "/departments/clinical-pathology" },
  { name: "Histopathology", href: "/departments/histopathology" },
  { name: "Microbiology", href: "/departments/microbiology" },
]

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Departments"])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleItem = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 z-10">
          <span className="text-xl font-bold text-primary">Khodiyar Pathology</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`text-sm font-medium relative px-1 py-2 transition-colors flex items-center
                ${isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-primary"}
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300
                ${isActive(item.href) ? "after:origin-bottom-left after:scale-x-100" : "hover:after:origin-bottom-left hover:after:scale-x-100"}
              `}
            >
              {item.name}
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex items-center gap-1 px-1 py-2 relative
                ${pathname.includes("/departments") ? "text-primary" : "text-foreground/80 hover:text-primary"}
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300
                ${pathname.includes("/departments") ? "after:origin-bottom-left after:scale-x-100" : "hover:after:origin-bottom-left hover:after:scale-x-100"}
              `}
              >
                Departments <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {departments.map((dept) => (
                <DropdownMenuItem key={dept.name} asChild>
                  <button
                    onClick={() => handleNavigation(dept.href)}
                    className={`w-full flex items-center justify-between ${
                      pathname === dept.href ? "bg-primary/10 text-primary font-medium" : ""
                    }`}
                  >
                    {dept.name}
                  </button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex gap-4">
          <Button variant="outline" className="shadow-sm" onClick={() => handleNavigation("/login")}>
            Login
          </Button>
          <Button className="shadow-sm" onClick={() => handleNavigation("/register")}>
            Register
          </Button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-3 px-4 border-b">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl font-bold text-primary">Khodiyar Pathology</span>
            </Link>
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 p-4">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 py-1.5">
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center justify-between w-full text-left text-base font-medium py-1.5 ${
                    isActive(item.href) ? "text-primary" : "text-gray-800"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive(item.href) && <ChevronRight className="h-4 w-4 text-primary" />}
                </button>
              </div>
            ))}

            <div className="border-b border-gray-100 py-1.5">
              <button
                onClick={() => toggleItem("Departments")}
                className="flex items-center justify-between w-full text-left text-base font-medium py-1.5"
                aria-expanded={expandedItems.includes("Departments")}
              >
                <span className={pathname.includes("/departments") ? "text-primary" : ""}>Departments</span>
                <span className="transition-transform duration-200">
                  {expandedItems.includes("Departments") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItems.includes("Departments") ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 pt-1 pb-1 space-y-0.5 border-l border-gray-100 ml-2 mt-1">
                  {departments.map((dept) => (
                    <button
                      key={dept.name}
                      onClick={() => handleNavigation(dept.href)}
                      className={`flex items-center justify-between w-full text-left py-1.5 text-sm ${
                        pathname === dept.href ? "text-primary font-medium" : "text-gray-600"
                      }`}
                    >
                      <span>{dept.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t mt-auto">
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 py-1.5" onClick={() => handleNavigation("/login")}>
                Login
              </Button>
              <Button className="flex-1 py-1.5" onClick={() => handleNavigation("/register")}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

