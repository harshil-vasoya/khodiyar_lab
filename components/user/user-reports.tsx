import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Eye, Search, Filter, FileText, AlertCircle, CheckCircle, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Sample data - in a real app, this would come from an API
const reports = [
  {
    id: "rep-001",
    test: "Complete Blood Count",
    date: "2023-11-10",
    doctor: "Dr. Patel",
    status: "normal",
    department: "Hematology",
  },
  {
    id: "rep-002",
    test: "Lipid Profile",
    date: "2023-10-25",
    doctor: "Dr. Sharma",
    status: "attention",
    department: "Biochemistry",
  },
  {
    id: "rep-003",
    test: "Thyroid Function Test",
    date: "2023-09-15",
    doctor: "Dr. Desai",
    status: "normal",
    department: "Immunoassay",
  },
]

export default function UserReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Reports</h2>
          <p className="text-muted-foreground">Access and download your test reports</p>
        </div>
        <Link href="/book-appointment">
          <Button>Book New Test</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search-reports" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search-reports" placeholder="Search by test name or ID..." className="pl-8" />
              </div>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="department">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="hematology">Hematology</SelectItem>
                  <SelectItem value="biochemistry">Biochemistry</SelectItem>
                  <SelectItem value="immunoassay">Immunoassay</SelectItem>
                  <SelectItem value="microbiology">Microbiology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px] space-y-2">
              <label htmlFor="report-status" className="text-sm font-medium">
                Status
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="report-status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="attention">Needs Attention</SelectItem>
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

      {reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-blue-100 p-3 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-4 text-center">You don't have any test reports yet.</p>
            <Button asChild>
              <Link href="/book-appointment">Book Your First Test</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className={`h-1 w-full ${report.status === "normal" ? "bg-green-500" : "bg-destructive"}`}></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{report.test}</CardTitle>
                    <CardDescription>
                      Report #{report.id} • {report.department}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={report.status === "normal" ? "success" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {report.status === "normal" ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span>Normal</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3" />
                        <span>Needs Attention</span>
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Date</div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(report.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Referring Doctor</div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{report.doctor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                <div className="flex gap-3 w-full justify-end">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {reports.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{reports.length}</span> of{" "}
            <span className="font-medium">{reports.length}</span> reports
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

