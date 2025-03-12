import "next-auth"
import type { ObjectId } from "mongodb"

declare module "next-auth" {
  interface User {
    _id: ObjectId | string
    name: string
    email: string
    role?: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

