"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Gift, User, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Sample data
const referralHistory = [
  {
    id: "REF-001",
    patientName: "Rajesh Patel",
    patientId: "PAT-1234",
    points: 100,
    reason: "Test Completion",
    test: "Complete Blood Count",
    date: "2023-11-10",
    addedBy: "Dr. Sharma",
  },
  {
    id: "REF-002",
    patientName: "Meera Shah",
    patientId: "PAT-5678",
    points: 200,
    reason: "Specialized Test",
    test: "Lipid Profile",
    date: "2023-11-08",
    addedBy: "Dr. Patel",
  },
  {
    id: "REF-003",
    patientName: "Amit Desai",
    patientId: "PAT-9012",
    points: 100,
    reason: "Test Completion",
    test: "Thyroid Function Test",
    date: "2023-11-05",
    addedBy: "Dr. Gupta",
  },
  {
    id: "REF-004",
    patientName: "Priya Sharma",
    patientId: "PAT-3456",
    points: 50,
    reason: "Referral",
    test: "N/A",
    date: "2023-11-03",
    addedBy: "Anita Joshi",
  },
  {
    id: "REF-005",
    patientName: "Vikram Mehta",
    patientId: "PAT-7890",
    points: 150,
    reason: "Multiple Tests",
    test: "Health Package",
    date: "2023-10-30",
    addedBy: "Dr. Shah",
  },
]

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [reasonFilter, setReasonFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [pointsToAdd, setPointsToAdd] = useState(100)
  const [reason, setReason] = useState("test-completion")
  const [notifyPatient, setNotifyPatient] = useState(true)

  // Filter referral history based on search query and filters
  const filteredReferrals = referralHistory.filter((referral) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      referral.patientName.toLowerCase().includes(searchLower) ||
      referral.patientId.toLowerCase().includes(searchLower) ||
      referral.test.toLowerCase().includes(searchLower) ||
      referral.addedBy.toLowerCase().includes(searchLower)

    // Reason filter
    const matchesReason =
      reasonFilter === "all" ||
      (reasonFilter === "test" &&
        (referral.reason === "Test Completion" ||
          referral.reason === "Specialized Test" ||
          referral.reason === "Multiple Tests")) ||
      (reasonFilter === "referral" && referral.reason === "Referral")

    // Date filter (simplified for demo)
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "thisWeek" && new Date(referral.date) >= new Date("2023-11-05")) ||
      (dateFilter === "thisMonth" && new Date(referral.date) >= new Date("2023-11-01")) ||
      (dateFilter === "lastMonth" &&
        new Date(referral.date) >= new Date("2023-10-01") &&
        new Date(referral.date) < new Date("2023-11-01"))

    return matchesSearch && matchesReason && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Referral Points</h1>
          <p className="text-muted-foreground">Manage and track patient referral points</p>
        </div>
      </div>

      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="add">Add Points</TabsTrigger>
          <TabsTrigger value="history">Points History</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Referral Points</CardTitle>
              <CardDescription>
                Reward patients with referral points for completing tests or referring others
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">1. Select Patient</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patient by name or ID..." className="pl-8" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    "Rajesh Patel (PAT-1234)",
                    "Meera Shah (PAT-5678)",
                    "Amit Desai (PAT-9012)",
                    "Priya Sharma (PAT-3456)",
                  ].map((patient, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${selectedPatient === patient ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.split(" (")[0]}</p>
                        <p className="text-sm text-muted-foreground">{patient.split(" (")[1].replace(")", "")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">2. Points Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Points to Add</Label>
                    <Input
                      id="points"
                      type="number"
                      value={pointsToAdd}
                      onChange={(e) => setPointsToAdd(Number.parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Standard points: 100 for regular tests, 200 for specialized tests
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test-completion">Test Completion</SelectItem>
                        <SelectItem value="specialized-test">Specialized Test</SelectItem>
                        <SelectItem value="multiple-tests">Multiple Tests</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="loyalty">Loyalty Bonus</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {reason === "test-completion" || reason === "specialized-test" || reason === "multiple-tests" ? (
                  <div className="space-y-2">
                    <Label htmlFor="test">Test/Package</Label>
                    <Select>
                      <SelectTrigger id="test">
                        <SelectValue placeholder="Select test or package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cbc">Complete Blood Count</SelectItem>
                        <SelectItem value="lipid">Lipid Profile</SelectItem>
                        <SelectItem value="thyroid">Thyroid Function Test</SelectItem>
                        <SelectItem value="glucose">Blood Glucose</SelectItem>
                        <SelectItem value="liver">Liver Function Test</SelectItem>
                        <SelectItem value="kidney">Kidney Function Test</SelectItem>
                        <SelectItem value="health-package">Health Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Add any additional notes..." className="min-h-[80px]" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notify Patient</div>
                    <div className="text-sm text-muted-foreground">
                      Send an automatic notification to the patient about earned points
                    </div>
                  </div>
                  <Switch checked={notifyPatient} onCheckedChange={setNotifyPatient} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t p-6">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Gift className="mr-2 h-4 w-4" />
                Add Points
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Referral Points History</CardTitle>
                <CardDescription>Track all referral points awarded to patients</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Points
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="search" className="text-sm font-medium">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by patient name, ID..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[180px] space-y-2">
                    <label htmlFor="reason-filter" className="text-sm font-medium">
                      Reason
                    </label>
                    <Select value={reasonFilter} onValueChange={setReasonFilter}>
                      <SelectTrigger id="reason-filter">
                        <SelectValue placeholder="All Reasons" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reasons</SelectItem>
                        <SelectItem value="test">Test Related</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-[180px] space-y-2">
                    <label htmlFor="date-filter" className="text-sm font-medium">
                      Date
                    </label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger id="date-filter">
                        <SelectValue placeholder="All Dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="thisWeek">This Week</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Test/Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Added By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Gift className="h-12 w-12 text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium">No referral points found</h3>
                          <p className="text-muted-foreground">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback>
                                {referral.patientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{referral.patientName}</div>
                              <div className="text-xs text-muted-foreground">{referral.patientId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Gift className="mr-2 h-4 w-4 text-primary" />
                            <span className="font-medium">{referral.points}</span>
                          </div>
                        </TableCell>
                        <TableCell>{referral.reason}</TableCell>
                        <TableCell>{referral.test}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                            <span>
                              {new Date(referral.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{referral.addedBy}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredReferrals.length}</span> of{" "}
                <span className="font-medium">{referralHistory.length}</span> entries
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

