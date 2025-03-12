import clientPromise from "../lib/mongodb"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

async function seedTestData() {
  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db()

    console.log("Connected to MongoDB. Seeding test data...")

    // Check if we already have users
    const usersCount = await db.collection("users").countDocuments()
    if (usersCount > 0) {
      console.log(`Found ${usersCount} existing users. Skipping user seeding.`)
    } else {
      // Create admin user
      const adminPassword = await bcrypt.hash("admin123", 10)
      const adminUser = {
        _id: new ObjectId(),
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        status: "active",
        registeredDate: new Date(),
        permissions: ["all"],
      }

      // Create employee user
      const employeePassword = await bcrypt.hash("employee123", 10)
      const employeeUser = {
        _id: new ObjectId(),
        name: "Employee User",
        email: "employee@example.com",
        password: employeePassword,
        role: "employee",
        status: "active",
        registeredDate: new Date(),
        permissions: ["view_reports", "upload_reports", "view_appointments"],
      }

      // Create regular users
      const regularUsers = []
      for (let i = 1; i <= 5; i++) {
        const userPassword = await bcrypt.hash(`user${i}123`, 10)
        regularUsers.push({
          _id: new ObjectId(),
          name: `User ${i}`,
          email: `user${i}@example.com`,
          password: userPassword,
          role: "user",
          status: "active",
          registeredDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date in last 30 days
          phone: `123456789${i}`,
        })
      }

      // Insert users
      await db.collection("users").insertOne(adminUser)
      await db.collection("users").insertOne(employeeUser)
      await db.collection("users").insertMany(regularUsers)

      console.log("Seeded users successfully!")

      // Create test appointments
      const appointmentStatuses = ["scheduled", "completed", "cancelled", "pending"]
      const appointments = []

      for (let i = 0; i < 20; i++) {
        const randomUserIndex = Math.floor(Math.random() * regularUsers.length)
        const randomUser = regularUsers[randomUserIndex]
        const randomStatus = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)]
        const randomDate = new Date(
          Date.now() -
            Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000 +
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
        )

        appointments.push({
          _id: new ObjectId(),
          userId: randomUser._id,
          patientName: randomUser.name,
          patientEmail: randomUser.email,
          appointmentDate: randomDate,
          testType: ["Blood Test", "Urine Test", "X-Ray", "MRI", "CT Scan"][Math.floor(Math.random() * 5)],
          status: randomStatus,
          amount: Math.floor(Math.random() * 5000) + 500, // Random amount between 500 and 5500
          notes: `Test appointment ${i + 1} notes`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await db.collection("appointments").insertMany(appointments)
      console.log("Seeded appointments successfully!")

      // Create test reports
      const reportStatuses = ["completed", "pending", "processing"]
      const reports = []

      for (let i = 0; i < 15; i++) {
        const randomUserIndex = Math.floor(Math.random() * regularUsers.length)
        const randomUser = regularUsers[randomUserIndex]
        const randomStatus = reportStatuses[Math.floor(Math.random() * reportStatuses.length)]
        const randomDate = new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000)

        reports.push({
          _id: new ObjectId(),
          userId: randomUser._id,
          patientName: randomUser.name,
          patientEmail: randomUser.email,
          testType: ["Blood Test", "Urine Test", "X-Ray", "MRI", "CT Scan"][Math.floor(Math.random() * 5)],
          testDate: randomDate,
          status: randomStatus,
          results: `Test results for ${randomUser.name}`,
          employeeId: employeeUser._id,
          fileUrl: `/placeholder-report-${i + 1}.pdf`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await db.collection("reports").insertMany(reports)
      console.log("Seeded reports successfully!")
    }

    console.log("Test data seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding test data:", error)
  }
}

// Run the seeding
seedTestData()

