import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Heart, Shield, Star, Users } from "lucide-react"

export default function PackagesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Health Packages for Every Need</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Comprehensive health checkups designed by experts to keep you and your family healthy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#packages">View Packages</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages Section */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Health Packages</h2>
            <p className="text-muted-foreground">
              Choose from our range of comprehensive health packages designed for different age groups and health needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Health Package */}
            <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Basic Health Package</CardTitle>
                    <CardDescription>Essential health screening</CardDescription>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Popular</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-3xl font-bold">₹1,499</p>
                  <p className="text-muted-foreground">
                    <s>₹1,999</s> (25% off)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Includes:</h4>
                  <ul className="space-y-1">
                    {[
                      "Complete Blood Count (CBC)",
                      "Liver Function Test",
                      "Kidney Function Test",
                      "Blood Sugar (Fasting)",
                      "Lipid Profile",
                      "Urine Routine",
                      "Thyroid Profile (TSH)",
                      "Doctor Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Comprehensive Health Package */}
            <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Comprehensive Package</CardTitle>
                    <CardDescription>Complete health assessment</CardDescription>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-3xl font-bold">₹2,999</p>
                  <p className="text-muted-foreground">
                    <s>₹3,999</s> (25% off)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Includes:</h4>
                  <ul className="space-y-1">
                    {[
                      "All tests in Basic Package",
                      "HbA1c (Diabetes)",
                      "Vitamin B12 & D3",
                      "Thyroid Profile (Complete)",
                      "Chest X-Ray",
                      "ECG",
                      "Ultrasound Abdomen",
                      "Detailed Doctor Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Health Package */}
            <Card className="border-t-4 border-t-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Premium Package</CardTitle>
                    <CardDescription>Executive health screening</CardDescription>
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Complete
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-3xl font-bold">₹4,999</p>
                  <p className="text-muted-foreground">
                    <s>₹6,999</s> (28% off)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Includes:</h4>
                  <ul className="space-y-1">
                    {[
                      "All tests in Comprehensive Package",
                      "Tumor Markers",
                      "Hormonal Assay",
                      "Bone Density Scan",
                      "Stress Test (TMT)",
                      "Pulmonary Function Test",
                      "Nutritionist Consultation",
                      "Follow-up Doctor Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialized Packages */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Specialized Health Packages</h2>
            <p className="text-muted-foreground">
              Targeted health checkups for specific health concerns and conditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cardiac Health Package */}
            <Card className="border-t-4 border-t-red-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle>Cardiac Health Package</CardTitle>
                </div>
                <CardDescription>Comprehensive heart health assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-2xl font-bold">₹3,499</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Tests:</h4>
                  <ul className="space-y-1">
                    {[
                      "Lipid Profile",
                      "ECG",
                      "2D Echocardiogram",
                      "Stress Test (TMT)",
                      "Homocysteine",
                      "hs-CRP",
                      "Cardiologist Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Diabetes Care Package */}
            <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <CardTitle>Diabetes Care Package</CardTitle>
                </div>
                <CardDescription>Complete diabetes screening and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-2xl font-bold">₹2,999</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Tests:</h4>
                  <ul className="space-y-1">
                    {[
                      "Fasting & PP Blood Sugar",
                      "HbA1c",
                      "Insulin Levels",
                      "Kidney Function Test",
                      "Microalbuminuria",
                      "Fundus Examination",
                      "Diabetologist Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Women's Health Package */}
            <Card className="border-t-4 border-t-pink-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-pink-500" />
                  <CardTitle>Women's Health Package</CardTitle>
                </div>
                <CardDescription>Comprehensive women's wellness screening</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-2xl font-bold">₹3,299</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Tests:</h4>
                  <ul className="space-y-1">
                    {[
                      "Complete Blood Count",
                      "Thyroid Profile",
                      "Vitamin D & B12",
                      "Pap Smear",
                      "Mammography",
                      "Pelvic Ultrasound",
                      "Gynecologist Consultation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/book-appointment">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Corporate Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Corporate Health Packages</h2>
            <p className="text-muted-foreground">
              Customized health packages for organizations to ensure employee wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Corporate Health Program</CardTitle>
                </div>
                <CardDescription>Comprehensive employee wellness solution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Program Features:</h4>
                    <ul className="space-y-1">
                      {[
                        "Customized health packages based on employee demographics",
                        "On-site sample collection at your office",
                        "Digital reports with secure access",
                        "Health education sessions and webinars",
                        "Dedicated account manager",
                        "Detailed analytics and insights",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {[
                        "Reduced healthcare costs",
                        "Decreased absenteeism",
                        "Improved employee productivity",
                        "Enhanced employee satisfaction",
                        "Customized pricing based on headcount",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Star className="h-5 w-5 text-yellow-500 mr-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/contact">Contact for Custom Quote</Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-primary/10 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Why Choose Our Corporate Health Program?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Trusted Expertise</h4>
                    <p className="text-muted-foreground">
                      Our team of healthcare professionals ensures accurate diagnostics and reliable results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Time-Efficient</h4>
                    <p className="text-muted-foreground">
                      Minimize downtime with our efficient on-site collection and quick turnaround times.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Customizable Solutions</h4>
                    <p className="text-muted-foreground">
                      Tailor health packages to match your organization's specific needs and budget.
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Request a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about our health packages</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I prepare for my health checkup?",
                answer:
                  "For most packages, you'll need to fast for 8-12 hours before the appointment. Drink plenty of water and avoid alcohol for 24 hours before the test. Specific instructions will be provided when you book your appointment.",
              },
              {
                question: "How long does the health checkup take?",
                answer:
                  "Basic packages typically take 1-2 hours, while comprehensive and premium packages may take 3-4 hours. The exact duration depends on the specific tests included in your package.",
              },
              {
                question: "When will I receive my test results?",
                answer:
                  "Most test results are available within 24-48 hours. You'll receive a notification when your reports are ready, and you can access them through our secure patient portal or mobile app.",
              },
              {
                question: "Can I customize my health package?",
                answer:
                  "Yes, we offer customization options for all our health packages. You can add or remove specific tests based on your requirements. Contact our customer service team for assistance with customization.",
              },
              {
                question: "Do you offer home sample collection?",
                answer:
                  "Yes, we offer home sample collection services for most of our health packages at an additional nominal fee. You can schedule a home visit while booking your appointment.",
              },
            ].map((faq, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Take the First Step Towards Better Health</h2>
            <p className="text-lg mb-8">Invest in your health today with our comprehensive health packages</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/book-appointment">Book a Health Package</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact for More Information</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

