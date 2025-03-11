"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, MoreHorizontal, Plus, Search, CheckCircle, XCircle, Clock3 } from "lucide-react"
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

// Sample data
const appointments = [
  {
    id: "APP001",
    patientName: "Rajesh Patel",
    patientId: "PAT123",
    date: "2023-03-10",
    time: "09:30 AM",
    service: "Complete Blood Count",
    status: "completed",
    phone: "+91 98765 43210",
  },
  {
    id: "APP002",
    patientName: "Priya Sharma",
    patientId: "PAT456",
    date: "2023-03-10",
    time: "10:15 AM",
    service: "Lipid Profile",
    status: "pending",
    phone: "+91 87654 32109",
  },
  {
    id: "APP003",
    patientName: "Amit Singh",
    patientId: "PAT789",
    date: "2023-03-10",
    time: "11:00 AM",
    service: "Liver Function Test",
    status: "cancelled",
    phone: "+91 76543 21098",
  },
  {
    id: "APP004",
    patientName: "Neha Gupta",
    patientId: "PAT234",
    date: "2023-03-10",
    time: "12:30 PM",
    service: "Thyroid Profile",
    status: "completed",
    phone: "+91 65432 10987",
  },
  {
    id: "APP005",
    patientName: "Vikram Desai",
    patientId: "PAT567",
    date: "2023-03-11",
    time: "09:00 AM",
    service: "Glucose Tolerance Test",
    status: "pending",
    phone: "+91 54321 09876",
  },
  {
    id: "APP006",
    patientName: "Meera Joshi",
    patientId: "PAT890",
    date: "2023-03-11",
    time: "10:45 AM",
    service: "Kidney Function Test",
    status: "pending",
    phone: "+91 43210 98765",
  },
  {
    id: "APP007",
    patientName: "Rahul Mehta",
    patientId: "PAT345",
    date: "2023-03-11",
    time: "02:15 PM",
    service: "Hemoglobin Test",
    status: "completed",
    phone: "+91 32109 87654",
  },
  {
    id: "APP008",
    patientName: "Ananya Reddy",
    patientId: "PAT678",
    date: "2023-03-12",
    time: "11:30 AM",
    service: "Vitamin D Test",
    status: "cancelled",
    phone: "+91 21098 76543",
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage and track all patient appointments</p>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>View and manage all scheduled appointments</CardDescription>
              </div>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
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
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No appointments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{appointment.patientName}</span>
                              <span className="text-xs text-muted-foreground">{appointment.patientId}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.service}</TableCell>
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

