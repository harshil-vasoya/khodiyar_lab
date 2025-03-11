"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

const testCategories = [
  {
    id: "blood",
    name: "Blood Tests",
    tests: [
      { id: "cbc", name: "Complete Blood Count", price: 500 },
      { id: "lipid", name: "Lipid Profile", price: 800 },
      { id: "thyroid", name: "Thyroid Function Test", price: 1200 },
      { id: "glucose", name: "Blood Glucose", price: 300 },
    ],
  },
  {
    id: "urine",
    name: "Urine Tests",
    tests: [
      { id: "urinalysis", name: "Urinalysis", price: 400 },
      { id: "microalbumin", name: "Microalbumin", price: 600 },
    ],
  },
  {
    id: "imaging",
    name: "Imaging",
    tests: [
      { id: "xray", name: "X-Ray", price: 1000 },
      { id: "ultrasound", name: "Ultrasound", price: 1500 },
    ],
  },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
]

export default function BookAppointment() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTest, setSelectedTest] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState("")
  const [location, setLocation] = useState("lab")

  const handleContinue = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the appointment data to your backend
    console.log({
      test: selectedTest,
      date,
      timeSlot,
      location,
    })
    // Redirect to confirmation page
  }

  const selectedTestDetails = testCategories.flatMap((cat) => cat.tests).find((test) => test.id === selectedTest)

  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`flex-1 text-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div className="mx-auto w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              1
            </div>
            <p className="text-sm">Select Test</p>
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`mx-auto w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} flex items-center justify-center mb-2`}
            >
              2
            </div>
            <p className="text-sm">Schedule</p>
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`mx-auto w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} flex items-center justify-center mb-2`}
            >
              3
            </div>
            <p className="text-sm">Confirm</p>
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Test</CardTitle>
            <CardDescription>Choose the test you want to book</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Test Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {testCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div className="space-y-2">
                  <Label htmlFor="test">Select Test</Label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a test" />
                    </SelectTrigger>
                    <SelectContent>
                      {testCategories
                        .find((cat) => cat.id === selectedCategory)
                        ?.tests.map((test) => (
                          <SelectItem key={test.id} value={test.id}>
                            {test.name} - ₹{test.price}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleContinue} disabled={!selectedTest} className="w-full">
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Appointment</CardTitle>
            <CardDescription>Select your preferred date and time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today || date.getDay() === 0
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {date && (
                <div className="space-y-2">
                  <Label>Select Time Slot</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={timeSlot === slot ? "default" : "outline"}
                        className="text-sm"
                        onClick={() => setTimeSlot(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Location</Label>
                <RadioGroup value={location} onValueChange={setLocation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lab" id="lab" />
                    <Label htmlFor="lab">Visit Laboratory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home">Home Collection (+ ₹100)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleContinue} disabled={!date || !timeSlot}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Appointment</CardTitle>
            <CardDescription>Review your appointment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Test Details</h3>
                <p className="text-muted-foreground">{selectedTestDetails?.name}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p className="text-muted-foreground">
                  {date ? format(date, "PPP") : ""} at {timeSlot}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">
                  {location === "lab" ? "Khodiyar Pathology Laboratory" : "Home Collection"}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Price Breakdown</h3>
                <div className="flex justify-between">
                  <span>Test Fee</span>
                  <span>₹{selectedTestDetails?.price}</span>
                </div>
                {location === "home" && (
                  <div className="flex justify-between">
                    <span>Home Collection Fee</span>
                    <span>₹100</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{(selectedTestDetails?.price || 0) + (location === "home" ? 100 : 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Confirm Booking</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

