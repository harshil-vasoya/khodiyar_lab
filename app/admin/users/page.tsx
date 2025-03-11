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
  Users,
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
  Gift,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const users = [
  {
    id: "USR-001",
    name: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    phone: "+91 9876543210",
    registeredDate: "2023-10-15",
    lastActive: "2023-11-14",
    status: "active",
    appointments: 5,
    reports: 12,
    referralPoints: 250,
  },
  {
    id: "USR-002",
    name: "Meera Shah",
    email: "meera.shah@example.com",
    phone: "+91 9876543211",
    registeredDate: "2023-09-20",
    lastActive: "2023-11-12",
    status: "active",
    appointments: 3,
    reports: 8,
    referralPoints: 150,
  },
  {
    id: "USR-003",
    name: "Amit Desai",
    email: "amit.desai@example.com",
    phone: "+91 9876543212",
    registeredDate: "2023-08-05",
    lastActive: "2023-11-10",
    status: "inactive",
    appointments: 2,
    reports: 4,
    referralPoints: 100,
  },
  {
    id: "USR-004",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543213",
    registeredDate: "2023-11-01",
    lastActive: "2023-11-13",
    status: "active",
    appointments: 1,
    reports: 2,
    referralPoints: 50,
  },
  {
    id: "USR-005",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 9876543214",
    registeredDate: "2023-07-12",
    lastActive: "2023-10-30",
    status: "inactive",
    appointments: 8,
    reports: 15,
    referralPoints: 300,
  },
  {
    id: "USR-006",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 9876543215",
    registeredDate: "2023-10-05",
    lastActive: "2023-11-14",
    status: "active",
    appointments: 4,
    reports: 10,
    referralPoints: 200,
  },
  {
    id: "USR-007",
    name: "Sanjay Kumar",
    email: "sanjay.kumar@example.com",
    phone: "+91 9876543216",
    registeredDate: "2023-09-15",
    lastActive: "2023-11-05",
    status: "blocked",
    appointments: 0,
    reports: 3,
    referralPoints: 0,
  },
  {
    id: "USR-008",
    name: "Anita Joshi",
    email: "anita.joshi@example.com",
    phone: "+91 9876543217",
    registeredDate: "2023-11-10",
    lastActive: "2023-11-13",
    status: "active",
    appointments: 2,
    reports: 2,
    referralPoints: 100,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.toLowerCase().includes(searchLower) ||
      user.id.toLowerCase().includes(searchLower)

    // Status filter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()
      case "oldest":
        return new Date(a.registeredDate).getTime() - new Date(b.registeredDate).getTime()
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "most-active":
        return b.appointments - a.appointments
      case "most-points":
        return b.referralPoints - a.referralPoints
      default:
        return 0
    }
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
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage patient accounts and information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Add User
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
                  placeholder="Search by name, email, phone..."
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
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="sort" className="text-sm font-medium">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="most-active">Most Active</SelectItem>
                  <SelectItem value="most-points">Most Referral Points</SelectItem>
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

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Referral Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No users found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {new Date(user.registeredDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active:{" "}
                          {new Date(user.lastActive).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.appointments}</TableCell>
                    <TableCell>{user.reports}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Gift className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">{user.referralPoints}</span>
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
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Gift className="mr-2 h-4 w-4" />
                            Manage Points
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "blocked" ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
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
            Showing <span className="font-medium">{sortedUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
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

