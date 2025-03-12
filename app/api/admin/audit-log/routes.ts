import { NextResponse } from "next/server"
import { getAuditLogs } from "@/lib/services/audit-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)

    const options: any = {}

    if (searchParams.has("userId")) {
      options.userId = searchParams.get("userId")
    }

    if (searchParams.has("action")) {
      options.action = searchParams.get("action")
    }

    if (searchParams.has("entityType")) {
      options.entityType = searchParams.get("entityType")
    }

    if (searchParams.has("entityId")) {
      options.entityId = searchParams.get("entityId")
    }

    if (searchParams.has("startDate")) {
      options.startDate = new Date(searchParams.get("startDate") as string)
    }

    if (searchParams.has("endDate")) {
      options.endDate = new Date(searchParams.get("endDate") as string)
    }

    if (searchParams.has("limit")) {
      options.limit = Number.parseInt(searchParams.get("limit") as string)
    }

    if (searchParams.has("skip")) {
      options.skip = Number.parseInt(searchParams.get("skip") as string)
    }

    const logs = await getAuditLogs(options)

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}

