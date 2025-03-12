// CommonJS version for direct Node.js execution
require("dotenv").config()
const { MongoClient } = require("mongodb")
const bcrypt = require("bcrypt")

async function seedAdminAndEmployeeUsers() {
  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not set in your environment variables")
    console.log("Please set up your .env file with the correct MongoDB URI")
    process.exit(1)
  }

  console.log("Connecting to MongoDB...")
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB successfully")

    const db = client.db()
    const usersCollection = db.collection("users")

    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@example.com" })
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("Admin@123!", 10)
      await usersCollection.insertOne({
        name: "Admin User",
        email: "admin@example.com",
        passwordHash: hashedPassword,
        role: "admin",
        registeredDate: new Date(),
        lastActive: new Date(),
      })
      console.log("Admin user created successfully")
    } else {
      console.log("Admin user already exists")
    }

    // Check if employee user already exists
    const existingEmployee = await usersCollection.findOne({ email: "employee@example.com" })
    if (!existingEmployee) {
      // Create employee user
      const hashedPassword = await bcrypt.hash("Employee@123!", 10)
      await usersCollection.insertOne({
        name: "Employee User",
        email: "employee@example.com",
        passwordHash: hashedPassword,
        role: "employee",
        registeredDate: new Date(),
        lastActive: new Date(),
      })
      console.log("Employee user created successfully")
    } else {
      console.log("Employee user already exists")
    }

    console.log("Admin and employee users seeded successfully")
  } catch (error) {
    console.error("Error seeding admin and employee users:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedAdminAndEmployeeUsers()

