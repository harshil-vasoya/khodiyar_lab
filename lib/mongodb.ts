import { MongoClient } from "mongodb"

// Check if we're in a Node.js environment (not in browser)
if (typeof process !== "undefined" && process.env) {
  console.log("Environment check: Node.js environment detected")

  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not set")
    console.error("Please check your .env file and make sure it contains MONGODB_URI")
    console.error(
      "Current environment variables:",
      Object.keys(process.env).filter((key) => !key.includes("SECRET")),
    )
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  } else {
    console.log("MONGODB_URI is set")
  }
} else {
  console.error("Not in a Node.js environment or process.env is undefined")
}

const uri = process.env.MONGODB_URI || ""
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

