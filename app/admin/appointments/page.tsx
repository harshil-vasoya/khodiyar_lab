"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Clock3,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Types
interface User {
  _id: string
  name: string
  email: string
  phone: string
}
interface Service {
  _id: string
  name: string
  price: number
  description: string
  duration: number
  department: string
}
interface Employee {
  _id: string
  name: string
  email: string
  role: string
  department: string
}
interface Appointment {
  _id: string
  userId: string
  serviceId: string
  employeeId?: string
  appointmentDate: string
  status: string
  location?: string
  amount: number
  paymentStatus: string
  createdAt: string
  notes?: string
  user?: User
  service?: Service
  employee?: Employee
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 10
  const [newAppointment, setNewAppointment] = useState({
    userId: "",
    serviceId: "",
    employeeId: "",
    appointmentDate: new Date(),
    status: "pending",
    location: "",
    amount: 0,
    paymentStatus: "pending",
    notes: "",
  })

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchAppointments()
    fetchUsers()
    fetchServices()
    fetchEmployees()
  }, [currentPage, statusFilter, dateFilter, activeTab])

  // API calls
  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      let url = `/api/admin/appointments?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`

      // Apply filters
      if (statusFilter !== "all") url += `&status=${statusFilter}`

      if (dateFilter) {
        const formattedDate = format(dateFilter, "yyyy-MM-dd")
        url += `&fromDate=${formattedDate}T00:00:00&toDate=${formattedDate}T23:59:59`
      }

      // Apply tab filters
      if (activeTab === "today") {
        const today = format(new Date(), "yyyy-MM-dd")
        url += `&fromDate=${today}T00:00:00&toDate=${today}T23:59:59`
      } else if (activeTab === "upcoming") {
        const today = format(new Date(), "yyyy-MM-dd")
        url += `&fromDate=${today}T00:00:00`
      } else if (activeTab === "past") {
        const today = format(new Date(), "yyyy-MM-dd")
        url += `&toDate=${today}T00:00:00`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch appointments")

      const data = await response.json()
      setAppointments(data.appointments || data)
      setTotalPages(data.totalPages || Math.ceil(data.length / itemsPerPage))
    } catch (err) {
      console.error("Error fetching appointments:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setAppointments(getMockAppointments())
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error("Error fetching users:", err)
      setUsers(getMockUsers())
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (!response.ok) throw new Error("Failed to fetch services")
      const data = await response.json()
      setServices(data)
    } catch (err) {
      console.error("Error fetching services:", err)
      setServices(getMockServices())
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/admin/employees")
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to fetch employees")
      }
      const data = await response.json()
      setEmployees(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching employees:", err)
      setEmployees(getMockEmployees())
      toast({
        title: "Warning",
        description: "Using mock employee data. Could not fetch employees from server.",
        variant: "destructive",
      })
    }
  }

  // Event handlers
  const handleCreateAppointment = async () => {
    try {
      setIsSubmitting(true)
      const selectedService = services.find((service) => service._id === newAppointment.serviceId)

      const appointmentData = {
        ...newAppointment,
        appointmentDate: newAppointment.appointmentDate.toISOString(),
        amount: selectedService?.price || 0,
      }

      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create appointment")
      }

      await response.json()
      toast({
        title: "Appointment Created",
        description: "The appointment has been successfully created.",
        variant: "default",
      })

      setIsCreateDialogOpen(false)
      fetchAppointments()

      // Reset form
      setNewAppointment({
        userId: "",
        serviceId: "",
        employeeId: "",
        appointmentDate: new Date(),
        status: "pending",
        location: "",
        amount: 0,
        paymentStatus: "pending",
        notes: "",
      })
    } catch (err) {
      console.error("Error creating appointment:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create appointment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update appointment status")

      toast({
        title: "Status Updated",
        description: `Appointment status has been updated to ${status}.`,
        variant: "default",
      })

      fetchAppointments()
    } catch (err) {
      console.error("Error updating appointment status:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return

    try {
      const response = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete appointment")

      toast({
        title: "Appointment Deleted",
        description: "The appointment has been successfully deleted.",
        variant: "default",
      })

      fetchAppointments()
    } catch (err) {
      console.error("Error deleting appointment:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete appointment",
        variant: "destructive",
      })
    }
  }

  const handleServiceChange = (serviceId: string) => {
    const selectedService = services.find((service) => service._id === serviceId)
    setNewAppointment({
      ...newAppointment,
      serviceId,
      amount: selectedService?.price || 0,
    })
  }

  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsViewDialogOpen(true)
  }

  // Utility functions
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    )
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Mock data for fallback
  const getMockAppointments = (): Appointment[] => [
    {
      _id: "APP001",
      userId: "USR001",
      serviceId: "SRV001",
      appointmentDate: "2023-03-10T09:30:00.000Z",
      status: "completed",
      amount: 1200,
      paymentStatus: "paid",
      createdAt: "2023-03-05T10:00:00.000Z",
      user: { _id: "USR001", name: "Rajesh Patel", email: "rajesh@example.com", phone: "+91 98765 43210" },
      service: { _id: "SRV001", name: "Complete Blood Count", price: 1200 } as Service,
    },
    {
      _id: "APP002",
      userId: "USR002",
      serviceId: "SRV002",
      appointmentDate: "2023-03-10T10:15:00.000Z",
      status: "pending",
      amount: 1500,
      paymentStatus: "pending",
      createdAt: "2023-03-06T11:00:00.000Z",
      user: { _id: "USR002", name: "Priya Sharma", email: "priya@example.com", phone: "+91 87654 32109" },
      service: { _id: "SRV002", name: "Lipid Profile", price: 1500 } as Service,
    },
    {
      _id: "APP003",
      userId: "USR003",
      serviceId: "SRV003",
      appointmentDate: "2023-03-10T11:00:00.000Z",
      status: "cancelled",
      amount: 2000,
      paymentStatus: "refunded",
      createdAt: "2023-03-07T09:00:00.000Z",
      user: { _id: "USR003", name: "Amit Singh", email: "amit@example.com", phone: "+91 76543 21098" },
      service: { _id: "SRV003", name: "Liver Function Test", price: 2000 } as Service,
    },
  ]

  const getMockUsers = (): User[] => [
    { _id: "USR001", name: "Rajesh Patel", email: "rajesh@example.com", phone: "+91 98765 43210" },
    { _id: "USR002", name: "Priya Sharma", email: "priya@example.com", phone: "+91 87654 32109" },
    { _id: "USR003", name: "Amit Singh", email: "amit@example.com", phone: "+91 76543 21098" },
  ]

  const getMockServices = (): Service[] => [
    {
      _id: "SRV001",
      name: "Complete Blood Count",
      price: 1200,
      description: "Analysis of blood cells",
      duration: 30,
      department: "Hematology",
    },
    {
      _id: "SRV002",
      name: "Lipid Profile",
      price: 1500,
      description: "Cholesterol and triglycerides test",
      duration: 45,
      department: "Biochemistry",
    },
    {
      _id: "SRV003",
      name: "Liver Function Test",
      price: 2000,
      description: "Liver enzyme analysis",
      duration: 60,
      department: "Biochemistry",
    },
  ]

  const getMockEmployees = (): Employee[] => [
    {
      _id: "EMP001",
      name: "Dr. Suresh Kumar",
      email: "suresh@example.com",
      role: "Pathologist",
      department: "Hematology",
    },
    {
      _id: "EMP002",
      name: "Dr. Meena Gupta",
      email: "meena@example.com",
      role: "Lab Technician",
      department: "Biochemistry",
    },
    {
      _id: "EMP003",
      name: "Dr. Vikram Desai",
      email: "vikram@example.com",
      role: "Microbiologist",
      department: "Microbiology",
    },
  ]

  // Render component
  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>View and manage all scheduled appointments</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Appointment</DialogTitle>
                  <DialogDescription>Fill in the details to schedule a new appointment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="user">Patient</Label>
                      <Select
                        value={newAppointment.userId}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, userId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                              {user.name} ({user.phone})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="service">Service</Label>
                      <Select value={newAppointment.serviceId} onValueChange={handleServiceChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service._id} value={service._id}>
                              {service.name} (₹{service.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="date">Appointment Date</Label>
                      <DatePicker
                        date={newAppointment.appointmentDate}
                        setDate={(date) =>
                          setNewAppointment({ ...newAppointment, appointmentDate: date || new Date() })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="employee">Assigned Employee (Optional)</Label>
                      <Select
                        value={newAppointment.employeeId}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, employeeId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {employees.map((employee) => (
                            <SelectItem key={employee._id} value={employee._id}>
                              {employee.name} ({employee.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Input
                        id="location"
                        value={newAppointment.location}
                        onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                        placeholder="Main Lab, Room 101, etc."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="paymentStatus">Payment Status</Label>
                      <Select
                        value={newAppointment.paymentStatus}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, paymentStatus: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                      placeholder="Any additional information about this appointment"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAppointment} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Appointment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Compact single-row filter section */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="relative col-span-5">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <DatePicker date={dateFilter} setDate={setDateFilter} placeholder="Date" />
              </div>
              <div className="col-span-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => {
                    setStatusFilter("all")
                    setDateFilter(undefined)
                    setActiveTab("all")
                    setCurrentPage(1)
                  }}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appointment ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span>Loading appointments...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No appointments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <TableRow key={appointment._id}>
                        <TableCell className="font-medium">{appointment._id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{appointment.user?.name || "Unknown"}</span>
                            <span className="text-xs text-muted-foreground">
                              {appointment.user?.phone || "No phone"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>
                                {appointment.appointmentDate
                                  ? format(new Date(appointment.appointmentDate), "yyyy-MM-dd")
                                  : "Unknown"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>
                                {appointment.appointmentDate
                                  ? format(new Date(appointment.appointmentDate), "hh:mm a")
                                  : "Unknown"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.service?.name || "Unknown Service"}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => viewAppointmentDetails(appointment)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => router.push(`/admin/appointments/${appointment._id}/edit`)}
                              >
                                Edit Appointment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(appointment._id, "completed")}
                                disabled={appointment.status === "completed"}
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(appointment._id, "pending")}
                                disabled={appointment.status === "pending"}
                              >
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(appointment._id, "cancelled")}
                                disabled={appointment.status === "cancelled"}
                                className="text-red-600"
                              >
                                Cancel Appointment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteAppointment(appointment._id)}
                                className="text-red-600"
                              >
                                Delete Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Appointment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Detailed information about the selected appointment.</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Appointment ID</h3>
                  <p className="font-medium">{selectedAppointment._id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                  <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Patient</h3>
                  <p>{selectedAppointment.user?.name || "Unknown"}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.user?.email || "No email"}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.user?.phone || "No phone"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Service</h3>
                  <p>{selectedAppointment.service?.name || "Unknown Service"}</p>
                  <p className="text-sm text-muted-foreground">₹{selectedAppointment.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Date & Time</h3>
                  <p>
                    {selectedAppointment.appointmentDate
                      ? format(new Date(selectedAppointment.appointmentDate), "PPP")
                      : "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.appointmentDate
                      ? format(new Date(selectedAppointment.appointmentDate), "p")
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Payment Status</h3>
                  <p className="capitalize">{selectedAppointment.paymentStatus}</p>
                </div>
              </div>

              {selectedAppointment.employee && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Assigned Employee</h3>
                  <p>{selectedAppointment.employee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.employee.role}</p>
                </div>
              )}

              {selectedAppointment.location && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                  <p>{selectedAppointment.location}</p>
                </div>
              )}

              {selectedAppointment.notes && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Notes</h3>
                  <p className="text-sm">{selectedAppointment.notes}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Created At</h3>
                <p>{format(new Date(selectedAppointment.createdAt), "PPP p")}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedAppointment && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  router.push(`/admin/appointments/${selectedAppointment._id}/edit`)
                }}
              >
                Edit Appointment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

