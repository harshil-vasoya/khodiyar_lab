"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/components/ui/use-toast"
import { parseISO } from "date-fns"

interface AppointmentEditPageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AppointmentEditPage({ params }: AppointmentEditPageProps) {
  const appointmentId = params.id

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [appointment, setAppointment] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch appointment details
        const appointmentResponse = await fetch(`/api/admin/appointments/${appointmentId}`)
        if (!appointmentResponse.ok) {
          throw new Error("Failed to fetch appointment details")
        }
        const appointmentData = await appointmentResponse.json()

        // Convert date string to Date object
        if (appointmentData.appointmentDate) {
          appointmentData.appointmentDate = parseISO(appointmentData.appointmentDate)
        }

        setAppointment(appointmentData)

        // Fetch users, services, and employees
        const [usersResponse, servicesResponse, employeesResponse] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/services"),
          fetch("/api/admin/employees"),
        ])

        if (!usersResponse.ok || !servicesResponse.ok || !employeesResponse.ok) {
          throw new Error("Failed to fetch reference data")
        }

        const [usersData, servicesData, employeesData] = await Promise.all([
          usersResponse.json(),
          servicesResponse.json(),
          employeesResponse.json(),
        ])

        setUsers(usersData)
        setServices(servicesData)
        setEmployees(employeesData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [appointmentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      // Find the selected service to get its price if service was changed
      if (appointment.serviceId) {
        const selectedService = services.find((service) => service._id === appointment.serviceId)
        if (selectedService && selectedService.price !== appointment.amount) {
          appointment.amount = selectedService.price
        }
      }

      // Convert Date object back to ISO string
      const appointmentData = {
        ...appointment,
        appointmentDate:
          appointment.appointmentDate instanceof Date
            ? appointment.appointmentDate.toISOString()
            : appointment.appointmentDate,
      }

      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update appointment")
      }

      toast({
        title: "Appointment Updated",
        description: "The appointment has been successfully updated.",
        variant: "default",
      })

      router.push("/admin/appointments")
    } catch (err) {
      console.error("Error updating appointment:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update appointment",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleServiceChange = (serviceId: string) => {
    const selectedService = services.find((service) => service._id === serviceId)
    setAppointment({
      ...appointment,
      serviceId,
      amount: selectedService?.price || appointment.amount,
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading appointment details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => router.push("/admin/appointments")}>Return to Appointments</Button>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold mb-2">Appointment Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested appointment could not be found.</p>
        <Button onClick={() => router.push("/admin/appointments")}>Return to Appointments</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Appointment</h1>
        <p className="text-muted-foreground">Update appointment details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Edit the information for appointment {appointmentId}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user">Patient</Label>
                  <Select
                    value={appointment.userId}
                    onValueChange={(value) => setAppointment({ ...appointment, userId: value })}
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

                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select value={appointment.serviceId} onValueChange={handleServiceChange}>
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

                <div>
                  <Label htmlFor="date">Appointment Date</Label>
                  <DatePicker
                    date={appointment.appointmentDate}
                    setDate={(date) => setAppointment({ ...appointment, appointmentDate: date || new Date() })}
                  />
                </div>

                <div>
                  <Label htmlFor="employee">Assigned Employee (Optional)</Label>
                  <Select
                    value={appointment.employeeId || ""}
                    onValueChange={(value) =>
                      setAppointment({ ...appointment, employeeId: value === "none" ? null : value })
                    }
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

              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={appointment.status}
                    onValueChange={(value) => setAppointment({ ...appointment, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={appointment.paymentStatus}
                    onValueChange={(value) => setAppointment({ ...appointment, paymentStatus: value })}
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

                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={appointment.amount}
                    onChange={(e) => setAppointment({ ...appointment, amount: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    value={appointment.location || ""}
                    onChange={(e) => setAppointment({ ...appointment, location: e.target.value })}
                    placeholder="Main Lab, Room 101, etc."
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={appointment.notes || ""}
                onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
                placeholder="Any additional information about this appointment"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/appointments")}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

