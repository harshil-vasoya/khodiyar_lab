"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Beaker,
  Droplet,
  Heart,
  Microscope,
  Stethoscope,
  VolumeIcon as Vial,
  Dna,
  Brain,
  TreesIcon as Lungs,
  Thermometer,
} from "lucide-react"

const serviceCategories = [
  {
    id: "routine",
    name: "Routine Tests",
    services: [
      {
        icon: Beaker,
        title: "Complete Blood Count (CBC)",
        description: "Measures the levels of red blood cells, white blood cells, and platelets in your blood.",
        price: "₹500",
      },
      {
        icon: Droplet,
        title: "Urinalysis",
        description: "Analyzes the physical, chemical, and microscopic properties of urine.",
        price: "₹400",
      },
      {
        icon: Microscope,
        title: "Blood Glucose",
        description: "Measures the amount of glucose in your blood to screen for diabetes.",
        price: "₹300",
      },
      {
        icon: Vial,
        title: "Lipid Profile",
        description: "Measures cholesterol and triglycerides to assess heart disease risk.",
        price: "₹800",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized Tests",
    services: [
      {
        icon: Heart,
        title: "Cardiac Markers",
        description: "Tests to evaluate heart function and detect cardiac conditions.",
        price: "₹1,500",
      },
      {
        icon: Dna,
        title: "Genetic Testing",
        description: "Analyzes DNA to identify genetic disorders and predispositions.",
        price: "₹5,000",
      },
      {
        icon: Brain,
        title: "Neurological Tests",
        description: "Evaluates nervous system function and detects neurological disorders.",
        price: "₹2,000",
      },
      {
        icon: Thermometer,
        title: "Hormone Panel",
        description: "Measures hormone levels to diagnose endocrine disorders.",
        price: "₹1,800",
      },
    ],
  },
  {
    id: "packages",
    name: "Health Packages",
    services: [
      {
        icon: Stethoscope,
        title: "Basic Health Check-up",
        description: "Comprehensive package including CBC, urinalysis, blood glucose, and lipid profile.",
        price: "₹1,500",
      },
      {
        icon: Heart,
        title: "Cardiac Health Package",
        description: "Complete cardiac evaluation including ECG, cardiac markers, and lipid profile.",
        price: "₹3,000",
      },
      {
        icon: Lungs,
        title: "Executive Health Check-up",
        description: "Comprehensive health assessment including all major organ systems.",
        price: "₹5,000",
      },
      {
        icon: Microscope,
        title: "Women's Health Package",
        description: "Specialized tests for women's health including hormonal analysis.",
        price: "₹2,500",
      },
    ],
  },
]

export default function ServicesPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const handleCardClick = (categoryId: string, serviceIndex: number) => {
    const cardId = `${categoryId}-${serviceIndex}`
    setActiveCard(activeCard === cardId ? null : cardId)
  }

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Services</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive diagnostic services for all your healthcare needs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          {serviceCategories.map((category) => (
            <div key={category.id} className="mb-16 last:mb-0">
              <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="text-3xl font-bold text-center">{category.name}</h2>
                <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {category.services.map((service, index) => {
                  const cardId = `${category.id}-${index}`
                  const isActive = activeCard === cardId

                  return (
                    <Card
                      key={index}
                      className={`transition-all hover:shadow-lg cursor-pointer ${isActive ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleCardClick(category.id, index)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-3">
                              <service.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle>{service.title}</CardTitle>
                              <CardDescription className="mt-1 text-base">{service.description}</CardDescription>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-primary">{service.price}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2 overflow-hidden">
                        <div
                          className={`transition-all duration-300 ease-in-out transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 h-0"}`}
                        >
                          <Link href="/book-appointment">
                            <Button className="w-full">Book Now</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Process</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple, convenient, and reliable diagnostic services
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 lg:gap-12 mt-8">
            {[
              {
                step: "1",
                title: "Book Appointment",
                description: "Schedule an appointment online or by phone.",
              },
              {
                step: "2",
                title: "Sample Collection",
                description: "Visit our lab or opt for home collection service.",
              },
              {
                step: "3",
                title: "Testing & Analysis",
                description: "Our experts analyze your samples with precision.",
              },
              {
                step: "4",
                title: "Get Results",
                description: "Access your reports online or collect them in person.",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-center text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our services
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 mt-8">
            {[
              {
                question: "Do I need to fast before my blood test?",
                answer:
                  "For most blood tests like lipid profile and glucose tests, fasting for 8-12 hours is recommended. However, some tests don't require fasting. Our team will provide specific instructions when you book your appointment.",
              },
              {
                question: "How long does it take to get test results?",
                answer:
                  "Most routine test results are available within 24 hours. Specialized tests may take 2-3 days. You can access your reports online through our patient portal or collect them in person from our laboratory.",
              },
              {
                question: "Do you offer home collection services?",
                answer:
                  "Yes, we offer home collection services for most tests. There is a nominal additional charge for this service. You can schedule a home collection when booking your appointment.",
              },
              {
                question: "Are your laboratories accredited?",
                answer:
                  "Yes, all our laboratories are NABL accredited and follow strict quality control measures to ensure accurate and reliable results.",
              },
              {
                question: "How can I pay for my tests?",
                answer:
                  "We accept cash, credit/debit cards, and online payments. You can also pay through our mobile app or website when booking your appointment.",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-bold">{item.question}</h3>
                <p className="mt-2 text-gray-500">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

