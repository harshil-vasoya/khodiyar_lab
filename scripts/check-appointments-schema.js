require("dotenv").config()
const { MongoClient } = require("mongodb")

async function checkAppointmentsSchema() {
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
      console.log("Appointments collection exists")

      // Check for validation rules
      const collInfo = await db.command({ listCollections: 1, filter: { name: "appointments" } })

      if (collInfo.cursor.firstBatch[0].options && collInfo.cursor.firstBatch[0].options.validator) {
        console.log("Validation rules found:")
        console.log(JSON.stringify(collInfo.cursor.firstBatch[0].options.validator, null, 2))
      } else {
        console.log("No validation rules found for appointments collection")
      }

      // Check sample document structure
      const sampleAppointment = await db.collection("appointments").findOne({})
      if (sampleAppointment) {
        console.log("\nSample appointment document structure:")
        console.log(JSON.stringify(sampleAppointment, null, 2))
      } else {
        console.log("\nNo appointment documents found")
      }
    } else {
      console.log("Appointments collection does not exist")
    }
  } catch (error) {
    console.error("Error:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}

checkAppointmentsSchema()

