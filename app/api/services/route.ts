import { NextResponse } from "next/server"
import { getServices, createService } from "@/lib/services/service-service"

// GET all services
export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

// POST create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || body.price === undefined || !body.departmentId) {
      return NextResponse.json({ error: "Name, price and department ID are required" }, { status: 400 })
    }

    // Create the service with proper type handling
    const serviceData = {
      name: body.name,
      description: body.description || null,
      price: Number(body.price),
      departmentId: body.departmentId,
      duration: body.duration ? Number(body.duration) : 30,
      homeCollection: Boolean(body.homeCollection),
      active: body.active !== undefined ? Boolean(body.active) : true,
    }

    try {
      const service = await createService(serviceData)
      return NextResponse.json(service, { status: 201 })
    } catch (error) {
      console.error("Error creating service:", error)
      return NextResponse.json(
        {
          error: "Failed to create service",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

