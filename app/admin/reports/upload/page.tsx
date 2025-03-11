"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, FileText, Upload, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function UploadReportPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadSuccess(false)
    setUploadError(false)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // Randomly succeed or fail for demo purposes
      if (Math.random() > 0.2) {
        setUploadSuccess(true)
        setFiles([])
      } else {
        setUploadError(true)
      }
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/reports">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Upload Report</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>Enter the details of the report you want to upload</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input id="patientId" placeholder="Enter patient ID" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="testType">Test Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbc">Complete Blood Count</SelectItem>
                      <SelectItem value="lipid">Lipid Profile</SelectItem>
                      <SelectItem value="liver">Liver Function Test</SelectItem>
                      <SelectItem value="thyroid">Thyroid Profile</SelectItem>
                      <SelectItem value="glucose">Glucose Test</SelectItem>
                      <SelectItem value="kidney">Kidney Function Test</SelectItem>
                      <SelectItem value="hemoglobin">Hemoglobin Test</SelectItem>
                      <SelectItem value="vitaminD">Vitamin D Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="testDate">Test Date</Label>
                  <Input id="testDate" type="date" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Report Status</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="abnormal">Abnormal</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Add any additional notes" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="referralPoints">Referral Points (if applicable)</Label>
                  <Input id="referralPoints" type="number" min="0" placeholder="Enter referral points" />
                </div>
              </div>

              {uploadSuccess && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Report has been uploaded successfully.</AlertDescription>
                </Alert>
              )}

              {uploadError && (
                <Alert className="bg-red-50 text-red-700 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>There was an error uploading the report. Please try again.</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isUploading || files.length === 0}>
                {isUploading ? "Uploading..." : "Upload Report"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Upload report files in PDF, JPG, or PNG format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full text-center">
                  <div className="flex flex-col items-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="file-upload" asChild>
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Browse Files
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

