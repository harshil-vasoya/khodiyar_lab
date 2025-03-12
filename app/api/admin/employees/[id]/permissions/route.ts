import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { updateEmployeePermissions, AVAILABLE_PERMISSIONS } from "@/lib/services/employee-service"
import { logAuditEvent } from "@/lib/services/audit-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Return the list of available permissions
    return NextResponse.json({
      availablePermissions: AVAILABLE_PERMISSIONS,
    })
  } catch (error) {
    console.error("Error fetching permissions:", error)
    return NextResponse.json({ error: "Failed to fetch permissions" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const employeeId = params.id
    const { permissions } = await request.json()

    if (!Array.isArray(permissions)) {
      return NextResponse.json({ error: "Invalid permissions format" }, { status: 400 })
    }

    const result = await updateEmployeePermissions(employeeId, permissions)

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "update_employee_permissions",
      details: {
        employeeId,
        permissions: result.permissions,
      },
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error updating employee permissions:", error)
    return NextResponse.json({ error: error.message || "Failed to update permissions" }, { status: 500 })
  }
}

