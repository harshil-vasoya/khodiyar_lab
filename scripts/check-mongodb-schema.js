require("dotenv").config()
const { MongoClient } = require("mongodb")

async function checkMongoDBSchema() {
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

    // List all collections
    const collections = await db.listCollections().toArray()
    console.log("Collections in database:")
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`)
    })

    // Check for validation rules on services collection
    if (collections.some((c) => c.name === "services")) {
      console.log("\nChecking validation rules for services collection:")
      const collInfo = await db.command({ listCollections: 1, filter: { name: "services" } })

      if (collInfo.cursor.firstBatch[0].options && collInfo.cursor.firstBatch[0].options.validator) {
        console.log("Validation rules found:")
        console.log(JSON.stringify(collInfo.cursor.firstBatch[0].options.validator, null, 2))
      } else {
        console.log("No validation rules found for services collection")
      }
    }

    // Check sample document structure
    if (collections.some((c) => c.name === "services")) {
      const sampleService = await db.collection("services").findOne({})
      if (sampleService) {
        console.log("\nSample service document structure:")
        console.log(JSON.stringify(sampleService, null, 2))
      } else {
        console.log("\nNo service documents found")
      }
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

checkMongoDBSchema()

