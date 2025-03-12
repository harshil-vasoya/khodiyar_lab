require("dotenv").config()
const { MongoClient } = require("mongodb")

async function createAppointmentsSchema() {
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

    // Check if appointments collection exists
    const collections = await db.listCollections({ name: "appointments" }).toArray()

    if (collections.length > 0) {
      console.log("Appointments collection already exists. Dropping it to recreate...")
      await db.collection("appointments").drop()
    }

    // Create appointments collection with schema validation
    await db.createCollection("appointments", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "serviceId", "appointmentDate", "status", "amount", "paymentStatus", "createdAt"],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "User ID - required",
            },
            serviceId: {
              bsonType: "objectId",
              description: "Service ID - required",
            },
            employeeId: {
              bsonType: ["objectId", "null"],
              description: "Employee ID - optional",
            },
            appointmentDate: {
              bsonType: ["date", "string"],
              description: "Appointment date and time - required",
            },
            status: {
              bsonType: "string",
              description: "Status of the appointment - required",
            },
            location: {
              bsonType: ["string", "null"],
              description: "Location of the appointment - optional",
            },
            amount: {
              bsonType: "number",
              description: "Amount to be paid - required",
            },
            paymentStatus: {
              bsonType: "string",
              description: "Payment status - required",
            },
            notes: {
              bsonType: ["string", "null"],
              description: "Additional notes - optional",
            },
            createdAt: {
              bsonType: ["date", "string"],
              description: "Creation timestamp - required",
            },
            updatedAt: {
              bsonType: ["date", "string", "null"],
              description: "Last update timestamp - optional",
            },
          },
        },
      },
    })

    console.log("Appointments collection created with schema validation")

    // Create indexes
    await db.collection("appointments").createIndex({ userId: 1 })
    await db.collection("appointments").createIndex({ serviceId: 1 })
    await db.collection("appointments").createIndex({ employeeId: 1 })
    await db.collection("appointments").createIndex({ appointmentDate: 1 })
    await db.collection("appointments").createIndex({ status: 1 })

    console.log("Indexes created for appointments collection")
    console.log("Appointments schema setup completed successfully")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}

createAppointmentsSchema()

