"use client"

import { CheckCircle2 } from "lucide-react"
import { useScrollAnimation } from "@/utils/use-scroll-animation"

const features = [
  "State-of-the-art laboratory equipment",
  "Highly qualified pathologists and technicians",
  "Quick turnaround time for test results",
  "Home sample collection service",
  "Online access to test reports",
  "Affordable pricing with transparent billing",
  "Strict quality control measures",
  "Comfortable and hygienic collection centers",
]

export default function FeaturesSection() {
  useScrollAnimation()

  return (
    <section id="features" className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 animate-fade-right">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Khodiyar Pathology?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are committed to providing accurate, reliable, and timely diagnostic services with a focus on patient
                comfort and convenience.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 animate-fade-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="text-sm">{feature}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center animate-fade-left">
            <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[500px]">
              <img
                src="/placeholder.svg?height=500&width=700"
                alt="Modern Laboratory"
                className="mx-auto h-full w-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

