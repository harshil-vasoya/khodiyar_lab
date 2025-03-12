import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import { hash, compare } from "bcrypt"

export interface User {
  _id?: ObjectId | string
  name: string
  email: string
  passwordHash?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  dob?: Date
  gender?: string
  registeredDate?: Date
  lastActive?: Date
  status?: string
  referralPoints?: number
  role?: string
}

// Password validation function
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one capital letter"
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return "Password must contain at least one special character"
  }
  return null
}

export async function findUserByEmail(email: string) {
  const client = await clientPromise
  const collection = client.db().collection("users")
  return collection.findOne({ email })
}

export async function findUserById(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("users")
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function createUser(userData: Omit<User, "_id" | "passwordHash"> & { password: string }) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  // Check if user already exists
  const existingUser = await collection.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Validate password
  const passwordError = validatePassword(userData.password)
  if (passwordError) {
    throw new Error(passwordError)
  }

  // Hash the password
  const passwordHash = await hash(userData.password, 10)

  // Create user object
  const user: User = {
    name: userData.name,
    email: userData.email,
    passwordHash,
    phone: userData.phone,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    pincode: userData.pincode,
    dob: userData.dob,
    gender: userData.gender,
    registeredDate: new Date(),
    status: "active",
    referralPoints: 0,
    role: userData.role || "user",
  }

  // Insert user
  const result = await collection.insertOne(user)

  // Return user without password
  const { passwordHash: _, ...userWithoutPassword } = user
  return { ...userWithoutPassword, _id: result.insertedId }
}

export async function updateUser(id: string, userData: Partial<User> & { password?: string }) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  // Prepare update data
  const updateData: Partial<User> = { ...userData }

  // If password is provided, validate and hash it
  if (userData.password) {
    const passwordError = validatePassword(userData.password)
    if (passwordError) {
      throw new Error(passwordError)
    }
    updateData.passwordHash = await hash(userData.password, 10)
    delete updateData.password
  }

  // Update user
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

  // Return updated user
  return findUserById(id)
}

export async function deleteUser(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("users")
  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function getAllUsers(options: { limit?: number; skip?: number; status?: string; role?: string } = {}) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  // Build query
  const query: any = {}
  if (options.status) {
    query.status = options.status
  }
  if (options.role) {
    query.role = options.role
  }

  // Execute query
  const users = await collection
    .find(query)
    .limit(options.limit || 100)
    .skip(options.skip || 0)
    .project({ passwordHash: 0 }) // Exclude password
    .toArray()

  return users
}

export async function verifyUserCredentials(email: string, password: string) {
  try {
    console.log(`Verifying credentials for email: ${email}`)
    const user = await findUserByEmail(email)

    if (!user) {
      console.log(`User not found: ${email}`)
      return null
    }

    if (!user.passwordHash) {
      console.log(`User has no password hash: ${email}`)
      return null
    }

    console.log(`Comparing password for user: ${email}`)
    const isValid = await compare(password, user.passwordHash)

    if (!isValid) {
      console.log(`Invalid password for user: ${email}`)
      throw new Error("Incorrect password")
    }

    console.log(`Valid credentials for user: ${email} with role: ${user.role || "user"}`)
    // Return user without password
    const { passwordHash, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error(`Error verifying credentials:`, error)
    throw error
  }
}

