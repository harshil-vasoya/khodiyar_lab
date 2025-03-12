import { NextResponse } from "next/server"
import { createReport, getAllReports } from "@/lib/services/report-service"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const skip = searchParams.get("skip") ? Number.parseInt(searchParams.get("skip")!) : undefined
    const status = searchParams.get("status") || undefined
    const testType = searchParams.get("testType") || undefined
    const department = searchParams.get("department") || undefined

    const fromDateStr = searchParams.get("fromDate")
    const toDateStr = searchParams.get("toDate")

    const fromDate = fromDateStr ? new Date(fromDateStr) : undefined
    const toDate = toDateStr ? new Date(toDateStr) : undefined

    const reports = await getAllReports({
      limit,
      skip,
      status,
      testType,
      department,
      fromDate,
      toDate,
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
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
    if (!body.userId || !body.testType || !body.testDate) {
      return NextResponse.json(
        {
          error: "User ID, test type and test date are required",
        },
        { status: 400 },
      )
    }

    const report = await createReport(body, session.user.id)

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json(
      {
        error: "Failed to create report",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

