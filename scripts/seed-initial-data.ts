import { MongoClient, ObjectId } from "mongodb"
import { hash } from "bcrypt"
import { createSchemas } from "./create-mongodb-schemas"

// Define interfaces for our data types
interface Department {
  _id: ObjectId
  name: string
  description: string
  image: string
  active: boolean
}

interface Service {
  _id: ObjectId
  name: string
  description: string
  price: number
  departmentId: ObjectId
  duration: number
  homeCollection: boolean
  active: boolean
}

export async function seedInitialData() {
  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI || "")

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // First, ensure schemas are created
    await createSchemas()

    // Create admin user
    const adminPasswordHash = await hash("admin123", 10)

    // Check if admin already exists
    const existingAdmin = await db.collection("employees").findOne({ email: "admin@khodiyarpathology.com" })

    if (!existingAdmin) {
      // Create departments first
      const departments: Department[] = [
        {
          _id: new ObjectId(),
          name: "Hematology",
          description: "Specializes in the study of blood, blood-forming organs, and blood diseases.",
          image: "/departments/hematology.jpg",
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Biochemistry",
          description: "Analyzes blood chemistry and other body fluids.",
          image: "/departments/biochemistry.jpg",
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Microbiology",
          description: "Studies microorganisms, such as bacteria, viruses, fungi, and parasites.",
          image: "/departments/microbiology.jpg",
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Immunoassay",
          description: "Specializes in tests that use antibody-antigen reactions.",
          image: "/departments/immunoassay.jpg",
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Clinical Pathology",
          description: "Diagnoses disease through laboratory analysis of bodily fluids.",
          image: "/departments/clinical-pathology.jpg",
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Histopathology",
          description: "Examines tissues under a microscope to identify disease.",
          image: "/departments/histopathology.jpg",
          active: true,
        },
      ]

      await db.collection("departments").insertMany(departments)
      console.log("Departments created")

      // Create admin employee
      const admin = {
        name: "Admin User",
        email: "admin@khodiyarpathology.com",
        passwordHash: adminPasswordHash,
        phone: "9876543210",
        employeeId: "EMP001",
        departmentId: departments[0]._id, // Assign to first department
        role: "admin",
        status: "active",
        joinDate: new Date(),
      }

      await db.collection("employees").insertOne(admin)
      console.log("Admin employee created")

      // Create services
      const services: Service[] = [
        {
          _id: new ObjectId(),
          name: "Complete Blood Count (CBC)",
          description: "Measures the levels of red blood cells, white blood cells, and platelets in your blood.",
          price: 500.0,
          departmentId: departments[0]._id, // Hematology
          duration: 30,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Blood Glucose Test",
          description: "Measures the amount of glucose in your blood.",
          price: 200.0,
          departmentId: departments[1]._id, // Biochemistry
          duration: 15,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Lipid Profile",
          description: "Measures the levels of fats in your blood, including cholesterol and triglycerides.",
          price: 800.0,
          departmentId: departments[1]._id, // Biochemistry
          duration: 45,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Liver Function Test",
          description: "Measures various chemicals in the blood to evaluate how well the liver is working.",
          price: 1000.0,
          departmentId: departments[1]._id, // Biochemistry
          duration: 60,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Urine Culture",
          description:
            "Tests for bacteria or other organisms in your urine that might be causing a urinary tract infection.",
          price: 600.0,
          departmentId: departments[2]._id, // Microbiology
          duration: 120,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "COVID-19 Antibody Test",
          description: "Detects antibodies developed in response to a COVID-19 infection or vaccination.",
          price: 1500.0,
          departmentId: departments[3]._id, // Immunoassay
          duration: 60,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Thyroid Function Test",
          description: "Measures how well your thyroid gland is working.",
          price: 1200.0,
          departmentId: departments[3]._id, // Immunoassay
          duration: 45,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Kidney Function Test",
          description:
            "Evaluates how well your kidneys are working by measuring levels of various substances in your blood.",
          price: 900.0,
          departmentId: departments[4]._id, // Clinical Pathology
          duration: 60,
          homeCollection: true,
          active: true,
        },
        {
          _id: new ObjectId(),
          name: "Biopsy",
          description:
            "Removal and examination of tissue from the body to determine the presence or extent of a disease.",
          price: 3000.0,
          departmentId: departments[5]._id, // Histopathology
          duration: 180,
          homeCollection: false,
          active: true,
        },
      ]

      await db.collection("services").insertMany(services)
      console.log("Services created")

      // Create packages
      const packages = [
        {
          name: "Basic Health Checkup",
          description: "A comprehensive package for basic health assessment.",
          price: 1500.0,
          discount: 200.0,
          active: true,
        },
        {
          name: "Diabetes Care Package",
          description: "Complete package for diabetes monitoring and management.",
          price: 2500.0,
          discount: 300.0,
          active: true,
        },
        {
          name: "Heart Health Package",
          description: "Comprehensive cardiac risk assessment package.",
          price: 3500.0,
          discount: 500.0,
          active: true,
        },
        {
          name: "Women's Health Package",
          description: "Complete health checkup designed specifically for women.",
          price: 4000.0,
          discount: 600.0,
          active: true,
        },
        {
          name: "Senior Citizen Package",
          description: "Comprehensive health assessment for senior citizens.",
          price: 3000.0,
          discount: 400.0,
          active: true,
        },
      ]

      const packageResults = await db.collection("packages").insertMany(packages)
      console.log("Packages created")

      // Create package services
      const packageServices = [
        // Basic Health Checkup
        {
          packageId: packageResults.insertedIds[0],
          serviceId: services.find((s: Service) => s.name === "Complete Blood Count (CBC)")!._id,
        },
        {
          packageId: packageResults.insertedIds[0],
          serviceId: services.find((s: Service) => s.name === "Blood Glucose Test")!._id,
        },
        {
          packageId: packageResults.insertedIds[0],
          serviceId: services.find((s: Service) => s.name === "Lipid Profile")!._id,
        },

        // Diabetes Care Package
        {
          packageId: packageResults.insertedIds[1],
          serviceId: services.find((s: Service) => s.name === "Blood Glucose Test")!._id,
        },
        {
          packageId: packageResults.insertedIds[1],
          serviceId: services.find((s: Service) => s.name === "Kidney Function Test")!._id,
        },

        // Heart Health Package
        {
          packageId: packageResults.insertedIds[2],
          serviceId: services.find((s: Service) => s.name === "Lipid Profile")!._id,
        },
        {
          packageId: packageResults.insertedIds[2],
          serviceId: services.find((s: Service) => s.name === "Complete Blood Count (CBC)")!._id,
        },

        // Women's Health Package
        {
          packageId: packageResults.insertedIds[3],
          serviceId: services.find((s: Service) => s.name === "Complete Blood Count (CBC)")!._id,
        },
        {
          packageId: packageResults.insertedIds[3],
          serviceId: services.find((s: Service) => s.name === "Thyroid Function Test")!._id,
        },

        // Senior Citizen Package
        {
          packageId: packageResults.insertedIds[4],
          serviceId: services.find((s: Service) => s.name === "Complete Blood Count (CBC)")!._id,
        },
        {
          packageId: packageResults.insertedIds[4],
          serviceId: services.find((s: Service) => s.name === "Kidney Function Test")!._id,
        },
        {
          packageId: packageResults.insertedIds[4],
          serviceId: services.find((s: Service) => s.name === "Lipid Profile")!._id,
        },
      ]

      await db.collection("packageServices").insertMany(packageServices)
      console.log("Package services created")

      // Create blog posts
      const blogPosts = [
        {
          title: "Understanding Your Blood Test Results",
          content: "Blood tests are a crucial part of diagnosing and monitoring various health conditions...",
          image: "/blog/blood-test.jpg",
          category: "Health Tips",
          authorId: new ObjectId(), // This would typically be an employee ID
          publishedAt: new Date(),
          active: true,
        },
        {
          title: "The Importance of Regular Health Checkups",
          content:
            "Regular health checkups are essential for maintaining good health and detecting potential issues early...",
          image: "/blog/health-checkup.jpg",
          category: "Preventive Care",
          authorId: new ObjectId(), // This would typically be an employee ID
          publishedAt: new Date(),
          active: true,
        },
        {
          title: "Diabetes Management: The Role of Pathology Tests",
          content: "For individuals with diabetes, regular pathology tests are crucial for effective management...",
          image: "/blog/diabetes.jpg",
          category: "Disease Management",
          authorId: new ObjectId(), // This would typically be an employee ID
          publishedAt: new Date(),
          active: true,
        },
      ]

      await db.collection("blogPosts").insertMany(blogPosts)
      console.log("Blog posts created")

      console.log("Initial data seeded successfully")
    } else {
      console.log("Admin already exists, skipping initial data seeding")
    }
  } catch (error: any) {
    console.error("Error seeding initial data:", error)
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

  seedInitialData()
    .then(() => {
      console.log("Data seeding completed")
      process.exit(0)
    })
    .catch((error: any) => {
      console.error("Data seeding failed:", error)
      process.exit(1)
    })
}

