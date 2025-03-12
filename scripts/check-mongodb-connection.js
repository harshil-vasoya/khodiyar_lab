require("dotenv").config()
const { MongoClient } = require("mongodb")

async function checkConnection() {
  if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI environment variable is not set!")
    console.error("Please make sure your .env file contains a valid MONGODB_URI")
    process.exit(1)
  }

  let client
  try {
    console.log("Attempting to connect to MongoDB...")
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()

    console.log("✅ Successfully connected to MongoDB!")
    console.log("Connection details:")
    console.log(`- Database: ${client.db().databaseName}`)

    // List collections
    const collections = await client.db().listCollections().toArray()
    console.log(`- Collections: ${collections.length}`)
    if (collections.length > 0) {
      console.log("  Available collections:")
      collections.forEach((collection) => {
        console.log(`  - ${collection.name}`)
      })
    } else {
      console.log("  No collections found. Run the initialization script to create them.")
    }

    console.log("\nYour MongoDB connection is working correctly! 🎉")
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:")
    console.error(error)
    console.error("\nPossible issues:")
    console.error("1. Your connection string might be incorrect")
    console.error("2. Your MongoDB server might not be running")
    console.error("3. Network issues might be preventing the connection")
    console.error("4. IP access restrictions might be blocking your connection")
  } finally {
    if (client) {
      await client.close()
      console.log("Connection closed.")
    }
  }
}

checkConnection()

