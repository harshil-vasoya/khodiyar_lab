"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BatchOperationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [collection, setCollection] = useState("users")
  const [operation, setOperation] = useState("update")
  const [items, setItems] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [updateData, setUpdateData] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin/batch-operations")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  useEffect(() => {
    // Fetch items based on collection
    const fetchItems = async () => {
      try {
        setLoading(true)

        let url = `/api/${collection}?`

        if (statusFilter !== "all") {
          url += `status=${statusFilter}&`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch ${collection}`)
        }

        const data = await response.json()
        setItems(data)
        setSelectedItems([])
        setError(null)
      } catch (err) {
        setError(`Error loading ${collection}. Please try again.`)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchItems()
    }
  }, [status, session, collection, statusFilter])

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toString().includes(searchTerm) ||
      item._id?.toString().includes(searchTerm),
  )

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item._id.toString()))
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleBatchOperation = async () => {
    if (selectedItems.length === 0) {
      setError("Please select at least one item")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      let data = {}

      if (operation === "update") {
        try {
          data = JSON.parse(updateData)
        } catch (err) {
          setError("Invalid JSON data for update")
          setLoading(false)
          return
        }
      }

      const response = await fetch("/api/admin/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation,
          collection,
          ids: selectedItems,
          data,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to perform batch operation")
      }

      const result = await response.json()

      setSuccess(`Successfully performed ${operation} operation on ${result.affectedCount} ${collection}`)
      setSelectedItems([])

      // Refresh the list
      const refreshResponse = await fetch(
        `/api/${collection}?${statusFilter !== "all" ? `status=${statusFilter}&` : ""}`,
      )
      const refreshData = await refreshResponse.json()
      setItems(refreshData)
    } catch (err) {
      setError(`Error performing batch operation: ${err instanceof Error ? err.message : "Unknown error"}`)
      console.error(err)
    } finally {
      setLoading(false)
      setConfirmOpen(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Batch Operations</h1>
        <p className="text-muted-foreground">Perform operations on multiple items at once</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Batch Operation Settings</CardTitle>
          <CardDescription>Configure the batch operation you want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Select value={collection} onValueChange={setCollection}>
                <SelectTrigger id="collection">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="appointments">Appointments</SelectItem>
                  <SelectItem value="reports">Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger id="operation">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {operation === "update" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="updateData">Update Data (JSON)</Label>
                <Textarea
                  id="updateData"
                  placeholder='{"status": "inactive"}'
                  value={updateData}
                  onChange={(e) => setUpdateData(e.target.value)}
                  className="font-mono"
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  Enter valid JSON data for the update operation. Example: {"{"}"status": "inactive"{"}"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Items</CardTitle>
          <CardDescription>Select the items you want to perform the operation on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder={`Search ${collection}...`}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(item._id.toString())}
                          onCheckedChange={() => handleSelectItem(item._id.toString())}
                          aria-label={`Select ${item.name || item._id}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{item._id.toString().substring(0, 8)}</TableCell>
                      <TableCell>{item.name || "N/A"}</TableCell>
                      <TableCell>{item.email || "N/A"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "inactive"
                                ? "bg-amber-100 text-amber-800"
                                : item.status === "pending"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.status === "completed"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status || "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Selected <span className="font-medium">{selectedItems.length}</span> of{" "}
            <span className="font-medium">{filteredItems.length}</span> items
          </div>
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={selectedItems.length === 0}
                variant={operation === "delete" ? "destructive" : "default"}
              >
                {operation === "update"
                  ? "Update Selected"
                  : operation === "delete"
                    ? "Delete Selected"
                    : "Archive Selected"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Batch Operation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to {operation} {selectedItems.length} selected {collection}?
                  {operation === "delete" && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        This action cannot be undone. This will permanently {operation} the selected {collection}.
                      </AlertDescription>
                    </Alert>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant={operation === "delete" ? "destructive" : "default"}
                  onClick={handleBatchOperation}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm ${operation}`
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

