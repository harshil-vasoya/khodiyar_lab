import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Clock,
  FileText,
  FlaskRoundIcon as Flask,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Tablet,
  User,
  Star,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <Badge className="mb-2 inline-block bg-primary/10 text-primary">Trusted Diagnostic Partner</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Advanced <span className="text-primary">Diagnostics</span> for Better Health
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Khodiyar Pathology provides accurate, reliable, and timely diagnostic services with state-of-the-art
                  technology and expert pathologists.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/book-appointment">
                  <Button size="lg" className="w-full sm:w-auto">
                    Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Health Packages
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">NABL Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border bg-white shadow-xl sm:h-[450px] md:h-[500px]">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Modern Laboratory Equipment"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-center text-sm text-gray-500">Years Experience</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-center text-sm text-gray-500">Patients Served</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-center text-sm text-gray-500">Tests Available</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-center text-sm text-gray-500">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <Badge className="mb-2 inline-block bg-primary/10 text-primary">Our Services</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Diagnostic Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl">
              We offer a wide range of diagnostic services to meet your healthcare needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-2 bg-primary"></div>
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Flask className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Blood Tests</CardTitle>
                <CardDescription>
                  Comprehensive blood analysis including CBC, lipid profile, glucose, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Complete Blood Count</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Lipid Profile</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Blood Glucose Tests</span>
                  </li>
                </ul>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-2 bg-primary"></div>
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Microscope className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pathology</CardTitle>
                <CardDescription>
                  Expert analysis of tissues and cells to diagnose diseases and conditions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Histopathology</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Cytopathology</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Immunohistochemistry</span>
                  </li>
                </ul>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-2 bg-primary"></div>
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <HeartPulse className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Health Packages</CardTitle>
                <CardDescription>Comprehensive health check-up packages for preventive care.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic Health Check</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Comprehensive Health Check</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Executive Health Check</span>
                  </li>
                </ul>
                <Link
                  href="/packages"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View packages <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Modern Laboratory Equipment"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Patient Care"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Advanced Technology"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Professional Staff"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
              <Badge className="w-fit bg-primary/10 text-primary">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Advanced Technology with a Human Touch
              </h2>
              <p className="text-gray-500">
                We combine cutting-edge diagnostic technology with compassionate care to provide you with the best
                healthcare experience.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Accurate Results</h3>
                    <p className="text-sm text-gray-500">98% accuracy with rigorous quality control</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quick Turnaround</h3>
                    <p className="text-sm text-gray-500">Most results available within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Pathologists</h3>
                    <p className="text-sm text-gray-500">Highly qualified specialists with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Home Collection</h3>
                    <p className="text-sm text-gray-500">Convenient sample collection at your doorstep</p>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/about">
                  <Button variant="outline">
                    Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages Preview */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <Badge className="mb-2 inline-block bg-primary/10 text-primary">Health Packages</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Health Check-ups
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Preventive health packages designed for early detection and better health management
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="relative overflow-hidden border-2 transition-all hover:shadow-lg">
              <div className="h-2 bg-blue-500"></div>
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <CardTitle>Basic Health Check</CardTitle>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">₹1,499</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹1,999</span>
                </div>
                <CardDescription>Essential health screening for individuals of all ages</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Complete Blood Count</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Blood Sugar - Fasting</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Lipid Profile</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Liver & Kidney Function</span>
                  </div>
                </div>
                <Link href="/packages" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  View details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-primary transition-all hover:shadow-lg">
              <div className="absolute right-0 top-0">
                <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">Popular</div>
              </div>
              <div className="h-2 bg-primary"></div>
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle>Comprehensive Health Check</CardTitle>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">₹3,499</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹4,299</span>
                </div>
                <CardDescription>Thorough health assessment with advanced diagnostics</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">All tests in Basic Health Check</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">HbA1c (Glycated Hemoglobin)</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Thyroid Profile</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Vitamin D, B12 & Folate</span>
                  </div>
                </div>
                <Link href="/packages" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  View details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 transition-all hover:shadow-lg">
              <div className="h-2 bg-purple-500"></div>
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-purple-500" />
                  <CardTitle>Executive Health Check</CardTitle>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">₹5,999</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹7,499</span>
                </div>
                <CardDescription>Premium health assessment with comprehensive diagnostics</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">All tests in Comprehensive Check</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Tumor Markers</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Cardiac Risk Markers</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Hormone & Allergy Profile</span>
                  </div>
                </div>
                <Link href="/packages" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  View details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link href="/packages">
              <Button size="lg">
                View All Health Packages <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <Badge className="mb-2 inline-block bg-primary/10 text-primary">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Patients Say</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
              Don't just take our word for it. Here's what our patients have to say about our services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "I've been using Khodiyar Pathology for all my health check-ups for the past 3 years. Their service is
                prompt, staff is courteous, and reports are accurate. Highly recommended!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  RP
                </div>
                <div>
                  <p className="text-sm font-medium">Rajesh Patel</p>
                  <p className="text-sm text-gray-500">Regular Patient</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "As a doctor, I need reliable diagnostic partners. Khodiyar Pathology has consistently provided accurate
                results that help me make informed decisions about my patients' treatment."
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  AD
                </div>
                <div>
                  <p className="text-sm font-medium">Dr. Amit Desai</p>
                  <p className="text-sm text-gray-500">Referring Physician</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                {Array.from({ length: 1 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "I was nervous about my first blood test, but the staff at Khodiyar Pathology made me feel comfortable.
                The home collection service was convenient, and I received my reports on time."
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  PS
                </div>
                <div>
                  <p className="text-sm font-medium">Priya Sharma</p>
                  <p className="text-sm text-gray-500">First-time Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4 text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Health is Our Priority
              </h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl">
                Book an appointment today and take the first step towards better health. Our team of experts is ready to
                provide you with the best diagnostic services.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/book-appointment">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-primary border-white text-white hover:bg-white/20"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                    <Calendar className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-lg font-medium text-white">Easy Scheduling</h3>
                    <p className="text-sm text-white/80">Book appointments online or via phone</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                    <FileText className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-lg font-medium text-white">Online Reports</h3>
                    <p className="text-sm text-white/80">Access your test results anytime, anywhere</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                    <Stethoscope className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-lg font-medium text-white">Doctor Consultation</h3>
                    <p className="text-sm text-white/80">Free consultation with healthcare experts</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                    <Tablet className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-lg font-medium text-white">Mobile App</h3>
                    <p className="text-sm text-white/80">Manage your health on the go with our app</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

