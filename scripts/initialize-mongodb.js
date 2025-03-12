// This is a JavaScript version of the initialization script
require("dotenv").config()
const { MongoClient } = require("mongodb")

async function initializeCollections() {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI environment variable is not set!")
    console.error("Please make sure your .env file contains a valid MONGODB_URI")
    console.error("Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database")
    console.error("\nIf you don't have a MongoDB database yet, you can:")
    console.error("1. Create a free MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas")
    console.error("2. Get your connection string from the Atlas dashboard")
    console.error("3. Add it to your .env file")
    process.exit(1)
  }

  let client
  try {
    console.log("Connecting to MongoDB...")
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()

    console.log("Connected to MongoDB. Initializing collections...")

    // List of collections to ensure exist
    const requiredCollections = ["users", "appointments", "reports", "referrals", "audit_logs", "employees"]

    // Get existing collections
    const collections = await db.listCollections().toArray()
    const existingCollections = collections.map((c) => c.name)

    // Create collections that don't exist
    for (const collection of requiredCollections) {
      if (!existingCollections.includes(collection)) {
        console.log(`Creating collection: ${collection}`)
        await db.createCollection(collection)
      } else {
        console.log(`Collection already exists: ${collection}`)
      }
    }

    // Create indexes for better performance
    console.log("Creating indexes...")

    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ role: 1 })

    // Appointments collection indexes
    await db.collection("appointments").createIndex({ userId: 1 })
    await db.collection("appointments").createIndex({ appointmentDate: 1 })
    await db.collection("appointments").createIndex({ status: 1 })

    // Reports collection indexes
    await db.collection("reports").createIndex({ userId: 1 })
    await db.collection("reports").createIndex({ testDate: 1 })
    await db.collection("reports").createIndex({ status: 1 })

    // Audit logs collection indexes
    await db.collection("audit_logs").createIndex({ timestamp: 1 })
    await db.collection("audit_logs").createIndex({ userId: 1 })
    await db.collection("audit_logs").createIndex({ action: 1 })

    // Employees collection indexes
    await db.collection("employees").createIndex({ email: 1 }, { unique: true })
    await db.collection("employees").createIndex({ role: 1 })

    console.log("MongoDB initialization completed successfully!")
  } catch (error) {
    console.error("Error initializing MongoDB collections:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed.")
    }
  }
}

// Run the initialization
initializeCollections()

