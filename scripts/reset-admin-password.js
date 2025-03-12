// reset-admin-password.js
const { MongoClient } = require("mongodb")
const {has} = require("bcrypt")
import dotenv from "dotenv";

dotenv.config();

async function resetAdminPassword() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    const usersCollection = db.collection("users");
    
    // New admin password
    const newPassword = "NewAdmin@123!";
    const passwordHash = await hash(newPassword, 10);
    
    // Update admin user password
    const result = await usersCollection.updateOne(
      { email: "admin@khodiyarpathology.com" },
      { $set: { passwordHash: passwordHash } }
    );
    
    if (result.matchedCount === 0) {
      console.log("Admin user not found");
    } else if (result.modifiedCount === 0) {
      console.log("Password was not changed (might be the same as before)");
    } else {
      console.log("Admin password updated successfully");
      console.log(`New password: ${newPassword}`);
    }
  } catch (error) {
    console.error("Error resetting admin password:", error);
  } finally {
    await client.close();
  }
}

resetAdminPassword();