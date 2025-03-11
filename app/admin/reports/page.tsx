"use client"

import { useState } from "react"
import { Calendar, Download, Filter, MoreHorizontal, Search, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import Link from "next/link"

// Sample data
const reports = [
  {
    id: "REP001",
    patientName: "Rajesh Patel",
    patientId: "PAT123",
    testName: "Complete Blood Count",
    date: "2023-03-08",
    uploadedBy: "Dr. Mehta",
    status: "normal",
  },
  {
    id: "REP002",
    patientName: "Priya Sharma",
    patientId: "PAT456",
    testName: "Lipid Profile",
    date: "2023-03-09",
    uploadedBy: "Dr. Shah",
    status: "abnormal",
  },
  {
    id: "REP003",
    patientName: "Amit Singh",
    patientId: "PAT789",
    testName: "Liver Function Test",
    date: "2023-03-09",
    uploadedBy: "Dr. Patel",
    status: "critical",
  },
  {
    id: "REP004",
    patientName: "Neha Gupta",
    patientId: "PAT234",
    testName: "Thyroid Profile",
    date: "2023-03-10",
    uploadedBy: "Dr. Mehta",
    status: "normal",
  },
  {
    id: "REP005",
    patientName: "Vikram Desai",
    patientId: "PAT567",
    testName: "Glucose Tolerance Test",
    date: "2023-03-10",
    uploadedBy: "Dr. Shah",
    status: "abnormal",
  },
  {
    id: "REP006",
    patientName: "Meera Joshi",
    patientId: "PAT890",
    testName: "Kidney Function Test",
    date: "2023-03-10",
    uploadedBy: "Dr. Patel",
    status: "normal",
  },
  {
    id: "REP007",
    patientName: "Rahul Mehta",
    patientId: "PAT345",
    testName: "Hemoglobin Test",
    date: "2023-03-11",
    uploadedBy: "Dr. Mehta",
    status: "normal",
  },
  {
    id: "REP008",
    patientName: "Ananya Reddy",
    patientId: "PAT678",
    testName: "Vitamin D Test",
    date: "2023-03-11",
    uploadedBy: "Dr. Shah",
    status: "abnormal",
  },
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Normal
          </Badge>
        )
      case "abnormal":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Abnormal
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Manage and track all patient test reports</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="abnormal">Abnormal</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Link href="/admin/reports/upload">
              <Button className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Upload Report
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No reports found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{report.patientName}</span>
                            <span className="text-xs text-muted-foreground">{report.patientId}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.testName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{report.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span>{report.uploadedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" title="Download Report">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send to Patient</DropdownMenuItem>
                                <DropdownMenuItem>Print Report</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete Report</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

