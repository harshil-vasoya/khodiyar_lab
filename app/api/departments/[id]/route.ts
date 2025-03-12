import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db()

    const department = await db.collection("departments").findOne({
      _id: new ObjectId(params.id),
    })

    if (!department) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json(department)
  } catch (error) {
    console.error("Error fetching department:", error)
    return NextResponse.json({ error: "Failed to fetch department" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db()

    // Validate required fields
    if (body.name === "") {
      return NextResponse.json({ error: "Department name cannot be empty" }, { status: 400 })
    }

    const updateData = {
      ...(body.name && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.active !== undefined && { active: body.active }),
      updatedAt: new Date(),
    }

    const result = await db.collection("departments").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    const updatedDepartment = await db.collection("departments").findOne({
      _id: new ObjectId(params.id),
    })

    return NextResponse.json(updatedDepartment)
  } catch (error) {
    console.error("Error updating department:", error)
    return NextResponse.json({ error: "Failed to update department" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Check if there are any services using this department
    const servicesCount = await db.collection("services").countDocuments({
      departmentId: params.id,
    })

    if (servicesCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete department with associated services. Please reassign or delete the services first.",
        },
        { status: 400 },
      )
    }

    const result = await db.collection("departments").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting department:", error)
    return NextResponse.json({ error: "Failed to delete department" }, { status: 500 })
  }
}

