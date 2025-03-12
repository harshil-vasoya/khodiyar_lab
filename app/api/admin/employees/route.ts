import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import bcrypt from "bcryptjs"
import { logAuditEvent } from "@/lib/services/audit-service"
import { getEmployees, createEmployee } from "@/lib/services/employee-service"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Parse query parameters
    const url = new URL(request.url)
    const limit = Number.parseInt(url.searchParams.get("limit") || "100")
    const skip = Number.parseInt(url.searchParams.get("skip") || "0")
    const departmentId = url.searchParams.get("departmentId") || undefined
    const status = url.searchParams.get("status") || undefined
    const role = url.searchParams.get("role") || undefined
    const sortBy = url.searchParams.get("sortBy") || "name"
    const sortOrder = (url.searchParams.get("sortOrder") as "asc" | "desc") || "asc"

    // Get employees with the specified options
    const result = await getEmployees({
      departmentId,
      status,
      role,
      limit,
      skip,
      sortBy,
      sortOrder,
    })

    return NextResponse.json(result.employees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const {
      name,
      email,
      password,
      permissions = [],
      status = "active",
      departmentId,
      specializedRole,
    } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the employee
    const result = await createEmployee({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      status,
      permissions,
      departmentId,
      specializedRole,
      registeredDate: new Date(),
    })

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "create_employee",
      details: {
        employeeId: result.id,
        name,
        email,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Employee created successfully",
      employeeId: result.id,
    })
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}

