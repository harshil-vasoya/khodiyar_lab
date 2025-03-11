"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, User, Mail } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to send OTP via WhatsApp
    console.log("Sending OTP to", formData.phone)
    setStep(2)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would verify the OTP with your backend
    console.log("Verifying OTP", formData.otp)
    // Redirect to dashboard on success
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to get started with Khodiyar Pathology</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              {step === 1 ? "Enter your details to create an account" : "Verify your WhatsApp number"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your WhatsApp number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="Enter the OTP sent to your WhatsApp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Verify & Register
                </Button>
                <Button type="button" variant="link" className="w-full" onClick={() => setStep(1)}>
                  Change Details
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

