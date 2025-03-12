import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { getAppointments, createAppointment } from "@/lib/services/appointment-service"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const options: any = {
      limit: searchParams.has("limit") ? Number.parseInt(searchParams.get("limit") as string) : 10,
      skip: searchParams.has("skip") ? Number.parseInt(searchParams.get("skip") as string) : 0,
    }

    if (searchParams.has("status")) {
      options.status = searchParams.get("status")
    }

    if (searchParams.has("userId")) {
      options.userId = searchParams.get("userId")
    }

    if (searchParams.has("employeeId")) {
      options.employeeId = searchParams.get("employeeId")
    }

    if (searchParams.has("fromDate")) {
      options.fromDate = new Date(searchParams.get("fromDate") as string)
    }

    if (searchParams.has("toDate")) {
      options.toDate = new Date(searchParams.get("toDate") as string)
    }

    const result = await getAppointments(options)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.serviceId || !body.appointmentDate) {
      return NextResponse.json({ error: "User ID, service ID, and appointment date are required" }, { status: 400 })
    }

    // Handle empty employeeId
    if (body.employeeId === "" || body.employeeId === undefined) {
      body.employeeId = null
    }

    // Ensure required fields have values
    body.status = body.status || "scheduled"
    body.paymentStatus = body.paymentStatus || "pending"
    body.amount = body.amount || 0

    // Ensure optional fields are properly set
    if (!body.location) body.location = null
    if (!body.notes) body.notes = null

    // Create appointment
    const appointment = await createAppointment(body, session.user.id)

    // Return the created appointment
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json(
      {
        error: "Failed to create appointment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

