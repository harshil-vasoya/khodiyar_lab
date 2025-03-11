"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Beaker, Droplet, Heart, Microscope, Stethoscope, VolumeIcon as Vial } from "lucide-react"
import { useScrollAnimation } from "@/utils/use-scroll-animation"

const services = [
  {
    icon: Beaker,
    title: "Blood Tests",
    description: "Comprehensive blood analysis including CBC, lipid profile, glucose, and more.",
  },
  {
    icon: Microscope,
    title: "Pathology",
    description: "Expert analysis of tissues and cells to diagnose diseases and conditions.",
  },
  {
    icon: Vial,
    title: "Biochemistry",
    description: "Analysis of blood chemistry, hormones, and other biological markers.",
  },
  {
    icon: Droplet,
    title: "Urine Analysis",
    description: "Complete urine examination to detect infections, diseases, and other conditions.",
  },
  {
    icon: Heart,
    title: "Cardiac Markers",
    description: "Tests to evaluate heart function and detect cardiac conditions.",
  },
  {
    icon: Stethoscope,
    title: "Health Packages",
    description: "Comprehensive health check-up packages for preventive care.",
  },
]

export default function ServicesSection() {
  useScrollAnimation()

  return (
    <section id="services" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-up">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of diagnostic services to meet your healthcare needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`transition-all hover:shadow-lg animate-fade-up`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <service.icon className="h-12 w-12 text-primary mb-2" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

