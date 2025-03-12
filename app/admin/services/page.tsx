"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Loader2, Check, X, ArrowUpDown } from "lucide-react"
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
import { toast } from "@/components/ui/use-toast"
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
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Service {
  _id: string
  name: string
  description?: string
  price: number
  departmentId?: string
  duration: number
  homeCollection: boolean
  active: boolean
  createdAt?: string
  updatedAt?: string
  department?: {
    id: string
    name: string
  }
}

interface Department {
  _id: string
  name: string
  description?: string
}

export default function ServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [newService, setNewService] = useState<Omit<Service, "_id">>({
    name: "",
    description: "",
    price: 0,
    departmentId: "",
    duration: 30,
    homeCollection: false,
    active: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchServices()
    fetchDepartments()
  }, [currentPage, departmentFilter, activeFilter, sortField, sortDirection])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/services")
      if (!response.ok) {
        throw new Error("Failed to fetch services")
      }

      const data = await response.json()
      setServices(data)
      setTotalPages(Math.ceil(data.length / itemsPerPage))
    } catch (err) {
      console.error("Error fetching services:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments")
      if (!response.ok) {
        throw new Error("Failed to fetch departments")
      }

      const data = await response.json()
      setDepartments(data)
    } catch (err) {
      console.error("Error fetching departments:", err)
      setDepartments([])
    }
  }

  const handleCreateService = async () => {
    try {
      setIsSubmitting(true)

      if (!newService.name || !newService.price || !newService.departmentId) {
        toast({
          title: "Validation Error",
          description: "Name, price, and department are required fields.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create service")
      }

      await response.json()

      toast({
        title: "Service Created",
        description: "The service has been successfully created.",
        variant: "default",
      })

      setIsCreateDialogOpen(false)
      fetchServices()

      // Reset form
      setNewService({
        name: "",
        description: "",
        price: 0,
        departmentId: "",
        duration: 30,
        homeCollection: false,
        active: true,
      })
    } catch (err) {
      console.error("Error creating service:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateService = async () => {
    if (!selectedService) return

    try {
      setIsSubmitting(true)

      if (!selectedService.name || !selectedService.price || !selectedService.departmentId) {
        toast({
          title: "Validation Error",
          description: "Name, price, and department are required fields.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`/api/services/${selectedService._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedService.name,
          description: selectedService.description,
          price: selectedService.price,
          departmentId: selectedService.departmentId,
          duration: selectedService.duration,
          homeCollection: selectedService.homeCollection,
          active: selectedService.active,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update service")
      }

      await response.json()

      toast({
        title: "Service Updated",
        description: "The service has been successfully updated.",
        variant: "default",
      })

      setIsEditDialogOpen(false)
      fetchServices()
    } catch (err) {
      console.error("Error updating service:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteService = async () => {
    if (!selectedService) return

    try {
      setIsSubmitting(true)

      const response = await fetch(`/api/services/${selectedService._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete service")
      }

      toast({
        title: "Service Deleted",
        description: "The service has been successfully deleted.",
        variant: "default",
      })

      setIsDeleteDialogOpen(false)
      fetchServices()
    } catch (err) {
      console.error("Error deleting service:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredServices = services
    .filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false

      const matchesDepartment = departmentFilter === "all" || service.departmentId === departmentFilter

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && service.active) ||
        (activeFilter === "inactive" && !service.active)

      return matchesSearch && matchesDepartment && matchesActive
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortField === "department") {
        const deptA = a.department?.name || ""
        const deptB = b.department?.name || ""
        return sortDirection === "asc" ? deptA.localeCompare(deptB) : deptB.localeCompare(deptA)
      }
      return 0
    })

  // Pagination
  const paginatedServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Services</CardTitle>
                <CardDescription>View and manage all laboratory services</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    New Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Service</DialogTitle>
                    <DialogDescription>Fill in the details to add a new laboratory service.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                          Service Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          placeholder="Complete Blood Count"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="department">
                          Department <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={newService.departmentId}
                          onValueChange={(value) => setNewService({ ...newService, departmentId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem key={department._id} value={department._id}>
                                {department.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="price">
                          Price (₹) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                          placeholder="1200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={newService.duration}
                          onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                          placeholder="30"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newService.description || ""}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        placeholder="Detailed description of the service"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="home-collection"
                          checked={newService.homeCollection}
                          onCheckedChange={(checked) => setNewService({ ...newService, homeCollection: checked })}
                        />
                        <Label htmlFor="home-collection">Available for Home Collection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="active"
                          checked={newService.active}
                          onCheckedChange={(checked) => setNewService({ ...newService, active: checked })}
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateService} disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Service
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((department) => (
                        <SelectItem key={department._id} value={department._id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={activeFilter} onValueChange={setActiveFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSearchTerm("")
                      setDepartmentFilter("all")
                      setActiveFilter("all")
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
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">
                          Service Name
                          {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                        <div className="flex items-center">
                          Department
                          {sortField === "department" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                        <div className="flex items-center">
                          Price
                          {sortField === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Home Collection</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex justify-center items-center">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            <span>Loading services...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : paginatedServices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No services found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedServices.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell>
                            <div className="font-medium">{service.name}</div>
                            {service.description && (
                              <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                            )}
                          </TableCell>
                          <TableCell>{service.department?.name || "Unknown"}</TableCell>
                          <TableCell>₹{service.price.toLocaleString()}</TableCell>
                          <TableCell>{service.duration} min</TableCell>
                          <TableCell>
                            {service.homeCollection ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" /> Available
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                <X className="h-3 w-3 mr-1" /> Not Available
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {service.active ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Inactive
                              </Badge>
                            )}
                          </TableCell>
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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedService(service)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Service
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedService(service)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Service
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

              {filteredServices.length > itemsPerPage && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber =
                        currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                            ? totalPages - 4 + i
                            : currentPage - 2 + i

                      if (pageNumber <= 0 || pageNumber > totalPages) return null

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={currentPage === pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
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
      </div>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update the details of this service.</DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">
                    Service Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedService.name}
                    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedService.departmentId}
                    onValueChange={(value) => setSelectedService({ ...selectedService, departmentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department._id} value={department._id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-price">
                    Price (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={selectedService.price}
                    onChange={(e) => setSelectedService({ ...selectedService, price: Number(e.target.value) })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={selectedService.duration}
                    onChange={(e) => setSelectedService({ ...selectedService, duration: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedService.description || ""}
                  onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-home-collection"
                    checked={selectedService.homeCollection}
                    onCheckedChange={(checked) => setSelectedService({ ...selectedService, homeCollection: checked })}
                  />
                  <Label htmlFor="edit-home-collection">Available for Home Collection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={selectedService.active}
                    onCheckedChange={(checked) => setSelectedService({ ...selectedService, active: checked })}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateService} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="py-4">
              <div className="flex flex-col gap-2 p-4 border rounded-md bg-gray-50">
                <div className="font-medium">{selectedService.name}</div>
                <div className="text-sm text-muted-foreground">
                  Department: {selectedService.department?.name || "Unknown"}
                </div>
                <div className="text-sm text-muted-foreground">Price: ₹{selectedService.price.toLocaleString()}</div>
              </div>
              <p className="mt-4 text-sm text-red-600">
                Warning: Deleting this service may affect existing appointments and reports.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteService} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

