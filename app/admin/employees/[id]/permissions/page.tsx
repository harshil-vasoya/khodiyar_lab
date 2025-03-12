"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, ArrowLeft, Save } from "lucide-react"

export default function EmployeePermissionsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [availablePermissions, setAvailablePermissions] = useState<string[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [employeeData, setEmployeeData] = useState<any>(null)

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin/employees")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchData = async () => {
      if (status !== "authenticated" || session?.user?.role !== "admin") return

      try {
        setLoading(true)
        setError(null)

        // Fetch employee data
        const employeeResponse = await fetch(`/api/admin/employees/${params.id}`)
        if (!employeeResponse.ok) {
          throw new Error("Failed to fetch employee data")
        }
        const employeeData = await employeeResponse.json()
        setEmployeeData(employeeData)

        // Set initial permissions
        if (employeeData.permissions) {
          setSelectedPermissions(employeeData.permissions)
        }

        // Fetch available permissions
        const permissionsResponse = await fetch(`/api/admin/employees/${params.id}/permissions`)
        if (!permissionsResponse.ok) {
          throw new Error("Failed to fetch permissions")
        }
        const permissionsData = await permissionsResponse.json()
        setAvailablePermissions(permissionsData.availablePermissions || [])
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, status, session])

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      // If "all" is selected, select all permissions
      if (permission === "all") {
        setSelectedPermissions(availablePermissions)
      } else {
        setSelectedPermissions((prev) => [...prev, permission])
      }
    } else {
      // If "all" is unselected, unselect all permissions
      if (permission === "all") {
        setSelectedPermissions([])
      } else {
        setSelectedPermissions((prev) => prev.filter((p) => p !== permission))
      }
    }
  }

  const savePermissions = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(false)

      const response = await fetch(`/api/admin/employees/${params.id}/permissions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions: selectedPermissions }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update permissions")
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "An error occurred while saving permissions")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading employee permissions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Employee Permissions</h1>
        </div>
        <Button onClick={savePermissions} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Permissions
        </Button>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Permissions updated successfully</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{employeeData?.name || "Employee"}</CardTitle>
          <CardDescription>{employeeData?.email || ""}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) => handlePermissionChange(permission, checked === true)}
                    />
                    <label
                      htmlFor={permission}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

