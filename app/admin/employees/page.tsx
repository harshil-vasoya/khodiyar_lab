"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  UserCog,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Lock,
  Award,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const employees = [
  {
    id: "EMP-001",
    name: "Dr. Rajesh Patel",
    email: "dr.rajesh@khodiyarpathology.com",
    phone: "+91 9876543210",
    department: "Hematology",
    role: "Pathologist",
    joinDate: "2020-05-15",
    status: "active",
    reportsUploaded: 145,
    appointmentsHandled: 120,
    performance: "excellent",
  },
  {
    id: "EMP-002",
    name: "Dr. Meera Shah",
    email: "dr.meera@khodiyarpathology.com",
    phone: "+91 9876543211",
    department: "Biochemistry",
    role: "Senior Biochemist",
    joinDate: "2019-08-10",
    status: "active",
    reportsUploaded: 178,
    appointmentsHandled: 145,
    performance: "excellent",
  },
  {
    id: "EMP-003",
    name: "Dr. Amit Desai",
    email: "dr.amit@khodiyarpathology.com",
    phone: "+91 9876543212",
    department: "Immunoassay",
    role: "Immunologist",
    joinDate: "2021-02-20",
    status: "active",
    reportsUploaded: 98,
    appointmentsHandled: 85,
    performance: "good",
  },
  {
    id: "EMP-004",
    name: "Dr. Priya Sharma",
    email: "dr.priya@khodiyarpathology.com",
    phone: "+91 9876543213",
    department: "Clinical Pathology",
    role: "Clinical Pathologist",
    joinDate: "2020-11-05",
    status: "active",
    reportsUploaded: 112,
    appointmentsHandled: 95,
    performance: "good",
  },
  {
    id: "EMP-005",
    name: "Dr. Vikram Mehta",
    email: "dr.vikram@khodiyarpathology.com",
    phone: "+91 9876543214",
    department: "Histopathology",
    role: "Histopathologist",
    joinDate: "2018-07-15",
    status: "inactive",
    reportsUploaded: 210,
    appointmentsHandled: 180,
    performance: "excellent",
  },
  {
    id: "EMP-006",
    name: "Dr. Neha Gupta",
    email: "dr.neha@khodiyarpathology.com",
    phone: "+91 9876543215",
    department: "Microbiology",
    role: "Microbiologist",
    joinDate: "2019-10-12",
    status: "active",
    reportsUploaded: 156,
    appointmentsHandled: 130,
    performance: "excellent",
  },
  {
    id: "EMP-007",
    name: "Sanjay Kumar",
    email: "sanjay@khodiyarpathology.com",
    phone: "+91 9876543216",
    department: "Administration",
    role: "Lab Technician",
    joinDate: "2021-05-20",
    status: "active",
    reportsUploaded: 85,
    appointmentsHandled: 60,
    performance: "good",
  },
  {
    id: "EMP-008",
    name: "Anita Joshi",
    email: "anita@khodiyarpathology.com",
    phone: "+91 9876543217",
    department: "Administration",
    role: "Receptionist",
    joinDate: "2022-01-10",
    status: "active",
    reportsUploaded: 0,
    appointmentsHandled: 210,
    performance: "good",
  },
]

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  // Filter employees based on search query and filters
  const filteredEmployees = employees.filter((employee) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      employee.name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.phone.toLowerCase().includes(searchLower) ||
      employee.id.toLowerCase().includes(searchLower) ||
      employee.role.toLowerCase().includes(searchLower)

    // Status filter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    // Department filter
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    // Role filter
    const matchesRole = roleFilter === "all" || employee.role === roleFilter

    return matchesSearch && matchesStatus && matchesDepartment && matchesRole
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Inactive
          </Badge>
        )
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-blue-500">Excellent</Badge>
      case "good":
        return <Badge className="bg-green-500">Good</Badge>
      case "average":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Average
          </Badge>
        )
      case "poor":
        return <Badge variant="destructive">Poor</Badge>
      default:
        return <Badge variant="secondary">{performance}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage staff accounts and permissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/admin/employees/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, role..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Hematology">Hematology</SelectItem>
                  <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                  <SelectItem value="Immunoassay">Immunoassay</SelectItem>
                  <SelectItem value="Clinical Pathology">Clinical Pathology</SelectItem>
                  <SelectItem value="Histopathology">Histopathology</SelectItem>
                  <SelectItem value="Microbiology">Microbiology</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Pathologist">Pathologist</SelectItem>
                  <SelectItem value="Senior Biochemist">Senior Biochemist</SelectItem>
                  <SelectItem value="Immunologist">Immunologist</SelectItem>
                  <SelectItem value="Clinical Pathologist">Clinical Pathologist</SelectItem>
                  <SelectItem value="Histopathologist">Histopathologist</SelectItem>
                  <SelectItem value="Microbiologist">Microbiologist</SelectItem>
                  <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department & Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <UserCog className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No employees found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{employee.department}</div>
                        <div className="text-sm text-muted-foreground">{employee.role}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{employee.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {new Date(employee.joinDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>{getPerformanceBadge(employee.performance)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">{employee.reportsUploaded}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Employee
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Award className="mr-2 h-4 w-4" />
                            Performance Review
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {employee.status === "inactive" ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-amber-500">
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Employee
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredEmployees.length}</span> of{" "}
            <span className="font-medium">{employees.length}</span> employees
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

