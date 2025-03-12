import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { operation, collection, ids, data } = body

    if (!operation || !collection || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const collectionRef = db.collection(collection)

    // Convert string IDs to ObjectIds
    const objectIds = ids.map((id) => new ObjectId(id))

    let result

    switch (operation) {
      case "update":
        if (!data) {
          return NextResponse.json({ error: "Data is required for update operation" }, { status: 400 })
        }
        result = await collectionRef.updateMany({ _id: { $in: objectIds } }, { $set: data })
        break

      case "delete":
        result = await collectionRef.deleteMany({ _id: { $in: objectIds } })
        break

      case "archive":
        result = await collectionRef.updateMany(
          { _id: { $in: objectIds } },
          { $set: { status: "archived", archivedAt: new Date() } },
        )
        break

      default:
        return NextResponse.json({ error: "Invalid operation" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      operation,
      collection,
      affectedCount: result.modifiedCount || result.deletedCount || 0,
    })
  } catch (error) {
    console.error("Error performing batch operation:", error)
    return NextResponse.json({ error: "Failed to perform batch operation" }, { status: 500 })
  }
}

