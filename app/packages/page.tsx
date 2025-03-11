import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Award, Clock, Shield, Heart, Activity } from "lucide-react"

export const metadata = {
  title: "Health Packages | Khodiyar Pathology",
  description: "Comprehensive health check-up packages for preventive care and early detection of health issues.",
}

const packages = [
  {
    id: "basic",
    name: "Basic Health Check",
    price: "₹1,499",
    originalPrice: "₹1,999",
    description: "Essential health screening for individuals of all ages",
    popular: false,
    tests: [
      "Complete Blood Count (CBC)",
      "Blood Sugar - Fasting",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine Routine Examination",
      "Chest X-Ray (if required)",
      "ECG (if required)",
    ],
    benefits: ["Free doctor consultation", "Same day reports", "Home sample collection"],
    recommended: "Recommended for adults aged 18-40 years for routine health monitoring",
    color: "bg-blue-50",
    icon: Clock,
  },
  {
    id: "comprehensive",
    name: "Comprehensive Health Check",
    price: "₹3,499",
    originalPrice: "₹4,299",
    description: "Thorough health assessment with advanced diagnostics",
    popular: true,
    tests: [
      "All tests in Basic Health Check",
      "HbA1c (Glycated Hemoglobin)",
      "Thyroid Profile (T3, T4, TSH)",
      "Vitamin D, B12 & Folate",
      "Iron Studies",
      "Calcium & Phosphorus",
      "Uric Acid",
      "Hepatitis B & C Screening",
      "Ultrasound Abdomen",
    ],
    benefits: [
      "Free specialist consultation",
      "Diet consultation",
      "Digital reports with interpretation",
      "Home sample collection",
    ],
    recommended: "Ideal for adults aged 40+ or those with family history of chronic diseases",
    color: "bg-emerald-50",
    icon: Award,
  },
  {
    id: "executive",
    name: "Executive Health Check",
    price: "₹5,999",
    originalPrice: "₹7,499",
    description: "Premium health assessment with comprehensive diagnostics",
    popular: false,
    tests: [
      "All tests in Comprehensive Health Check",
      "Tumor Markers (PSA for men, CA-125 for women)",
      "Cardiac Risk Markers",
      "Allergy Profile",
      "Hormone Profile",
      "Vitamin & Mineral Profile",
      "Heavy Metal Screening",
      "2D Echo",
      "Stress Test",
      "Bone Density Scan",
    ],
    benefits: [
      "Priority appointment with specialists",
      "Personalized health report",
      "Follow-up consultation",
      "Annual health planning",
      "Premium lounge access",
      "Home sample collection",
    ],
    recommended: "Perfect for executives and seniors who require thorough health monitoring",
    color: "bg-purple-50",
    icon: Shield,
  },
]

const specializedPackages = [
  {
    id: "cardiac",
    name: "Cardiac Health Package",
    price: "₹4,299",
    description: "Comprehensive assessment of heart health",
    tests: [
      "Lipid Profile",
      "ECG",
      "2D Echocardiography",
      "Stress Test",
      "Homocysteine",
      "hs-CRP",
      "Apolipoprotein A & B",
      "BNP",
      "Cardiac Risk Assessment",
    ],
    icon: Heart,
    color: "bg-red-50",
  },
  {
    id: "diabetes",
    name: "Diabetes Care Package",
    price: "₹2,999",
    description: "Complete diabetes screening and monitoring",
    tests: [
      "Fasting & Post Prandial Blood Sugar",
      "HbA1c",
      "Insulin Levels",
      "C-Peptide",
      "Kidney Function Test",
      "Microalbuminuria",
      "Lipid Profile",
      "Fundus Examination",
      "Diabetic Neuropathy Assessment",
    ],
    icon: Activity,
    color: "bg-amber-50",
  },
]

export default function PackagesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Health Packages
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Comprehensive health check-up packages designed for early detection and prevention of diseases.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <p className="text-sm text-gray-500">
                All packages include free home sample collection and doctor consultation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden border-2 transition-all hover:shadow-lg ${
                  pkg.popular ? "border-primary" : "border-border"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">Most Popular</div>
                  </div>
                )}
                <CardHeader className={`${pkg.color} pb-8`}>
                  <div className="mb-2 flex items-center space-x-2">
                    <pkg.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{pkg.name}</CardTitle>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Included Tests</h3>
                      <ul className="space-y-2">
                        {pkg.tests.map((test, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-sm">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Benefits</h3>
                      <ul className="space-y-2">
                        {pkg.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-md bg-gray-50 p-3">
                      <p className="text-xs text-gray-600">{pkg.recommended}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4">
                  <Link href="/book-appointment" className="w-full">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Packages */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Specialized Health Packages</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
              Targeted health packages designed for specific health concerns and conditions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {specializedPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className={`${pkg.color} pb-6`}>
                  <div className="mb-2 flex items-center space-x-2">
                    <pkg.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{pkg.name}</CardTitle>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">{pkg.price}</span>
                  </div>
                  <CardDescription className="mt-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Included Tests</h3>
                    <ul className="space-y-2">
                      {pkg.tests.map((test, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4">
                  <Link href="/book-appointment" className="w-full">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Packages */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary">
                  For Organizations
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Corporate Health Packages</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                  Customized health check-up packages for your employees with special corporate rates
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>Customized packages based on employee demographics</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>On-site sample collection at your office</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>Bulk discounts for organizations</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>Health awareness sessions for employees</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>Detailed analytics and health insights for HR</span>
                </li>
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Contact for Corporate Rates
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[500px]">
                <img
                  src="/placeholder.svg?height=500&width=700"
                  alt="Corporate Health Packages"
                  className="mx-auto h-full w-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px] space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="text-gray-500 md:text-xl">Find answers to common questions about our health packages</p>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How do I prepare for my health check-up?</h3>
                <p className="text-gray-500">
                  Most health packages require 8-12 hours of fasting before the test. You should avoid alcohol for 24
                  hours and heavy meals the night before. Our team will provide you with specific instructions when you
                  book your appointment.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How long does it take to get the results?</h3>
                <p className="text-gray-500">
                  Basic test results are available within 24 hours. Comprehensive and specialized packages may take
                  48-72 hours. You can access your reports online through our patient portal or mobile app.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I customize my health package?</h3>
                <p className="text-gray-500">
                  Yes, we offer customization options for all our health packages. You can add or remove specific tests
                  based on your requirements. Please contact our customer service for personalized packages.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Is home sample collection available for all packages?</h3>
                <p className="text-gray-500">
                  Yes, we offer free home sample collection for all our health packages within city limits. For
                  locations outside the city, a nominal fee may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Take charge of your health today
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Prevention is better than cure. Book your health check-up now and stay ahead of potential health issues.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/book-appointment">
                <Button
                  size="lg"
                  className="w-full min-[400px]:w-auto bg-white text-primary hover:bg-white/90"
                  variant="outline"
                >
                  Book an Appointment
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

