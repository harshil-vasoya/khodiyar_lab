"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/utils/use-scroll-animation"

export default function HeroSection() {
  useScrollAnimation()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 animate-fade-right">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Advanced Diagnostics for Better Health
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Khodiyar Pathology provides accurate, reliable, and timely diagnostic services to help you make informed
                decisions about your health.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-up">
              <Link href="/book-appointment">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center animate-fade-left">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Laboratory Equipment"
                className="relative z-10 mx-auto h-full w-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

