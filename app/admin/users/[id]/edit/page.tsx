"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface User {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  gender?: string
  dateOfBirth?: string
  status: string
  referralPoints?: number
  notes?: string
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [sendNotification, setSendNotification] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gender: "",
    dateOfBirth: "",
    status: "active",
    referralPoints: 0,
    notes: "",
  })

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/admin/users/${params.id}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || "Failed to fetch user")
        }

        const userData = await response.json()
        setUser(userData)

        // Format date of birth for input field if it exists
        let formattedDateOfBirth = userData.dateOfBirth || ""
        if (formattedDateOfBirth) {
          const date = new Date(formattedDateOfBirth)
          formattedDateOfBirth = date.toISOString().split("T")[0]
        }

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          pincode: userData.pincode || "",
          gender: userData.gender || "",
          dateOfBirth: formattedDateOfBirth,
          status: userData.status || "active",
          referralPoints: userData.referralPoints || 0,
          notes: userData.notes || "",
        })
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch user")

        // Use mock data if API fails
        const mockUser = getMockUser(params.id)
        setUser(mockUser)

        // Format date of birth for input field if it exists
        let formattedDateOfBirth = mockUser.dateOfBirth || ""
        if (formattedDateOfBirth) {
          const date = new Date(formattedDateOfBirth)
          formattedDateOfBirth = date.toISOString().split("T")[0]
        }

        setFormData({
          name: mockUser.name || "",
          email: mockUser.email || "",
          phone: mockUser.phone || "",
          address: mockUser.address || "",
          city: mockUser.city || "",
          state: mockUser.state || "",
          pincode: mockUser.pincode || "",
          gender: mockUser.gender || "",
          dateOfBirth: formattedDateOfBirth,
          status: mockUser.status || "active",
          referralPoints: mockUser.referralPoints || 0,
          notes: mockUser.notes || "",
        })

        toast({
          title: "Warning",
          description: "Using mock data. Could not fetch user from server.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      setError(null)
      setSuccess(false)

      const updateData = {
        ...formData,
        ...(resetPassword && newPassword ? { password: newPassword } : {}),
      }

      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to update user")
      }

      // If send notification is checked, send an email to the user
      if (sendNotification) {
        try {
          await fetch(`/api/admin/users/${params.id}/notify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "account_updated",
              passwordReset: resetPassword,
            }),
          })
        } catch (notifyErr) {
          console.error("Error sending notification:", notifyErr)
          // Don't fail the whole operation if notification fails
        }
      }

      setSuccess(true)
      toast({
        title: "User Updated",
        description: "The user has been successfully updated.",
      })

      // Reset password fields
      setResetPassword(false)
      setNewPassword("")
      setSendNotification(false)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/users")
      }, 2000)
    } catch (err) {
      console.error("Error updating user:", err)
      setError(err instanceof Error ? err.message : "Failed to update user")
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Mock data for fallback
  const getMockUser = (id: string): User => {
    return {
      _id: id,
      name: "Rajesh Patel",
      email: "rajesh.patel@example.com",
      phone: "+91 9876543210",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      gender: "male",
      dateOfBirth: "1985-06-15",
      status: "active",
      referralPoints: 250,
      notes: "Regular patient with good compliance.",
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit User</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            User has been updated successfully. Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update the user's personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Update the user's address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage the user's account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referralPoints">Referral Points</Label>
                  <Input
                    id="referralPoints"
                    name="referralPoints"
                    type="number"
                    min="0"
                    value={formData.referralPoints}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resetPassword"
                    checked={resetPassword}
                    onCheckedChange={(checked) => setResetPassword(checked === true)}
                  />
                  <Label htmlFor="resetPassword">Reset Password</Label>
                </div>
                {resetPassword && (
                  <div className="mt-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="mt-1"
                      required={resetPassword}
                      minLength={8}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long.</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes about this user"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="sendNotification"
                  checked={sendNotification}
                  onCheckedChange={(checked) => setSendNotification(checked === true)}
                />
                <Label htmlFor="sendNotification">Send email notification to user about account changes</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/admin/users")}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

