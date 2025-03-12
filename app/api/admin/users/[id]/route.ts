import { NextResponse } from "next/server"
import { findUserById, updateUser, deleteUser } from "@/lib/services/user-service"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { logAuditEvent } from "@/lib/services/audit-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await findUserById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password hash before returning
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const userId = params.id

    // Get original user for audit logging
    const originalUser = await findUserById(userId)
    if (!originalUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update the user
    const updatedUser = await updateUser(userId, body)

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "update",
      entityType: "user",
      entityId: userId,
      details: {
        name: originalUser.name,
        email: originalUser.email,
        changes: Object.keys(body).filter((key) => key !== "password"),
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      {
        error: "Failed to update user",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    // Get user for audit logging
    const user = await findUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const result = await deleteUser(userId)

    // Log the audit event
    await logAuditEvent({
      userId: session.user.id,
      action: "delete",
      entityType: "user",
      entityId: userId,
      details: {
        name: user.name,
        email: user.email,
      },
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

