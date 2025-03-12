const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Check if package.json exists
const packageJsonPath = path.join(__dirname, "..", "package.json")
if (!fs.existsSync(packageJsonPath)) {
  console.error("package.json not found. Make sure you are in the project root directory.")
  process.exit(1)
}

// Required dependencies
const dependencies = [
  "mongodb",
  "dotenv",
  "next",
  "react",
  "react-dom",
  "next-auth",
  "bcryptjs",
  "tailwindcss",
  "postcss",
  "autoprefixer",
]

console.log("Installing required dependencies...")
try {
  execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" })
  console.log("\nDependencies installed successfully! 🎉")
} catch (error) {
  console.error("\nFailed to install dependencies:", error.message)
  process.exit(1)
}

// Check if .env file exists, create if not
const envPath = path.join(__dirname, "..", ".env")
if (!fs.existsSync(envPath)) {
  console.log("\nCreating .env file...")
  const envExample = path.join(__dirname, "..", ".env.example")

  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envPath)
    console.log(".env file created from .env.example")
  } else {
    // Create basic .env file
    const basicEnv = `# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/khodiyar_pathology?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Email
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@khodiyarpathology.com
`
    fs.writeFileSync(envPath, basicEnv)
    console.log("Basic .env file created. Please update with your actual credentials.")
  }

  console.log("\n⚠️ IMPORTANT: Update your .env file with your actual MongoDB connection string and other credentials.")
}

console.log("\nSetup complete! Next steps:")
console.log("1. Update your .env file with your MongoDB connection string")
console.log('2. Run "npm run check-db" to verify your MongoDB connection')
console.log('3. Run "npm run init-db" to initialize your database collections')
console.log('4. Run "npm run dev" to start the development server')

