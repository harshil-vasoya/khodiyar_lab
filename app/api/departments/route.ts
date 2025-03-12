import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET all departments
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db()

    const departments = await db.collection("departments").find({}).toArray()

    return NextResponse.json(departments)
  } catch (error) {
    console.error("Error fetching departments:", error)
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 })
  }
}

// POST create a new department
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Department name is required" }, { status: 400 })
    }

    // Create the department
    const departmentData = {
      name: body.name,
      description: body.description || null,
      active: body.active !== undefined ? body.active : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("departments").insertOne(departmentData)

    const department = {
      ...departmentData,
      _id: result.insertedId,
    }

    return NextResponse.json(department, { status: 201 })
  } catch (error) {
    console.error("Error creating department:", error)
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 })
  }
}

