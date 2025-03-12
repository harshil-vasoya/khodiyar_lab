const { MongoClient } = require("mongodb")
require("dotenv").config()

// MongoDB connection string
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/khodiyar_pathology"

async function seedDepartmentsAndServices() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()
    const departmentsCollection = db.collection("departments")
    const servicesCollection = db.collection("services")

    // Check if departments already exist
    const departmentsCount = await departmentsCollection.countDocuments()

    if (departmentsCount === 0) {
      console.log("Seeding departments...")

      // Define departments
      const departments = [
        { name: "Hematology", description: "Blood testing and analysis", icon: "droplet" },
        { name: "Biochemistry", description: "Chemical analysis of body fluids", icon: "flask" },
        { name: "Microbiology", description: "Study of microorganisms", icon: "bug" },
        { name: "Immunology", description: "Study of immune system", icon: "shield" },
        { name: "Histopathology", description: "Microscopic examination of tissues", icon: "microscope" },
        { name: "Clinical Pathology", description: "General diagnostic testing", icon: "stethoscope" },
      ]

      // Insert departments
      const result = await departmentsCollection.insertMany(departments)
      console.log(`${result.insertedCount} departments inserted`)

      // Get inserted department IDs
      const insertedDepartments = await departmentsCollection.find({}).toArray()
      const departmentMap = {}

      insertedDepartments.forEach((dept) => {
        departmentMap[dept.name] = dept._id
      })

      // Define services
      const services = [
        {
          name: "Complete Blood Count (CBC)",
          description: "Analysis of red blood cells, white blood cells, and platelets",
          price: 500,
          duration: 30,
          departmentId: departmentMap["Hematology"],
          homeCollection: true,
          preparationInstructions: "No special preparation required",
        },
        {
          name: "Blood Glucose Test",
          description: "Measures the amount of glucose in the blood",
          price: 300,
          duration: 15,
          departmentId: departmentMap["Biochemistry"],
          homeCollection: true,
          preparationInstructions: "Fast for 8 hours before the test",
        },
        {
          name: "Lipid Profile",
          description: "Measures cholesterol and triglycerides in the blood",
          price: 800,
          duration: 30,
          departmentId: departmentMap["Biochemistry"],
          homeCollection: true,
          preparationInstructions: "Fast for 12 hours before the test",
        },
        {
          name: "Liver Function Test",
          description: "Assesses liver function and detects liver damage",
          price: 1200,
          duration: 45,
          departmentId: departmentMap["Biochemistry"],
          homeCollection: true,
          preparationInstructions: "No alcohol for 24 hours before the test",
        },
        {
          name: "Urine Culture",
          description: "Identifies bacteria in urine",
          price: 600,
          duration: 20,
          departmentId: departmentMap["Microbiology"],
          homeCollection: true,
          preparationInstructions: "Collect mid-stream urine sample",
        },
        {
          name: "Stool Culture",
          description: "Identifies bacteria in stool",
          price: 700,
          duration: 20,
          departmentId: departmentMap["Microbiology"],
          homeCollection: true,
          preparationInstructions: "Collect fresh stool sample",
        },
        {
          name: "COVID-19 Antibody Test",
          description: "Detects antibodies against SARS-CoV-2",
          price: 1500,
          duration: 30,
          departmentId: departmentMap["Immunology"],
          homeCollection: true,
          preparationInstructions: "No special preparation required",
        },
        {
          name: "Allergy Panel",
          description: "Tests for common allergens",
          price: 2500,
          duration: 60,
          departmentId: departmentMap["Immunology"],
          homeCollection: true,
          preparationInstructions: "Avoid antihistamines for 7 days before the test",
        },
        {
          name: "Biopsy Analysis",
          description: "Microscopic examination of tissue samples",
          price: 3000,
          duration: 90,
          departmentId: departmentMap["Histopathology"],
          homeCollection: false,
          preparationInstructions: "Follow doctor's instructions",
        },
        {
          name: "Pap Smear",
          description: "Screening test for cervical cancer",
          price: 1000,
          duration: 30,
          departmentId: departmentMap["Histopathology"],
          homeCollection: false,
          preparationInstructions: "Avoid sexual intercourse for 48 hours before the test",
        },
        {
          name: "Comprehensive Metabolic Panel",
          description: "Assesses kidney function, liver function, and electrolyte balance",
          price: 1800,
          duration: 45,
          departmentId: departmentMap["Clinical Pathology"],
          homeCollection: true,
          preparationInstructions: "Fast for 8 hours before the test",
        },
        {
          name: "Thyroid Function Test",
          description: "Measures thyroid hormone levels",
          price: 1200,
          duration: 30,
          departmentId: departmentMap["Clinical Pathology"],
          homeCollection: true,
          preparationInstructions: "No special preparation required",
        },
        {
          name: "Vitamin D Test",
          description: "Measures vitamin D levels in the blood",
          price: 1500,
          duration: 30,
          departmentId: departmentMap["Clinical Pathology"],
          homeCollection: true,
          preparationInstructions: "No special preparation required",
        },
      ]

      // Insert services
      const servicesResult = await servicesCollection.insertMany(services)
      console.log(`${servicesResult.insertedCount} services inserted`)
    } else {
      console.log("Departments already exist. Skipping seed.")
    }
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

// Run the seed function
seedDepartmentsAndServices()
  .then(() => console.log("Seeding completed"))
  .catch((err) => console.error("Seeding failed:", err))

