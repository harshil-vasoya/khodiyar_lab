"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, User, Mail, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear password error when user types
    if (name === "password") {
      setPasswordError("")
    }
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter"
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return "Password must contain at least one special character"
    }
    return ""
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    const passwordValidationError = validatePassword(formData.password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      return
    }

    setIsLoading(true)

    try {
      // Check if email already exists
      const emailCheckResponse = await fetch(`/api/users/check-email?email=${formData.email}`)
      const emailCheckData = await emailCheckResponse.json()

      if (emailCheckData.exists) {
        toast({
          title: "Email already registered",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        })
        return
      }

      // In a real app, you would call an API to send OTP via WhatsApp
      console.log("Sending OTP to", formData.phone)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep(2)
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${formData.phone}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would verify the OTP with your backend
      console.log("Verifying OTP", formData.otp)

      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Register the user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to register")
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully. Please login.",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {passwordError && (
                    <div className="flex items-center text-sm text-destructive mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {passwordError}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters with one capital letter and one special character.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Register"
                  )}
                </Button>
                <Button type="button" variant="link" className="w-full" onClick={() => setStep(1)} disabled={isLoading}>
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

