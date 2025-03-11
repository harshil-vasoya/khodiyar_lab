import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DepartmentLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  image: string
}

export default function DepartmentLayout({ children, title, description, image }: DepartmentLayoutProps) {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-fade-right">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">{description}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/book-appointment">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center animate-fade-left">
              <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="relative z-10 mx-auto h-full w-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}
    </>
  )
}

