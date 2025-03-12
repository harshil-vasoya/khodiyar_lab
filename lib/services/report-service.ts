import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import { logAuditEvent } from "./audit-service"

export interface Report {
  _id?: ObjectId | string
  userId: ObjectId | string
  appointmentId?: ObjectId | string
  employeeId?: ObjectId | string
  testType: string
  testDate: Date
  uploadedAt: Date
  status: string
  results?: any
  notes?: string
  filePath?: string
  fileType?: string
  fileSize?: number
  referringDoctor?: string
  department?: string
  referralPoints?: number
}

export async function findReportById(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("reports")
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function createReport(reportData: Omit<Report, "_id" | "uploadedAt">, creatorId: string) {
  const client = await clientPromise
  const collection = client.db().collection("reports")

  // Create report object
  const report: Report = {
    ...reportData,
    userId: typeof reportData.userId === "string" ? new ObjectId(reportData.userId) : reportData.userId,
    appointmentId: reportData.appointmentId
      ? typeof reportData.appointmentId === "string"
        ? new ObjectId(reportData.appointmentId)
        : reportData.appointmentId
      : undefined,
    employeeId: reportData.employeeId
      ? typeof reportData.employeeId === "string"
        ? new ObjectId(reportData.employeeId)
        : reportData.employeeId
      : undefined,
    uploadedAt: new Date(),
    status: reportData.status || "pending",
  }

  // Insert report
  const result = await collection.insertOne(report)

  // Log the audit event
  await logAuditEvent({
    userId: creatorId,
    action: "create",
    entityType: "report",
    entityId: result.insertedId.toString(),
    details: {
      testType: report.testType,
      userId: report.userId.toString(),
      status: report.status,
    },
  })

  return { ...report, _id: result.insertedId }
}

export async function updateReport(id: string, reportData: Partial<Report>, updaterId: string) {
  const client = await clientPromise
  const collection = client.db().collection("reports")

  // Get the original report for audit logging
  const originalReport = await findReportById(id)
  if (!originalReport) {
    throw new Error("Report not found")
  }

  // Update report
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: reportData })

  // Log the audit event
  await logAuditEvent({
    userId: updaterId,
    action: "update",
    entityType: "report",
    entityId: id,
    details: {
      testType: originalReport.testType,
      userId: originalReport.userId.toString(),
      changes: Object.keys(reportData),
    },
  })

  // Return updated report
  return findReportById(id)
}

export async function deleteReport(id: string, deleterId: string) {
  const client = await clientPromise
  const collection = client.db().collection("reports")

  // Get the report for audit logging
  const report = await findReportById(id)
  if (!report) {
    throw new Error("Report not found")
  }

  const result = await collection.deleteOne({ _id: new ObjectId(id) })

  // Log the audit event
  await logAuditEvent({
    userId: deleterId,
    action: "delete",
    entityType: "report",
    entityId: id,
    details: {
      testType: report.testType,
      userId: report.userId.toString(),
    },
  })

  return result
}

export async function getReportsByUserId(userId: string) {
  const client = await clientPromise
  const collection = client.db().collection("reports")

  return collection
    .find({ userId: new ObjectId(userId) })
    .sort({ uploadedAt: -1 })
    .toArray()
}

export async function getAllReports(
  options: {
    limit?: number
    skip?: number
    status?: string
    testType?: string
    department?: string
    fromDate?: Date
    toDate?: Date
  } = {},
) {
  const client = await clientPromise
  const collection = client.db().collection("reports")

  // Build query
  const query: any = {}
  if (options.status) {
    query.status = options.status
  }
  if (options.testType) {
    query.testType = options.testType
  }
  if (options.department) {
    query.department = options.department
  }
  if (options.fromDate || options.toDate) {
    query.testDate = {}
    if (options.fromDate) {
      query.testDate.$gte = options.fromDate
    }
    if (options.toDate) {
      query.testDate.$lte = options.toDate
    }
  }

  // Execute query
  const reports = await collection
    .find(query)
    .limit(options.limit || 100)
    .skip(options.skip || 0)
    .sort({ uploadedAt: -1 })
    .toArray()

  return reports
}

