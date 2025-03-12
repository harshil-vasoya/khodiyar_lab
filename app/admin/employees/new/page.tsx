"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, UserPlus, Upload } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "react-hot-toast"

export default function NewEmployeePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sendCredentials, setSendCredentials] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    employeeId: "",
    department: "",
    role: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "active",
    gender: "male",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    reportsTo: "",
    permissions: [],
  })

  // Define available permissions
  const availablePermissions = [
    {
      id: "appointments",
      label: "Appointments Management",
      resource: "appointments",
      actions: ["view", "create", "update", "delete"],
    },
    {
      id: "reports",
      label: "Reports Management",
      resource: "reports",
      actions: ["view", "create", "update", "delete"],
    },
    { id: "users", label: "User Management", resource: "users", actions: ["view", "create", "update", "delete"] },
    { id: "employees", label: "Employee Management", resource: "employees", actions: ["view"] },
    { id: "settings", label: "Settings", resource: "settings", actions: ["view", "update"] },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      // Find the permission details
      const permission = availablePermissions.find((p) => p.id === permissionId)
      if (permission) {
        setFormData((prev) => ({
          ...prev,
          permissions: [...prev.permissions, { resource: permission.resource, actions: permission.actions }],
        }))
      }
    } else {
      // Remove the permission
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter(
          (p) => p.resource !== availablePermissions.find((ap) => ap.id === permissionId)?.resource,
        ),
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sendCredentials,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create employee")
      }

      toast.success("Employee created successfully")
      router.push("/admin/employees")
    } catch (error) {
      toast.error(error.message || "Failed to create employee")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/employees">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Employee</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter the employee's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters with one capital letter and one special character.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup
                      defaultValue={formData.gender}
                      className="flex gap-4"
                      onValueChange={(value) => handleRadioChange("gender", value)}
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

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
                <CardDescription>Enter the employee's job details and department information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      name="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                      required
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hematology">Hematology</SelectItem>
                        <SelectItem value="biochemistry">Biochemistry</SelectItem>
                        <SelectItem value="immunoassay">Immunoassay</SelectItem>
                        <SelectItem value="clinical-pathology">Clinical Pathology</SelectItem>
                        <SelectItem value="histopathology">Histopathology</SelectItem>
                        <SelectItem value="microbiology">Microbiology</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pathologist">Pathologist</SelectItem>
                        <SelectItem value="senior-biochemist">Senior Biochemist</SelectItem>
                        <SelectItem value="immunologist">Immunologist</SelectItem>
                        <SelectItem value="clinical-pathologist">Clinical Pathologist</SelectItem>
                        <SelectItem value="histopathologist">Histopathologist</SelectItem>
                        <SelectItem value="microbiologist">Microbiologist</SelectItem>
                        <SelectItem value="lab-technician">Lab Technician</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Employment Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="probation">Probation</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportsTo">Reports To</Label>
                    <Select
                      value={formData.reportsTo}
                      onValueChange={(value) => handleSelectChange("reportsTo", value)}
                    >
                      <SelectTrigger id="reportsTo">
                        <SelectValue placeholder="Select supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-patel">Dr. Rajesh Patel</SelectItem>
                        <SelectItem value="dr-shah">Dr. Meera Shah</SelectItem>
                        <SelectItem value="dr-desai">Dr. Amit Desai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>System Access</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`access-${permission.id}`}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                        />
                        <Label htmlFor={`access-${permission.id}`}>{permission.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Send Login Credentials</Label>
                    <p className="text-sm text-muted-foreground">
                      Send an email with login credentials to the employee
                    </p>
                  </div>
                  <Switch checked={sendCredentials} onCheckedChange={setSendCredentials} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Upload a profile photo for the employee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Recommended: Square image, at least 300x300px
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload employee documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Resume/CV</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <Button variant="outline" size="sm">
                      Upload Resume
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ID Proof</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <Button variant="outline" size="sm">
                      Upload ID Proof
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Certificates</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <Button variant="outline" size="sm">
                      Upload Certificates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" asChild>
            <Link href="/admin/employees">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <UserPlus className="mr-2 h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Employee"}
          </Button>
        </div>
      </form>
    </div>
  )
}

