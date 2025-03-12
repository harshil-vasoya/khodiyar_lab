import clientPromise from "../mongodb"

export async function getDashboardAnalytics() {
  try {
    console.log("Getting dashboard analytics")

    // Test MongoDB connection
    const client = await clientPromise
    console.log("MongoDB client connected")

    const db = client.db()
    console.log("Database selected")

    // Get counts from various collections
    console.log("Fetching collection counts")
    let usersCount = 0
    let employeesCount = 0
    let appointmentsCount = 0
    let reportsCount = 0

    try {
      usersCount = (await db.collection("users").countDocuments({ role: "user" })) || 0
      console.log("Users count:", usersCount)
    } catch (error) {
      console.error("Error counting users:", error)
    }

    try {
      employeesCount = (await db.collection("users").countDocuments({ role: "employee" })) || 0
      console.log("Employees count:", employeesCount)
    } catch (error) {
      console.error("Error counting employees:", error)
    }

    try {
      appointmentsCount = (await db.collection("appointments").countDocuments()) || 0
      console.log("Appointments count:", appointmentsCount)
    } catch (error) {
      console.error("Error counting appointments:", error)
    }

    try {
      reportsCount = (await db.collection("reports").countDocuments()) || 0
      console.log("Reports count:", reportsCount)
    } catch (error) {
      console.error("Error counting reports:", error)
    }

    // Get recent appointments (with error handling)
    console.log("Fetching recent appointments")
    let recentAppointments = []
    try {
      recentAppointments = await db.collection("appointments").find().sort({ appointmentDate: -1 }).limit(5).toArray()
      console.log("Recent appointments fetched:", recentAppointments.length)
    } catch (error) {
      console.error("Error fetching recent appointments:", error)
    }

    // Get appointments by status (with error handling)
    console.log("Fetching appointments by status")
    let appointmentsByStatus = []
    try {
      appointmentsByStatus = await db
        .collection("appointments")
        .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
        .toArray()
      console.log("Appointments by status fetched:", appointmentsByStatus.length)
    } catch (error) {
      console.error("Error fetching appointments by status:", error)
    }

    // Get reports by status (with error handling)
    console.log("Fetching reports by status")
    let reportsByStatus = []
    try {
      reportsByStatus = await db
        .collection("reports")
        .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
        .toArray()
      console.log("Reports by status fetched:", reportsByStatus.length)
    } catch (error) {
      console.error("Error fetching reports by status:", error)
    }

    // Calculate revenue (with error handling)
    console.log("Calculating revenue")
    let totalRevenue = 0
    try {
      const revenueResult = await db
        .collection("appointments")
        .aggregate([{ $match: { status: "completed" } }, { $group: { _id: null, total: { $sum: "$amount" } } }])
        .toArray()
      totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0
      console.log("Total revenue calculated:", totalRevenue)
    } catch (error) {
      console.error("Error calculating revenue:", error)
    }

    // Get monthly appointment counts for the current year (with error handling)
    console.log("Fetching monthly appointments")
    const currentYear = new Date().getFullYear()
    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31)

    const monthlyData = Array(12).fill(0)
    try {
      const monthlyAppointments = await db
        .collection("appointments")
        .aggregate([
          {
            $match: {
              appointmentDate: {
                $gte: startOfYear,
                $lte: endOfYear,
              },
            },
          },
          {
            $group: {
              _id: { $month: "$appointmentDate" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray()

      // Format monthly data for chart
      monthlyAppointments.forEach((item) => {
        if (item._id >= 1 && item._id <= 12) {
          monthlyData[item._id - 1] = item.count
        }
      })
      console.log("Monthly appointments fetched:", monthlyAppointments.length)
    } catch (error) {
      console.error("Error fetching monthly appointments:", error)
    }

    console.log("Dashboard analytics completed successfully")
    return {
      counts: {
        users: usersCount,
        employees: employeesCount,
        appointments: appointmentsCount,
        reports: reportsCount,
        revenue: totalRevenue,
      },
      recentAppointments,
      appointmentsByStatus,
      reportsByStatus,
      monthlyAppointments: monthlyData,
    }
  } catch (error) {
    console.error("Error in getDashboardAnalytics:", error)
    // Return default data structure to prevent UI errors
    return {
      counts: {
        users: 0,
        employees: 0,
        appointments: 0,
        reports: 0,
        revenue: 0,
      },
      recentAppointments: [],
      appointmentsByStatus: [],
      reportsByStatus: [],
      monthlyAppointments: Array(12).fill(0),
    }
  }
}

export async function getUserAnalytics() {
  try {
    const client = await clientPromise
    const db = client.db()

    // Get users by registration date (monthly for current year)
    const currentYear = new Date().getFullYear()
    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31)

    const monthlyData = Array(12).fill(0)
    try {
      const monthlyRegistrations = await db
        .collection("users")
        .aggregate([
          {
            $match: {
              registeredDate: {
                $gte: startOfYear,
                $lte: endOfYear,
              },
              role: "user",
            },
          },
          {
            $group: {
              _id: { $month: "$registeredDate" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray()

      // Format monthly data for chart
      monthlyRegistrations.forEach((item) => {
        if (item._id >= 1 && item._id <= 12) {
          monthlyData[item._id - 1] = item.count
        }
      })
    } catch (error) {
      console.error("Error fetching monthly registrations:", error)
    }

    // Get users by status
    let usersByStatus = []
    try {
      usersByStatus = await db
        .collection("users")
        .aggregate([{ $match: { role: "user" } }, { $group: { _id: "$status", count: { $sum: 1 } } }])
        .toArray()
    } catch (error) {
      console.error("Error fetching users by status:", error)
    }

    // Get top users by appointments
    let topUsersByAppointments = []
    try {
      topUsersByAppointments = await db
        .collection("appointments")
        .aggregate([
          { $group: { _id: "$userId", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              _id: 1,
              count: 1,
              name: { $ifNull: ["$user.name", "Unknown User"] },
              email: { $ifNull: ["$user.email", "unknown@example.com"] },
            },
          },
        ])
        .toArray()
    } catch (error) {
      console.error("Error fetching top users by appointments:", error)
    }

    return {
      monthlyRegistrations: monthlyData,
      usersByStatus,
      topUsersByAppointments,
    }
  } catch (error) {
    console.error("Error in getUserAnalytics:", error)
    return {
      monthlyRegistrations: Array(12).fill(0),
      usersByStatus: [],
      topUsersByAppointments: [],
    }
  }
}

export async function getReportAnalytics() {
  try {
    const client = await clientPromise
    const db = client.db()

    // Get reports by test type
    let reportsByTestType = []
    try {
      reportsByTestType = await db
        .collection("reports")
        .aggregate([{ $group: { _id: "$testType", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
        .toArray()
    } catch (error) {
      console.error("Error fetching reports by test type:", error)
    }

    // Get reports by month
    const currentYear = new Date().getFullYear()
    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31)

    const monthlyData = Array(12).fill(0)
    try {
      const monthlyReports = await db
        .collection("reports")
        .aggregate([
          {
            $match: {
              testDate: {
                $gte: startOfYear,
                $lte: endOfYear,
              },
            },
          },
          {
            $group: {
              _id: { $month: "$testDate" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray()

      // Format monthly data for chart
      monthlyReports.forEach((item) => {
        if (item._id >= 1 && item._id <= 12) {
          monthlyData[item._id - 1] = item.count
        }
      })
    } catch (error) {
      console.error("Error fetching monthly reports:", error)
    }

    // Get top employees by reports uploaded
    let topEmployeesByReports = []
    try {
      topEmployeesByReports = await db
        .collection("reports")
        .aggregate([
          { $group: { _id: "$employeeId", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "employee",
            },
          },
          { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              _id: 1,
              count: 1,
              name: { $ifNull: ["$employee.name", "Unknown Employee"] },
              role: { $ifNull: ["$employee.role", "unknown"] },
            },
          },
        ])
        .toArray()
    } catch (error) {
      console.error("Error fetching top employees by reports:", error)
    }

    return {
      reportsByTestType,
      monthlyReports: monthlyData,
      topEmployeesByReports,
    }
  } catch (error) {
    console.error("Error in getReportAnalytics:", error)
    return {
      reportsByTestType: [],
      monthlyReports: Array(12).fill(0),
      topEmployeesByReports: [],
    }
  }
}

