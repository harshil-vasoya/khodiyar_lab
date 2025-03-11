import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Search, Filter, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Sample data - in a real app, this would come from an API
const appointments = [
  {
    id: "apt-001",
    test: "Complete Blood Count",
    date: "2023-11-15",
    time: "10:00 AM",
    location: "Laboratory",
    status: "upcoming",
    doctor: "Dr. Patel",
  },
  {
    id: "apt-002",
    test: "Lipid Profile",
    date: "2023-11-10",
    time: "11:30 AM",
    location: "Home Collection",
    status: "completed",
    doctor: "Dr. Sharma",
  },
  {
    id: "apt-003",
    test: "Thyroid Function Test",
    date: "2023-10-25",
    time: "09:00 AM",
    location: "Laboratory",
    status: "completed",
    doctor: "Dr. Desai",
  },
]

export default function UserAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Appointments</h2>
          <p className="text-muted-foreground">Manage your scheduled appointments</p>
        </div>
        <Link href="/book-appointment">
          <Button>Book New Appointment</Button>
        </Link>
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
                <Input id="search" placeholder="Search by test name or ID..." className="pl-8" />
              </div>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="sort" className="text-sm font-medium">
                Sort By
              </label>
              <Select defaultValue="date-desc">
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Date (Newest)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="name-asc">Test Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Test Name (Z-A)</SelectItem>
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

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No appointments found</h3>
            <p className="text-muted-foreground mb-4 text-center">You don't have any appointments scheduled yet.</p>
            <Button asChild>
              <Link href="/book-appointment">Book Your First Appointment</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <div className={`h-1 w-full ${appointment.status === "upcoming" ? "bg-primary" : "bg-muted"}`}></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{appointment.test}</CardTitle>
                    <CardDescription>Appointment #{appointment.id}</CardDescription>
                  </div>
                  <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"} className="capitalize">
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Date & Time</div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Location</div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Doctor</div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{appointment.doctor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                {appointment.status === "upcoming" ? (
                  <div className="flex gap-3 w-full justify-end">
                    <Button variant="outline">Reschedule</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Cancel
                    </Button>
                    <Button>View Details</Button>
                  </div>
                ) : (
                  <div className="flex gap-3 w-full justify-end">
                    <Button variant="outline">View Report</Button>
                    <Button>Book Similar</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {appointments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{appointments.length}</span>{" "}
            of <span className="font-medium">{appointments.length}</span> appointments
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

