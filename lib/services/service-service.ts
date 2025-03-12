import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"

export interface Service {
  _id?: ObjectId | string
  name: string
  description?: string | null
  price: number
  departmentId: ObjectId | string
  duration: number
  homeCollection: boolean
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Department {
  _id: ObjectId | string
  name: string
}

export async function getServices() {
  const client = await clientPromise
  const db = client.db()

  const services = await db.collection("services").find({}).toArray()

  // Get department information for each service
  const servicesWithDepartments = await Promise.all(
    services.map(async (service) => {
      let department = null
      if (service.departmentId) {
        department = await db
          .collection("departments")
          .findOne({ _id: new ObjectId(service.departmentId.toString()) }, { projection: { name: 1 } })
      }

      return {
        ...service,
        department: department ? { id: department._id, name: department.name } : null,
      }
    }),
  )

  return servicesWithDepartments
}

export async function getServiceById(id: string) {
  const client = await clientPromise
  const db = client.db()

  const service = await db.collection("services").findOne({ _id: new ObjectId(id) })

  if (!service) {
    return null
  }

  // Get department information
  let department = null
  if (service.departmentId) {
    department = await db
      .collection("departments")
      .findOne({ _id: new ObjectId(service.departmentId.toString()) }, { projection: { name: 1 } })
  }

  return {
    ...service,
    department: department ? { id: department._id, name: department.name } : null,
  }
}

export async function createService(serviceData: Omit<Service, "_id" | "createdAt" | "updatedAt">) {
  const client = await clientPromise
  const db = client.db()

  // Ensure all required fields are present and have the correct types
  const newService = {
    name: serviceData.name,
    description: serviceData.description || null,
    price: Number(serviceData.price),
    departmentId:
      typeof serviceData.departmentId === "string" ? new ObjectId(serviceData.departmentId) : serviceData.departmentId,
    duration: Number(serviceData.duration) || 30,
    homeCollection: Boolean(serviceData.homeCollection),
    active: serviceData.active !== undefined ? Boolean(serviceData.active) : true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    const result = await db.collection("services").insertOne(newService)
    return { ...newService, _id: result.insertedId }
  } catch (error) {
    console.error("Error creating service:", error)
    throw error
  }
}

export async function updateService(id: string, updateData: Partial<Service>) {
  const client = await clientPromise
  const db = client.db()

  // Ensure proper data types for update
  const dataToUpdate: any = {
    updatedAt: new Date(),
  }

  if (updateData.name !== undefined) dataToUpdate.name = updateData.name
  if (updateData.description !== undefined) dataToUpdate.description = updateData.description
  if (updateData.price !== undefined) dataToUpdate.price = Number(updateData.price)
  if (updateData.duration !== undefined) dataToUpdate.duration = Number(updateData.duration)
  if (updateData.homeCollection !== undefined) dataToUpdate.homeCollection = Boolean(updateData.homeCollection)
  if (updateData.active !== undefined) dataToUpdate.active = Boolean(updateData.active)

  // Handle departmentId conversion
  if (updateData.departmentId) {
    dataToUpdate.departmentId =
      typeof updateData.departmentId === "string" ? new ObjectId(updateData.departmentId) : updateData.departmentId
  }

  try {
    await db.collection("services").updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate })
    return getServiceById(id)
  } catch (error) {
    console.error("Error updating service:", error)
    throw error
  }
}

export async function deleteService(id: string) {
  const client = await clientPromise
  const db = client.db()

  try {
    return db.collection("services").deleteOne({ _id: new ObjectId(id) })
  } catch (error) {
    console.error("Error deleting service:", error)
    throw error
  }
}

export async function getDepartments() {
  const client = await clientPromise
  const db = client.db()

  return db.collection("departments").find({}).toArray()
}

