"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Search, Filter, Loader2, Clock, User, FileText, Database } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuditLogsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [entityFilter, setEntityFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin/audit-logs")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  useEffect(() => {
    // Fetch audit logs
    const fetchAuditLogs = async () => {
      try {
        setLoading(true)

        let url = "/api/admin/audit-logs?"

        if (actionFilter !== "all") {
          url += `action=${actionFilter}&`
        }

        if (entityFilter !== "all") {
          url += `entityType=${entityFilter}&`
        }

        if (startDate) {
          url += `startDate=${startDate}&`
        }

        if (endDate) {
          url += `endDate=${endDate}&`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch audit logs")
        }

        const data = await response.json()
        setLogs(data)
        setError(null)
      } catch (err) {
        setError("Error loading audit logs. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchAuditLogs()
    }
  }, [status, session, actionFilter, entityFilter, startDate, endDate])

  const filteredLogs = logs.filter(
    (log) =>
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && JSON.stringify(log.details).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Create</span>
      case "update":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Update</span>
      case "delete":
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Delete</span>
      case "login":
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Login</span>
      case "logout":
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Logout</span>
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{action}</span>
    }
  }

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "user":
        return <User className="h-4 w-4 text-blue-500" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-green-500" />
      case "report":
        return <FileText className="h-4 w-4 text-amber-500" />
      case "system":
        return <Database className="h-4 w-4 text-purple-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading audit logs...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">View system activity and user actions</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="action" className="text-sm font-medium">
                Action
              </label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger id="action">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="entity" className="text-sm font-medium">
                Entity Type
              </label>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger id="entity">
                  <SelectValue placeholder="All Entities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>Entity ID</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{log.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getActionIcon(log.action)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getEntityIcon(log.entityType)}
                        <span>{log.entityType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">{log.entityId?.toString().substring(0, 8) || "N/A"}</span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {log.details ? JSON.stringify(log.details).substring(0, 50) + "..." : "N/A"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

