import { MongoClient } from "mongodb"

export async function createSchemas() {
  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI || "")

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Create Users collection with schema validation
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "passwordHash", "registeredDate", "status"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name is required and must be a string",
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "Email is required and must be a valid email address",
            },
            passwordHash: {
              bsonType: "string",
              description: "Password hash is required and must be a string",
            },
            phone: {
              bsonType: ["string", "null"],
              description: "Phone must be a string if provided",
            },
            address: {
              bsonType: ["string", "null"],
              description: "Address must be a string if provided",
            },
            city: {
              bsonType: ["string", "null"],
              description: "City must be a string if provided",
            },
            state: {
              bsonType: ["string", "null"],
              description: "State must be a string if provided",
            },
            pincode: {
              bsonType: ["string", "null"],
              description: "Pincode must be a string if provided",
            },
            dob: {
              bsonType: ["date", "null"],
              description: "Date of birth must be a date if provided",
            },
            gender: {
              bsonType: ["string", "null"],
              enum: ["male", "female", "other", null],
              description: "Gender must be one of: male, female, other",
            },
            registeredDate: {
              bsonType: "date",
              description: "Registered date is required and must be a date",
            },
            lastActive: {
              bsonType: ["date", "null"],
              description: "Last active must be a date if provided",
            },
            status: {
              bsonType: "string",
              enum: ["active", "inactive", "suspended"],
              description: "Status must be one of: active, inactive, suspended",
            },
            referralPoints: {
              bsonType: "int",
              description: "Referral points must be an integer",
            },
          },
        },
      },
    })
    console.log("Users collection created")

    // Create unique index on email
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    console.log("Created unique index on users.email")

    // Create Employees collection with schema validation
    await db.createCollection("employees", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "passwordHash", "employeeId", "role", "status"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name is required and must be a string",
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "Email is required and must be a valid email address",
            },
            passwordHash: {
              bsonType: "string",
              description: "Password hash is required and must be a string",
            },
            phone: {
              bsonType: ["string", "null"],
              description: "Phone must be a string if provided",
            },
            address: {
              bsonType: ["string", "null"],
              description: "Address must be a string if provided",
            },
            city: {
              bsonType: ["string", "null"],
              description: "City must be a string if provided",
            },
            state: {
              bsonType: ["string", "null"],
              description: "State must be a string if provided",
            },
            pincode: {
              bsonType: ["string", "null"],
              description: "Pincode must be a string if provided",
            },
            dob: {
              bsonType: ["date", "null"],
              description: "Date of birth must be a date if provided",
            },
            gender: {
              bsonType: ["string", "null"],
              enum: ["male", "female", "other", null],
              description: "Gender must be one of: male, female, other",
            },
            employeeId: {
              bsonType: "string",
              description: "Employee ID is required and must be a string",
            },
            joinDate: {
              bsonType: "date",
              description: "Join date must be a date",
            },
            departmentId: {
              bsonType: "objectId",
              description: "Department ID is required and must be an ObjectId",
            },
            role: {
              bsonType: "string",
              enum: ["admin", "doctor", "technician", "receptionist", "manager"],
              description: "Role is required and must be one of: admin, doctor, technician, receptionist, manager",
            },
            status: {
              bsonType: "string",
              enum: ["active", "inactive", "on-leave"],
              description: "Status is required and must be one of: active, inactive, on-leave",
            },
            reportsTo: {
              bsonType: ["objectId", "null"],
              description: "Reports to must be an ObjectId if provided",
            },
            performance: {
              bsonType: ["string", "null"],
              description: "Performance must be a string if provided",
            },
          },
        },
      },
    })
    console.log("Employees collection created")

    // Create unique index on employee email
    await db.collection("employees").createIndex({ email: 1 }, { unique: true })
    console.log("Created unique index on employees.email")

    // Create unique index on employee employeeId
    await db.collection("employees").createIndex({ employeeId: 1 }, { unique: true })
    console.log("Created unique index on employees.employeeId")

    // Create Appointments collection with schema validation
    await db.createCollection("appointments", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "appointmentDate", "status", "createdAt"],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "User ID is required and must be an ObjectId",
            },
            serviceId: {
              bsonType: "objectId",
              description: "Service ID must be an ObjectId",
            },
            employeeId: {
              bsonType: "objectId",
              description: "Employee ID must be an ObjectId",
            },
            appointmentDate: {
              bsonType: "date",
              description: "Appointment date is required and must be a date",
            },
            status: {
              bsonType: "string",
              enum: ["scheduled", "completed", "cancelled", "no-show"],
              description: "Status is required and must be one of: scheduled, completed, cancelled, no-show",
            },
            location: {
              bsonType: ["string", "null"],
              description: "Location must be a string if provided",
            },
            amount: {
              bsonType: "double",
              description: "Amount must be a double",
            },
            paymentStatus: {
              bsonType: "string",
              enum: ["pending", "paid", "refunded"],
              description: "Payment status must be one of: pending, paid, refunded",
            },
            createdAt: {
              bsonType: "date",
              description: "Created at is required and must be a date",
            },
          },
        },
      },
    })
    console.log("Appointments collection created")

    // Create Reports collection with schema validation
    await db.createCollection("reports", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "testType", "testDate", "status", "uploadedAt"],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "User ID is required and must be an ObjectId",
            },
            appointmentId: {
              bsonType: "objectId",
              description: "Appointment ID must be an ObjectId",
            },
            employeeId: {
              bsonType: "objectId",
              description: "Employee ID must be an ObjectId",
            },
            testType: {
              bsonType: "string",
              description: "Test type is required and must be a string",
            },
            testDate: {
              bsonType: "date",
              description: "Test date is required and must be a date",
            },
            status: {
              bsonType: "string",
              enum: ["pending", "completed", "cancelled"],
              description: "Status is required and must be one of: pending, completed, cancelled",
            },
            notes: {
              bsonType: ["string", "null"],
              description: "Notes must be a string if provided",
            },
            filePath: {
              bsonType: ["string", "null"],
              description: "File path must be a string if provided",
            },
            referralPoints: {
              bsonType: ["int", "null"],
              description: "Referral points must be an integer if provided",
            },
            uploadedAt: {
              bsonType: "date",
              description: "Uploaded at is required and must be a date",
            },
          },
        },
      },
    })
    console.log("Reports collection created")

    // Create Services collection with schema validation
    await db.createCollection("services", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "active"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name is required and must be a string",
            },
            description: {
              bsonType: ["string", "null"],
              description: "Description must be a string if provided",
            },
            price: {
              bsonType: "double",
              description: "Price is required and must be a double",
            },
            departmentId: {
              bsonType: "objectId",
              description: "Department ID must be an ObjectId",
            },
            duration: {
              bsonType: ["int", "null"],
              description: "Duration must be an integer if provided",
            },
            homeCollection: {
              bsonType: "bool",
              description: "Home collection must be a boolean",
            },
            active: {
              bsonType: "bool",
              description: "Active is required and must be a boolean",
            },
          },
        },
      },
    })
    console.log("Services collection created")

    // Create Packages collection with schema validation
    await db.createCollection("packages", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "active"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name is required and must be a string",
            },
            description: {
              bsonType: ["string", "null"],
              description: "Description must be a string if provided",
            },
            price: {
              bsonType: "double",
              description: "Price is required and must be a double",
            },
            discount: {
              bsonType: ["double", "null"],
              description: "Discount must be a double if provided",
            },
            active: {
              bsonType: "bool",
              description: "Active is required and must be a boolean",
            },
          },
        },
      },
    })
    console.log("Packages collection created")

    // Create PackageServices collection with schema validation
    await db.createCollection("packageServices", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["packageId", "serviceId"],
          properties: {
            packageId: {
              bsonType: "objectId",
              description: "Package ID is required and must be an ObjectId",
            },
            serviceId: {
              bsonType: "objectId",
              description: "Service ID is required and must be an ObjectId",
            },
          },
        },
      },
    })
    console.log("PackageServices collection created")

    // Create compound index on packageId and serviceId
    await db.collection("packageServices").createIndex({ packageId: 1, serviceId: 1 }, { unique: true })
    console.log("Created compound index on packageServices.packageId and packageServices.serviceId")

    // Create Departments collection with schema validation
    await db.createCollection("departments", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "active"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name is required and must be a string",
            },
            description: {
              bsonType: ["string", "null"],
              description: "Description must be a string if provided",
            },
            image: {
              bsonType: ["string", "null"],
              description: "Image must be a string if provided",
            },
            active: {
              bsonType: "bool",
              description: "Active is required and must be a boolean",
            },
          },
        },
      },
    })
    console.log("Departments collection created")

    // Create Referrals collection with schema validation
    await db.createCollection("referrals", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["referrerId", "status", "createdAt"],
          properties: {
            referrerId: {
              bsonType: "objectId",
              description: "Referrer ID is required and must be an ObjectId",
            },
            referredEmail: {
              bsonType: ["string", "null"],
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "Referred email must be a valid email address if provided",
            },
            referredPhone: {
              bsonType: ["string", "null"],
              description: "Referred phone must be a string if provided",
            },
            status: {
              bsonType: "string",
              enum: ["pending", "registered", "completed"],
              description: "Status is required and must be one of: pending, registered, completed",
            },
            pointsAwarded: {
              bsonType: ["int", "null"],
              description: "Points awarded must be an integer if provided",
            },
            createdAt: {
              bsonType: "date",
              description: "Created at is required and must be a date",
            },
          },
        },
      },
    })
    console.log("Referrals collection created")

    // Create BlogPosts collection with schema validation
    await db.createCollection("blogPosts", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "content", "category", "publishedAt", "active"],
          properties: {
            title: {
              bsonType: "string",
              description: "Title is required and must be a string",
            },
            content: {
              bsonType: "string",
              description: "Content is required and must be a string",
            },
            image: {
              bsonType: ["string", "null"],
              description: "Image must be a string if provided",
            },
            category: {
              bsonType: "string",
              description: "Category is required and must be a string",
            },
            authorId: {
              bsonType: ["objectId", "null"],
              description: "Author ID must be an ObjectId if provided",
            },
            publishedAt: {
              bsonType: "date",
              description: "Published at is required and must be a date",
            },
            active: {
              bsonType: "bool",
              description: "Active is required and must be a boolean",
            },
          },
        },
      },
    })
    console.log("BlogPosts collection created")

    console.log("All collections created successfully")
  } catch (error: any) {
    console.error("Error creating collections:", error)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  // Check if MONGODB_URI is defined
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not defined")
    process.exit(1)
  }

  createSchemas()
    .then(() => {
      console.log("Schema creation completed")
      process.exit(0)
    })
    .catch((error: any) => {
      console.error("Schema creation failed:", error)
      process.exit(1)
    })
}

