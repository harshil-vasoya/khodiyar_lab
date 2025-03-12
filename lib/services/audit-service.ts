import clientPromise from "../mongodb"
import { ObjectId } from "mongodb"

export interface AuditLog {
  _id?: ObjectId
  userId: ObjectId | string
  userName: string
  action: string
  entityType: string
  entityId?: ObjectId | string
  details?: any
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

export async function createAuditLog(logData: Omit<AuditLog, "_id" | "timestamp">) {
  const client = await clientPromise
  const db = client.db()

  const auditLog: AuditLog = {
    ...logData,
    userName: "System", // Default userName if not provided
    timestamp: new Date(),
  }

  const result = await db.collection("auditLogs").insertOne(auditLog)
  return { ...auditLog, _id: result.insertedId }
}

export async function getAuditLogs(options: {
  userId?: string
  action?: string
  entityType?: string
  entityId?: string
  startDate?: Date
  endDate?: Date
  limit?: number
  skip?: number
}) {
  const client = await clientPromise
  const db = client.db()

  // Build query
  const query: any = {}

  if (options.userId) {
    query.userId = new ObjectId(options.userId)
  }

  if (options.action) {
    query.action = options.action
  }

  if (options.entityType) {
    query.entityType = options.entityType
  }

  if (options.entityId) {
    query.entityId = new ObjectId(options.entityId)
  }

  if (options.startDate || options.endDate) {
    query.timestamp = {}

    if (options.startDate) {
      query.timestamp.$gte = options.startDate
    }

    if (options.endDate) {
      query.timestamp.$lte = options.endDate
    }
  }

  const logs = await db
    .collection("auditLogs")
    .find(query)
    .sort({ timestamp: -1 })
    .limit(options.limit || 100)
    .skip(options.skip || 0)
    .toArray()

  return logs
}

export async function logAuditEvent(logData: Omit<AuditLog, "_id" | "timestamp" | "userName">) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Fetch user information
    let userName = "System"
    try {
      const user = await db.collection("users").findOne({ _id: new ObjectId(logData.userId) })
      userName = user?.name || "System"
    } catch (userError) {
      console.warn("Could not fetch user for audit log:", userError)
    }

    const auditLog: AuditLog = {
      ...logData,
      userId: new ObjectId(logData.userId),
      userName: userName,
      timestamp: new Date(),
    }

    await db.collection("auditLogs").insertOne(auditLog)
  } catch (error) {
    console.error("Error creating audit log:", error)
  }
}

