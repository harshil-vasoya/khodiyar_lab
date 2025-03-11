"use client"

import { useState } from "react"
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

export default function NewEmployeePage() {
  const [sendCredentials, setSendCredentials] = useState(true)

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
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup defaultValue="male" className="flex gap-4">
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
                  <Input id="dob" type="date" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Enter state" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="Enter pincode" />
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
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input id="employee-id" placeholder="Enter employee ID" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="join-date">Join Date</Label>
                  <Input id="join-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
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
                  <Select>
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
                  <Select defaultValue="active">
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
                  <Label htmlFor="reports-to">Reports To</Label>
                  <Select>
                    <SelectTrigger id="reports-to">
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-appointments" />
                    <Label htmlFor="access-appointments">Appointments Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-reports" />
                    <Label htmlFor="access-reports">Reports Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-users" />
                    <Label htmlFor="access-users">User Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-employees" />
                    <Label htmlFor="access-employees">Employee Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-settings" />
                    <Label htmlFor="access-settings">Settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="access-admin" />
                    <Label htmlFor="access-admin">Admin Access</Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Send Login Credentials</Label>
                  <p className="text-sm text-muted-foreground">Send an email with login credentials to the employee</p>
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

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/admin/employees">Cancel</Link>
        </Button>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Employee
        </Button>
      </div>
    </div>
  )
}

