import { NextResponse } from "next/server"
import { createUser, getAllUsers } from "@/lib/services/user-service"

// GET all users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const skip = searchParams.get("skip") ? Number.parseInt(searchParams.get("skip")!) : undefined
    const status = searchParams.get("status") || undefined

    const users = await getAllUsers({ limit, skip, status })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Create the user
    const user = await createUser(body)

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error("Error creating user:", error)

    if (error.message === "User already exists") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

