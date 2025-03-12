"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Types
interface User {
  _id: string
  name: string
  email: string
  phone: string
  registeredDate: string
  lastActive?: string
  status: string
  appointments?: number
  reports?: number
  referralPoints?: number
  address?: string
  gender?: string
  dateOfBirth?: string
}

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const itemsPerPage = 10

  // Fetch users on component mount and when filters change
  useEffect(() => {
    fetchUsers()
  }, [currentPage, statusFilter, sortBy])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sort: sortBy,
      })

      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }

      const response = await fetch(`/api/admin/users?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to fetch users")
      }

      const data = await response.json()

      // Check if the response has the expected structure
      if (data && Array.isArray(data.users)) {
        setUsers(data.users)
        setTotalPages(data.totalPages || 1)
        setTotalUsers(data.totalUsers || data.users.length)
      } else if (Array.isArray(data)) {
        // Fallback if the API returns just an array
        setUsers(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
        setTotalUsers(data.length)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      // Fallback to mock data if API fails
      setUsers(getMockUsers())
      setTotalPages(Math.ceil(getMockUsers().length / itemsPerPage))
      setTotalUsers(getMockUsers().length)

      toast({
        title: "Warning",
        description: "Using mock data. Could not fetch users from server.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      setIsDeleting(true)

      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to delete user")
      }

      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been successfully deleted.`,
      })

      // Refresh the user list
      fetchUsers()

      // Close the dialog
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error("Error deleting user:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to update user status")
      }

      toast({
        title: "Status Updated",
        description: `User status has been updated to ${newStatus}.`,
      })

      // Refresh the user list
      fetchUsers()
    } catch (err) {
      console.error("Error updating user status:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update user status",
        variant: "destructive",
      })
    }
  }

  const exportUsers = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Registered Date",
      "Status",
      "Appointments",
      "Reports",
      "Referral Points",
    ]
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [
          user._id,
          user.name,
          user.email,
          user.phone,
          user.registeredDate,
          user.status,
          user.appointments || 0,
          user.reports || 0,
          user.referralPoints || 0,
        ].join(","),
      ),
    ].join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `users_export_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user._id?.toLowerCase().includes(searchLower)
    )
  })

  const getStatusBadge = (status: string) => {
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

  // Mock data for fallback
  const getMockUsers = (): User[] => [
    {
      _id: "USR-001",
      name: "Rajesh Patel",
      email: "rajesh.patel@example.com",
      phone: "+91 9876543210",
      registeredDate: "2023-10-15",
      lastActive: "2023-11-14",
      status: "active",
      appointments: 5,
      reports: 12,
      referralPoints: 250,
      address: "123 Main St, Mumbai, Maharashtra",
      gender: "male",
      dateOfBirth: "1985-06-15",
    },
    {
      _id: "USR-002",
      name: "Meera Shah",
      email: "meera.shah@example.com",
      phone: "+91 9876543211",
      registeredDate: "2023-09-20",
      lastActive: "2023-11-12",
      status: "active",
      appointments: 3,
      reports: 8,
      referralPoints: 150,
      address: "456 Park Ave, Delhi, Delhi",
      gender: "female",
      dateOfBirth: "1990-03-22",
    },
    {
      _id: "USR-003",
      name: "Amit Desai",
      email: "amit.desai@example.com",
      phone: "+91 9876543212",
      registeredDate: "2023-08-05",
      lastActive: "2023-11-10",
      status: "inactive",
      appointments: 2,
      reports: 4,
      referralPoints: 100,
      address: "789 Lake Rd, Bangalore, Karnataka",
      gender: "male",
      dateOfBirth: "1978-11-30",
    },
    {
      _id: "USR-004",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 9876543213",
      registeredDate: "2023-11-01",
      lastActive: "2023-11-13",
      status: "active",
      appointments: 1,
      reports: 2,
      referralPoints: 50,
      address: "101 River View, Chennai, Tamil Nadu",
      gender: "female",
      dateOfBirth: "1995-08-12",
    },
    {
      _id: "USR-005",
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      phone: "+91 9876543214",
      registeredDate: "2023-07-12",
      lastActive: "2023-10-30",
      status: "inactive",
      appointments: 8,
      reports: 15,
      referralPoints: 300,
      address: "202 Hill Road, Pune, Maharashtra",
      gender: "male",
      dateOfBirth: "1982-04-05",
    },
    {
      _id: "USR-006",
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 9876543215",
      registeredDate: "2023-10-05",
      lastActive: "2023-11-14",
      status: "active",
      appointments: 4,
      reports: 10,
      referralPoints: 200,
      address: "303 Beach Lane, Kochi, Kerala",
      gender: "female",
      dateOfBirth: "1988-12-18",
    },
    {
      _id: "USR-007",
      name: "Sanjay Kumar",
      email: "sanjay.kumar@example.com",
      phone: "+91 9876543216",
      registeredDate: "2023-09-15",
      lastActive: "2023-11-05",
      status: "blocked",
      appointments: 0,
      reports: 3,
      referralPoints: 0,
      address: "404 Mountain View, Shimla, Himachal Pradesh",
      gender: "male",
      dateOfBirth: "1975-02-28",
    },
    {
      _id: "USR-008",
      name: "Anita Joshi",
      email: "anita.joshi@example.com",
      phone: "+91 9876543217",
      registeredDate: "2023-11-10",
      lastActive: "2023-11-13",
      status: "active",
      appointments: 2,
      reports: 2,
      referralPoints: 100,
      address: "505 Valley Road, Jaipur, Rajasthan",
      gender: "female",
      dateOfBirth: "1992-07-10",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage patient accounts and information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportUsers}>
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

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
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
            <div className="col-span-1">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => {
                  setStatusFilter("all")
                  setSortBy("newest")
                  setSearchQuery("")
                  setCurrentPage(1)
                }}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Reset filters</span>
              </Button>
            </div>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                      <p className="text-muted-foreground">Loading users...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
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
                filteredUsers.map((user) => (
                  <TableRow key={user._id}>
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
                          <div className="text-sm text-muted-foreground">{user._id}</div>
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
                        {user.lastActive && (
                          <div className="text-xs text-muted-foreground">
                            Last active:{" "}
                            {new Date(user.lastActive).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.appointments || 0}</TableCell>
                    <TableCell>{user.reports || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Gift className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">{user.referralPoints || 0}</span>
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/users/${user._id}/edit`)}>
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
                            <DropdownMenuItem onClick={() => handleUpdateStatus(user._id, "active")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleUpdateStatus(user._id, "blocked")}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
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
            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{totalUsers}</span> users
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
        </CardFooter>
      </Card>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Detailed information about the user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                  <p className="text-muted-foreground">{selectedUser._id}</p>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    {selectedUser.address && (
                      <div className="flex items-start">
                        <span className="mr-2">📍</span>
                        <span>{selectedUser.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                  <div className="mt-1 space-y-1">
                    {selectedUser.gender && (
                      <div className="flex items-center">
                        <span className="mr-2">⚧️</span>
                        <span className="capitalize">{selectedUser.gender}</span>
                      </div>
                    )}
                    {selectedUser.dateOfBirth && (
                      <div className="flex items-center">
                        <Gift className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(selectedUser.dateOfBirth).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Registered on{" "}
                        {new Date(selectedUser.registeredDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Appointments</h3>
                  <p className="text-2xl font-bold">{selectedUser.appointments || 0}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Reports</h3>
                  <p className="text-2xl font-bold">{selectedUser.reports || 0}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Referral Points</h3>
                  <p className="text-2xl font-bold">{selectedUser.referralPoints || 0}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedUser && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  router.push(`/admin/users/${selectedUser._id}/edit`)
                }}
              >
                Edit User
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <Avatar>
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

