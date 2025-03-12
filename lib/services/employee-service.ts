import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const AVAILABLE_PERMISSIONS = [
  "view_appointments",
  "edit_appointments",
  "create_appointments",
  "delete_appointments",
  "view_reports",
  "upload_reports",
  "edit_reports",
  "delete_reports",
  "view_users",
  "edit_users",
  "create_users",
  "delete_users",
  "view_employees",
  "edit_employees",
  "create_employees",
  "delete_employees",
  "view_settings",
  "edit_settings",
]

export async function getEmployees(
  options: {
    departmentId?: string
    status?: string
    role?: string
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  } = {},
) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Build the query
    const query: any = {}

    if (options.departmentId) {
      query.departmentId = new ObjectId(options.departmentId)
    }

    if (options.status) {
      query.status = options.status
    }

    if (options.role && options.role !== "employee") {
      query.specializedRole = options.role
    }

    // Build the sort options
    const sortOptions: any = {}
    sortOptions[options.sortBy || "name"] = options.sortOrder === "desc" ? -1 : 1

    // Execute the query
    const employees = await db
      .collection("employees")
      .find(query)
      .sort(sortOptions)
      .skip(options.skip || 0)
      .limit(options.limit || 100)
      .toArray()

    // Get the total count for pagination
    const totalCount = await db.collection("employees").countDocuments(query)

    return {
      employees,
      totalCount,
      totalPages: Math.ceil(totalCount / (options.limit || 100)),
      currentPage: Math.floor((options.skip || 0) / (options.limit || 100)) + 1,
    }
  } catch (error) {
    console.error("Error in getEmployees:", error)
    throw error
  }
}

export async function getEmployeeById(id: string) {
  try {
    const client = await clientPromise
    const db = client.db()

    const employee = await db.collection("employees").findOne({ _id: new ObjectId(id) })

    return employee
  } catch (error) {
    console.error("Error in getEmployeeById:", error)
    throw error
  }
}

export async function createEmployee(employeeData: any) {
  try {
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("employees").insertOne({
      ...employeeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return {
      id: result.insertedId.toString(),
      success: true,
    }
  } catch (error) {
    console.error("Error in createEmployee:", error)
    throw error
  }
}

export async function updateEmployee(id: string, updateData: any) {
  try {
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("employees").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    return {
      success: result.matchedCount > 0,
      modified: result.modifiedCount > 0,
    }
  } catch (error) {
    console.error("Error in updateEmployee:", error)
    throw error
  }
}

export async function deleteEmployee(id: string) {
  try {
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("employees").deleteOne({
      _id: new ObjectId(id),
    })

    return {
      success: result.deletedCount > 0,
    }
  } catch (error) {
    console.error("Error in deleteEmployee:", error)
    throw error
  }
}

export async function updateEmployeePermissions(employeeId: string, permissions: string[]) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Validate permissions
    if (!Array.isArray(permissions)) {
      throw new Error("Permissions must be an array")
    }

    // Update employee permissions
    const result = await db.collection("employees").updateOne(
      { _id: new ObjectId(employeeId) },
      {
        $set: {
          permissions: permissions,
          updatedAt: new Date(),
        },
      },
    )

    if (result.modifiedCount === 0) {
      throw new Error("Employee not found or permissions not updated")
    }

    return {
      success: true,
      message: "Employee permissions updated successfully",
      employeeId,
      permissions,
    }
  } catch (error) {
    console.error("Error updating employee permissions:", error)
    throw error
  }
}

