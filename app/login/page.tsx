"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to send OTP via WhatsApp
    console.log("Sending OTP to", phoneNumber)
    setOtpSent(true)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would verify the OTP with your backend
    console.log("Verifying OTP", otp)
    // Redirect to dashboard on success
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <Tabs defaultValue="whatsapp" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Login</CardTitle>
                <CardDescription>Login with your WhatsApp number to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp Number</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="phone"
                          placeholder="Enter your WhatsApp number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Send OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        placeholder="Enter the OTP sent to your WhatsApp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Verify OTP
                    </Button>
                    <Button type="button" variant="link" className="w-full" onClick={() => setOtpSent(false)}>
                      Change WhatsApp Number
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Login</CardTitle>
                <CardDescription>Enter your email and password to login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs underline underline-offset-4 hover:text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

