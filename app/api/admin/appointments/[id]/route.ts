import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { getAppointmentById, updateAppointment, deleteAppointment } from "@/lib/services/appointment-service"
import { createAuditLog } from "@/lib/services/audit-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appointment = await getAppointmentById(params.id)

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error fetching appointment:", error)
    return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Get the original appointment for audit logging
    const originalAppointment = await getAppointmentById(params.id)

    if (!originalAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    const updatedAppointment = await updateAppointment(params.id, body)

    // Create audit log
    await createAuditLog({
      action: "update",
      resourceType: "appointment",
      resourceId: params.id,
      userId: session.user.id,
      details: {
        before: originalAppointment,
        after: updatedAppointment,
        changes: Object.keys(body),
      },
    })

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json(
      {
        error: "Failed to update appointment",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the appointment before deleting for audit log
    const appointment = await getAppointmentById(params.id)

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    await deleteAppointment(params.id)

    // Create audit log
    await createAuditLog({
      action: "delete",
      resourceType: "appointment",
      resourceId: params.id,
      userId: session.user.id,
      details: {
        appointment,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting appointment:", error)
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 })
  }
}

