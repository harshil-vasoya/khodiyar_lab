import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Check if the request is for an admin route
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  // Check if the request is for an employee route
  const isEmployeeRoute = request.nextUrl.pathname.startsWith("/employee")

  // Check if the request is for an API route that should be protected
  const isProtectedApiRoute =
    request.nextUrl.pathname.startsWith("/api/admin") || request.nextUrl.pathname.startsWith("/api/employee")

  // If the user is not authenticated and trying to access a protected route
  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`, request.url),
      )
    }

    if (isEmployeeRoute) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`, request.url),
      )
    }

    if (isProtectedApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  // If the user is authenticated but doesn't have the right role
  if (token) {
    // Check if user is trying to access admin routes but is not an admin
    if (isAdminRoute && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Check if user is trying to access employee routes but is not an employee
    if (isEmployeeRoute && token.role !== "employee") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Check if user is trying to access protected API routes but doesn't have the right role
    if (request.nextUrl.pathname.startsWith("/api/admin") && token.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    if (request.nextUrl.pathname.startsWith("/api/employee") && token.role !== "employee") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/api/admin/:path*", "/api/employee/:path*", "/dashboard/:path*"],
}

