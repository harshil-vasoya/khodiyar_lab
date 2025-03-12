import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import bcrypt from "bcryptjs"
import { logAuditEvent } from "@/lib/services/audit-service"
import { getEmployeeById, updateEmployee, deleteEmployee } from "@/lib/services/employee-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const employee = await getEmployeeById(params.id)

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const updateData = await request.json()

    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }

    const result = await updateEmployee(params.id, updateData)

    if (!result.success) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "update_employee",
      details: {
        employeeId: params.id,
        fields: Object.keys(updateData).filter((key) => key !== "password"),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Employee updated successfully",
    })
  } catch (error) {
    console.error("Error updating employee:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const result = await deleteEmployee(params.id)

    if (!result.success) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "delete_employee",
      details: {
        employeeId: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Employee deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting employee:", error)
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 })
  }
}

