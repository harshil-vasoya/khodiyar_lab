"use client"

import { useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Loader2, Check, X } from "lucide-react"
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

interface Department {
  _id: string
  name: string
  description?: string
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [newDepartment, setNewDepartment] = useState<Omit<Department, "_id">>({
    name: "",
    description: "",
    active: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [servicesCount, setServicesCount] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/departments")
      if (!response.ok) {
        throw new Error("Failed to fetch departments")
      }

      const data = await response.json()
      setDepartments(data)

      // Fetch service counts for each department
      fetchServiceCounts(data)
    } catch (err) {
      console.error("Error fetching departments:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setDepartments([])
    } finally {
      setLoading(false)
    }
  }

  const fetchServiceCounts = async (depts: Department[]) => {
    try {
      const response = await fetch("/api/services")
      if (!response.ok) {
        throw new Error("Failed to fetch services")
      }

      const services = await response.json()

      // Count services per department
      const counts: Record<string, number> = {}
      depts.forEach((dept) => {
        counts[dept._id] = services.filter((s: any) => s.departmentId === dept._id).length
      })

      setServicesCount(counts)
    } catch (err) {
      console.error("Error fetching service counts:", err)
    }
  }

  const handleCreateDepartment = async () => {
    try {
      setIsSubmitting(true)

      if (!newDepartment.name) {
        toast({
          title: "Validation Error",
          description: "Department name is required.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create department")
      }

      await response.json()

      toast({
        title: "Department Created",
        description: "The department has been successfully created.",
        variant: "default",
      })

      setIsCreateDialogOpen(false)
      fetchDepartments()

      // Reset form
      setNewDepartment({
        name: "",
        description: "",
        active: true,
      })
    } catch (err) {
      console.error("Error creating department:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create department",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateDepartment = async () => {
    if (!selectedDepartment) return

    try {
      setIsSubmitting(true)

      if (!selectedDepartment.name) {
        toast({
          title: "Validation Error",
          description: "Department name is required.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`/api/departments/${selectedDepartment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedDepartment.name,
          description: selectedDepartment.description,
          active: selectedDepartment.active,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update department")
      }

      await response.json()

      toast({
        title: "Department Updated",
        description: "The department has been successfully updated.",
        variant: "default",
      })

      setIsEditDialogOpen(false)
      fetchDepartments()
    } catch (err) {
      console.error("Error updating department:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update department",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return

    try {
      setIsSubmitting(true)

      const response = await fetch(`/api/departments/${selectedDepartment._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete department")
      }

      toast({
        title: "Department Deleted",
        description: "The department has been successfully deleted.",
        variant: "default",
      })

      setIsDeleteDialogOpen(false)
      fetchDepartments()
    } catch (err) {
      console.error("Error deleting department:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete department",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredDepartments = departments.filter((department) => {
    return (
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    )
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
        <p className="text-muted-foreground">Manage laboratory departments</p>
      </div>

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
                <CardTitle>All Departments</CardTitle>
                <CardDescription>View and manage laboratory departments</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    New Department
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Department</DialogTitle>
                    <DialogDescription>Fill in the details to add a new laboratory department.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">
                        Department Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                        placeholder="Hematology"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newDepartment.description || ""}
                        onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                        placeholder="Department description"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={newDepartment.active}
                        onCheckedChange={(checked) => setNewDepartment({ ...newDepartment, active: checked })}
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateDepartment} disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Department
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search departments..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex justify-center items-center">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            <span>Loading departments...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredDepartments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No departments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDepartments.map((department) => (
                        <TableRow key={department._id}>
                          <TableCell className="font-medium">{department.name}</TableCell>
                          <TableCell>{department.description || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {servicesCount[department._id] || 0} services
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {department.active ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" /> Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <X className="h-3 w-3 mr-1" /> Inactive
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
                                    setSelectedDepartment(department)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Department
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedDepartment(department)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                  disabled={servicesCount[department._id] > 0}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Department
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update the details of this department.</DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-name">
                  Department Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={selectedDepartment.name}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedDepartment.description || ""}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={selectedDepartment.active}
                  onCheckedChange={(checked) => setSelectedDepartment({ ...selectedDepartment, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDepartment} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Department Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this department? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="py-4">
              <div className="flex flex-col gap-2 p-4 border rounded-md bg-gray-50">
                <div className="font-medium">{selectedDepartment.name}</div>
                {selectedDepartment.description && (
                  <div className="text-sm text-muted-foreground">{selectedDepartment.description}</div>
                )}
              </div>
              {servicesCount[selectedDepartment._id] > 0 ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Cannot Delete</AlertTitle>
                  <AlertDescription>
                    This department has {servicesCount[selectedDepartment._id]} services associated with it. Please
                    reassign or delete these services first.
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="mt-4 text-sm text-red-600">
                  Warning: Deleting this department may affect system organization.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteDepartment}
              disabled={isSubmitting || (selectedDepartment && servicesCount[selectedDepartment._id] > 0)}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

