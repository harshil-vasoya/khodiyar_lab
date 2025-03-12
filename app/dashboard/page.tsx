"use client"

import { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  FileText,
  Share2,
  User,
  Bell,
  Clock,
  TrendingUp,
  Activity,
  ChevronRight,
  Plus,
  LogOut,
} from "lucide-react"
import UserAppointments from "@/components/user/user-appointments"
import UserReports from "@/components/user/user-reports"
import UserReferrals from "@/components/user/user-referrals"
import UserProfile from "@/components/user/user-profile"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("appointments")

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: "apt-001",
      test: "Complete Blood Count",
      date: "2023-11-15",
      time: "10:00 AM",
    },
    {
      id: "apt-002",
      test: "Lipid Profile",
      date: "2023-11-20",
      time: "11:30 AM",
    },
  ]

  // Mock data for recent reports
  const recentReports = [
    {
      id: "rep-001",
      test: "Complete Blood Count",
      date: "2023-11-10",
      status: "normal",
    },
    {
      id: "rep-002",
      test: "Lipid Profile",
      date: "2023-10-25",
      status: "attention",
    },
  ]

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your health records and upcoming appointments
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button> */}
            <Link href="/book-appointment">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of the dashboard code remains the same */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">Next: Nov 15, 10:00 AM</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Reports</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">1 needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <h3 className="text-2xl font-bold mt-1">85/100</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              <span className="text-green-600">Up 5 points from last check</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Referrals</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <User className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">1 pending invitation</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used services and actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center text-center"
              asChild
            >
              <Link href="/book-appointment">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Book Appointment</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center text-center"
              asChild
            >
              <Link href="/reports">
                <FileText className="h-6 w-6 mb-2" />
                <span>View Reports</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center text-center"
              asChild
            >
              <Link href="/refer">
                <Share2 className="h-6 w-6 mb-2" />
                <span>Refer a Friend</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center text-center"
              asChild
            >
              <Link href="/profile">
                <User className="h-6 w-6 mb-2" />
                <span>Update Profile</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </div>
            <Link href="/book-appointment">
              <Button variant="outline" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">You don't have any upcoming appointments.</p>
                <Button asChild>
                  <Link href="/book-appointment">Book Your First Appointment</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.test}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(appointment.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="default" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your latest test results</CardDescription>
          </div>
          <Link href="/reports">
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentReports.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">You don't have any reports yet.</p>
              <Button asChild>
                <Link href="/book-appointment">Book an Appointment</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.test}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(report.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === "normal" ? "success" : "destructive"}>
                      {report.status === "normal" ? "Normal" : "Needs Attention"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Tabs Section */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <UserAppointments />
          </TabsContent>
          <TabsContent value="reports">
            <UserReports />
          </TabsContent>
          <TabsContent value="referrals">
            <UserReferrals />
          </TabsContent>
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

