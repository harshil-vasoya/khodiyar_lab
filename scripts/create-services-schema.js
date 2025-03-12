require("dotenv").config()
const { MongoClient } = require("mongodb")

async function createServicesSchema() {
  let client

  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not set")
    }

    client = new MongoClient(uri)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Check if services collection exists
    const collections = await db.listCollections({ name: "services" }).toArray()

    if (collections.length > 0) {
      console.log("Services collection already exists. Dropping it to recreate...")
      await db.collection("services").drop()
    }

    // Create services collection with schema validation
    await db.createCollection("services", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "departmentId", "duration", "homeCollection", "active", "createdAt", "updatedAt"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name of the service - required",
            },
            description: {
              bsonType: ["string", "null"],
              description: "Description of the service - optional",
            },
            price: {
              bsonType: "number",
              description: "Price of the service - required",
            },
            departmentId: {
              bsonType: "objectId",
              description: "Department ID - required",
            },
            duration: {
              bsonType: "number",
              description: "Duration in minutes - required",
            },
            homeCollection: {
              bsonType: "bool",
              description: "Whether home collection is available - required",
            },
            active: {
              bsonType: "bool",
              description: "Whether the service is active - required",
            },
            createdAt: {
              bsonType: "date",
              description: "Creation timestamp - required",
            },
            updatedAt: {
              bsonType: "date",
              description: "Last update timestamp - required",
            },
          },
        },
      },
    })

    console.log("Services collection created with schema validation")

    // Create index on name for faster searches
    await db.collection("services").createIndex({ name: 1 }, { unique: true })
    console.log("Index created on name field")

    console.log("Services schema setup completed successfully")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}

createServicesSchema()

