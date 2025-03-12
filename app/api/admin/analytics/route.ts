import { NextResponse } from "next/server"
import { getDashboardAnalytics, getUserAnalytics, getReportAnalytics } from "@/lib/services/analytics-service"
// import {
//   getMockDashboardAnalytics,
//   getMockUserAnalytics,
//   getMockReportAnalytics,
// } from "@/lib/services/mock-analytics-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Flag to use mock data (set to true for development without MongoDB)
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true" || !process.env.MONGODB_URI

export async function GET(request: Request) {
  try {
    console.log("Analytics API route called")

    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)
    console.log("Session:", session ? "exists" : "null")

    if (!session) {
      console.log("Authentication failed: No session")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      console.log("Authorization failed: User is not admin", session.user.role)
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "dashboard"
    console.log("Analytics type requested:", type)

    let data

    if (USE_MOCK_DATA) {
      // Use mock data
      switch (type) {
        case "users":
          data = getUserAnalytics()
          break
        case "reports":
          data = getReportAnalytics()
          break
        case "dashboard":
        default:
          data = getDashboardAnalytics()
          break
      }
      console.log("Mock data used for analytics")
    } else {
      // Use real data from MongoDB
      switch (type) {
        case "users":
          data = await getUserAnalytics()
          break
        case "reports":
          data = await getReportAnalytics()
          break
        case "dashboard":
        default:
          data = await getDashboardAnalytics()
          break
      }
      console.log("Real data fetched for analytics")
    }

    console.log("Analytics data fetched successfully")
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error in analytics API route:", error)

    // Return a more detailed error response with mock data as fallback
    const mockData = getDashboardAnalytics()

    return NextResponse.json(
      {
        error: error.message || "Failed to fetch analytics data",
        details: error.stack,
        defaultData: mockData,
      },
      { status: 500 },
    )
  }
}

