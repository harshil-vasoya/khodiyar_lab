import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    // Build the where clause based on query parameters
    const where: any = {}

    if (userId) {
      where.userId = Number.parseInt(userId)
    }

    if (status) {
      where.status = status
    }

    const reports = await prisma.report.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            service: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        employee: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

// POST create a new report
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.testType || !body.testDate) {
      return NextResponse.json({ error: "User ID, test type and test date are required" }, { status: 400 })
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        userId: Number.parseInt(body.userId),
        appointmentId: body.appointmentId ? Number.parseInt(body.appointmentId) : null,
        employeeId: body.employeeId ? Number.parseInt(body.employeeId) : null,
        testType: body.testType,
        testDate: new Date(body.testDate),
        status: body.status || "pending",
        notes: body.notes || null,
        filePath: body.filePath || null,
        referralPoints: body.referralPoints || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 })
  }
}

