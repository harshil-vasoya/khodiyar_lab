"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn, useSession, signOut } from "next-auth/react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Loader2, User, UserCog, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginRole, setLoginRole] = useState<string>(searchParams?.get("role") || "user")

  // Email login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Get and properly decode the callback URL
  const getCallbackUrl = () => {
    const callbackUrl = searchParams?.get("callbackUrl") || getDefaultRedirectForRole(loginRole)
    // Fully decode the URL (handles multiple levels of encoding)
    return decodeURIComponent(callbackUrl)
  }

  // Get default redirect URL based on role
  const getDefaultRedirectForRole = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin"
      case "employee":
        return "/employee"
      default:
        return "/dashboard"
    }
  }

  // Check if user is already authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      const userRole = session.user.role || "user"

      // If trying to access a role-specific page but don't have the right role
      if (loginRole === "admin" && userRole !== "admin") {
        toast.error("You don't have admin privileges")
        signOut({ callbackUrl: "/" })
        return
      }

      if (loginRole === "employee" && userRole !== "employee") {
        toast.error("You don't have employee privileges")
        signOut({ callbackUrl: "/" })
        return
      }

      const callbackUrl = getCallbackUrl()
      console.log("User is authenticated, redirecting to:", callbackUrl)
      router.push(callbackUrl)
    }
  }, [session, status, router, searchParams, loginRole])

  // Update login role when the role search param changes
  useEffect(() => {
    const role = searchParams?.get("role")
    if (role) {
      setLoginRole(role)
    }
  }, [searchParams])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would call an API to send OTP via WhatsApp
      console.log("Sending OTP to", phoneNumber)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setOtpSent(true)
      toast.success(`A verification code has been sent to ${phoneNumber}`)
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would verify the OTP with your backend
      console.log("Verifying OTP", otp)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard on success
      const callbackUrl = getCallbackUrl()
      router.push(callbackUrl)
      toast.success("You have been logged in successfully.")
    } catch (error) {
      toast.error("Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      // Get and decode the callback URL
      const callbackUrl = getCallbackUrl()
      console.log("Attempting login with:", { email, callbackUrl, role: loginRole })

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
        role: loginRole, // Pass the role to the credentials provider
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        // Check if the error is related to invalid credentials
        if (result.error.includes("credentials") || result.error.includes("password")) {
          toast.error("Incorrect password", {
            style: {
              border: "1px solid #ff4b4b",
              padding: "16px",
              color: "#ff4b4b",
            },
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "#FFFAEE",
            },
          })
          setLoginError("Incorrect password")
        } else if (result.error.includes("role") || result.error.includes("permission")) {
          toast.error(`You don't have ${loginRole} privileges`, {
            style: {
              border: "1px solid #ff4b4b",
              padding: "16px",
              color: "#ff4b4b",
            },
          })
          setLoginError(`You don't have ${loginRole} privileges`)
        } else {
          setLoginError(result.error)
          toast.error(`Login error: ${result.error}`)
        }
        return
      }

      if (result?.ok) {
        // Successful login
        toast.success("You have been logged in successfully.")

        // Navigate to the callback URL or dashboard
        console.log("Login successful, redirecting to:", callbackUrl)
        router.push(callbackUrl)
      } else {
        // This shouldn't happen if result.ok is true and there's no error
        // But just in case, show a generic error
        setLoginError("Login failed for unknown reason")
        toast.error("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoginError(error instanceof Error ? error.message : "Unknown error")
      toast.error(`Login failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // If still loading the session, show a loading state
  if (status === "loading") {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    )
  }

  // Get the title and description based on the login role
  const getRoleSpecificContent = () => {
    switch (loginRole) {
      case "admin":
        return {
          title: "Admin Login",
          description: "Sign in to access the admin dashboard",
          icon: <ShieldCheck className="h-6 w-6 text-primary" />,
        }
      case "employee":
        return {
          title: "Employee Login",
          description: "Sign in to access the employee portal",
          icon: <UserCog className="h-6 w-6 text-primary" />,
        }
      default:
        return {
          title: "Welcome back",
          description: "Sign in to your account to continue",
          icon: <User className="h-6 w-6 text-primary" />,
        }
    }
  }

  const { title, description, icon } = getRoleSpecificContent()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          {icon}
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Role selector */}
        <div className="flex justify-center space-x-2">
          <Button
            variant={loginRole === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => setLoginRole("user")}
            className="flex items-center gap-1"
          >
            <User className="h-4 w-4" />
            <span>User</span>
          </Button>
          <Button
            variant={loginRole === "employee" ? "default" : "outline"}
            size="sm"
            onClick={() => setLoginRole("employee")}
            className="flex items-center gap-1"
          >
            <UserCog className="h-4 w-4" />
            <span>Employee</span>
          </Button>
          <Button
            variant={loginRole === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => setLoginRole("admin")}
            className="flex items-center gap-1"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin</span>
          </Button>
        </div>

        {/* Show any error from URL parameters */}
        {searchParams?.get("error") && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {searchParams.get("error") === "CredentialsSignin"
              ? "Invalid email or password"
              : searchParams.get("error")}
          </div>
        )}

        {/* Show login error from state */}
        {loginError && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{loginError}</div>}

        <Tabs defaultValue="email" className="w-full">
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send OTP"
                      )}
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="w-full"
                      onClick={() => setOtpSent(false)}
                      disabled={isLoading}
                    >
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
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs underline underline-offset-4 hover:text-primary">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
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

