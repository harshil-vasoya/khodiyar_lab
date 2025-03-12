import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import { createAuditLog } from "./audit-service"

export interface Appointment {
  _id?: ObjectId
  userId: ObjectId | string
  serviceId: ObjectId | string
  employeeId?: ObjectId | string | null
  appointmentDate: Date | string
  status: string
  location?: string | null
  amount: number
  paymentStatus: string
  notes?: string | null
  createdAt: Date | string
  updatedAt?: Date | string | null
}

export async function createAppointment(
  appointmentData: Omit<Appointment, "_id" | "createdAt" | "updatedAt">,
  createdBy?: string,
) {
  const client = await clientPromise
  const collection = client.db().collection("appointments")

  // Create appointment object with default values for required fields
  const appointment: Appointment = {
    ...appointmentData,
    status: appointmentData.status || "scheduled",
    paymentStatus: appointmentData.paymentStatus || "pending",
    amount: appointmentData.amount || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Ensure optional fields are properly set
  if (!appointment.location) appointment.location = null
  if (!appointment.notes) appointment.notes = null

  // Convert string IDs to ObjectIds
  if (typeof appointment.userId === "string") {
    appointment.userId = new ObjectId(appointment.userId)
  }
  if (typeof appointment.serviceId === "string") {
    appointment.serviceId = new ObjectId(appointment.serviceId)
  }

  // Only convert employeeId if it's a non-empty string
  if (appointment.employeeId) {
    if (typeof appointment.employeeId === "string" && appointment.employeeId.trim() !== "") {
      try {
        appointment.employeeId = new ObjectId(appointment.employeeId)
      } catch (error) {
        console.error("Invalid employeeId format:", appointment.employeeId)
        // Set to null if invalid
        appointment.employeeId = null
      }
    }
  } else {
    // Ensure it's null if empty or undefined
    appointment.employeeId = null
  }

  // Convert appointmentDate to Date object if it's a string
  if (typeof appointment.appointmentDate === "string") {
    appointment.appointmentDate = new Date(appointment.appointmentDate)
  }

  // Insert appointment
  const result = await collection.insertOne(appointment)

  // Create audit log if createdBy is provided
  if (createdBy) {
    await createAuditLog({
      action: "create",
      resourceType: "appointment",
      resourceId: result.insertedId.toString(),
      userId: createdBy,
      details: {
        appointment: { ...appointment, _id: result.insertedId },
      },
    })
  }

  // Return appointment with ID
  return { ...appointment, _id: result.insertedId }
}

export async function getAppointmentById(id: string) {
  const client = await clientPromise
  const db = client.db()

  // Get appointment with related data
  const appointment = await db.collection("appointments").findOne({ _id: new ObjectId(id) })

  if (!appointment) {
    return null
  }

  // Get related user
  const user = await db.collection("users").findOne({ _id: appointment.userId }, { projection: { passwordHash: 0 } })

  // Get related service
  const service = await db.collection("services").findOne({ _id: appointment.serviceId })

  // Get related employee if exists
  let employee = null
  if (appointment.employeeId) {
    employee = await db
      .collection("employees")
      .findOne({ _id: appointment.employeeId }, { projection: { passwordHash: 0 } })
  }

  return {
    ...appointment,
    user,
    service,
    employee,
  }
}

export async function updateAppointment(id: string, updateData: Partial<Appointment>) {
  const client = await clientPromise
  const collection = client.db().collection("appointments")

  // Remove _id from updateData to avoid the immutable field error
  const { _id, ...dataWithoutId } = updateData

  // Add updated timestamp
  const dataToUpdate = {
    ...dataWithoutId,
    updatedAt: new Date(),
  }

  // Convert string IDs to ObjectIds
  if (dataToUpdate.userId && typeof dataToUpdate.userId === "string") {
    dataToUpdate.userId = new ObjectId(dataToUpdate.userId)
  }
  if (dataToUpdate.serviceId && typeof dataToUpdate.serviceId === "string") {
    dataToUpdate.serviceId = new ObjectId(dataToUpdate.serviceId)
  }

  // Handle employeeId conversion safely
  if (dataToUpdate.employeeId !== undefined) {
    if (dataToUpdate.employeeId) {
      if (typeof dataToUpdate.employeeId === "string" && dataToUpdate.employeeId.trim() !== "") {
        try {
          dataToUpdate.employeeId = new ObjectId(dataToUpdate.employeeId)
        } catch (error) {
          console.error("Invalid employeeId format during update:", dataToUpdate.employeeId)
          dataToUpdate.employeeId = null
        }
      }
    } else {
      dataToUpdate.employeeId = null
    }
  }

  // Convert appointmentDate to Date object if it's a string
  if (dataToUpdate.appointmentDate && typeof dataToUpdate.appointmentDate === "string") {
    dataToUpdate.appointmentDate = new Date(dataToUpdate.appointmentDate)
  }

  // Update appointment
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate })

  // Return updated appointment
  return getAppointmentById(id)
}

export async function deleteAppointment(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("appointments")
  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function getAppointments(
  options: {
    userId?: string
    employeeId?: string
    status?: string
    fromDate?: Date
    toDate?: Date
    limit?: number
    skip?: number
  } = {},
) {
  const client = await clientPromise
  const db = client.db()

  // Build query
  const query: any = {}
  if (options.userId) {
    query.userId = new ObjectId(options.userId)
  }
  if (options.employeeId) {
    try {
      query.employeeId = new ObjectId(options.employeeId)
    } catch (error) {
      console.error("Invalid employeeId in query:", options.employeeId)
      // If invalid, use a non-existent ObjectId to return no results
      query.employeeId = new ObjectId("000000000000000000000000")
    }
  }
  if (options.status) {
    query.status = options.status
  }

  // Add date range filters if provided
  if (options.fromDate || options.toDate) {
    query.appointmentDate = {}
    if (options.fromDate) {
      query.appointmentDate.$gte = options.fromDate
    }
    if (options.toDate) {
      query.appointmentDate.$lte = options.toDate
    }
  }

  // Get total count for pagination
  const totalCount = await db.collection("appointments").countDocuments(query)
  const totalPages = Math.ceil(totalCount / (options.limit || 10))

  // Get appointments
  const appointments = await db
    .collection("appointments")
    .find(query)
    .sort({ appointmentDate: -1 })
    .limit(options.limit || 10)
    .skip(options.skip || 0)
    .toArray()

  // Get related data for each appointment
  const appointmentsWithData = await Promise.all(
    appointments.map(async (appointment) => {
      // Get user
      const user = await db
        .collection("users")
        .findOne({ _id: appointment.userId }, { projection: { name: 1, email: 1, phone: 1 } })

      // Get service
      const service = await db
        .collection("services")
        .findOne({ _id: appointment.serviceId }, { projection: { name: 1, price: 1 } })

      // Get employee if exists
      let employee = null
      if (appointment.employeeId) {
        employee = await db
          .collection("employees")
          .findOne({ _id: appointment.employeeId }, { projection: { name: 1, role: 1 } })
      }

      return {
        ...appointment,
        user,
        service,
        employee,
      }
    }),
  )

  return {
    appointments: appointmentsWithData,
    totalCount,
    totalPages,
    currentPage: Math.floor((options.skip || 0) / (options.limit || 10)) + 1,
  }
}

