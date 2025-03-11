import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Contact Us</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're here to help. Get in touch with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Have questions or need assistance? Contact us today and our team will be happy to help.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-500">+91 9876543210</p>
                    <p className="text-gray-500">+91 9876543211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-500">info@khodiyarpathology.com</p>
                    <p className="text-gray-500">support@khodiyarpathology.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-gray-500">123 Main Street, Ahmedabad, Gujarat, India</p>
                    <p className="text-gray-500">456 Park Avenue, Surat, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Working Hours</h3>
                    <p className="text-gray-500">Monday - Saturday: 7:00 AM - 9:00 PM</p>
                    <p className="text-gray-500">Sunday: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Send us a message</h3>
                <p className="text-sm text-gray-500">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="message"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Locations</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Visit us at any of our convenient locations
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                name: "Ahmedabad Main Center",
                address: "123 Main Street, Ahmedabad, Gujarat, India",
                phone: "+91 9876543210",
                hours: "7:00 AM - 9:00 PM",
              },
              {
                name: "Surat Branch",
                address: "456 Park Avenue, Surat, Gujarat, India",
                phone: "+91 9876543211",
                hours: "7:00 AM - 9:00 PM",
              },
              {
                name: "Vadodara Branch",
                address: "789 Oak Road, Vadodara, Gujarat, India",
                phone: "+91 9876543212",
                hours: "7:00 AM - 9:00 PM",
              },
            ].map((location, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{location.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{location.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{location.hours}</p>
                  </div>
                </CardContent>
              </Card>
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
                Find answers to common questions about contacting us
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 mt-8">
            {[
              {
                question: "How can I book an appointment?",
                answer:
                  "You can book an appointment online through our website, by calling our customer service number, or by visiting any of our centers in person.",
              },
              {
                question: "What are your working hours?",
                answer:
                  "Our centers are open from 7:00 AM to 9:00 PM Monday through Saturday, and from 8:00 AM to 2:00 PM on Sundays.",
              },
              {
                question: "How can I get my test results?",
                answer:
                  "You can access your test results online through our patient portal, or you can collect them in person from the center where you had your tests done.",
              },
              {
                question: "Do you offer home collection services?",
                answer:
                  "Yes, we offer home collection services for most tests. There is a nominal additional charge for this service.",
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

