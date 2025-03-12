// Mock data for development when MongoDB is not available

export function getMockDashboardAnalytics() {
    return {
      counts: {
        users: 120,
        employees: 15,
        appointments: 450,
        reports: 380,
        revenue: 125000,
      },
      recentAppointments: [
        {
          _id: "60d21b4667d0d8992e610c85",
          patientName: "John Doe",
          appointmentDate: new Date().toISOString(),
          status: "scheduled",
        },
        {
          _id: "60d21b4667d0d8992e610c86",
          patientName: "Jane Smith",
          appointmentDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          status: "completed",
        },
        {
          _id: "60d21b4667d0d8992e610c87",
          patientName: "Robert Johnson",
          appointmentDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: "completed",
        },
        {
          _id: "60d21b4667d0d8992e610c88",
          patientName: "Emily Davis",
          appointmentDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          status: "cancelled",
        },
        {
          _id: "60d21b4667d0d8992e610c89",
          patientName: "Michael Wilson",
          appointmentDate: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          status: "completed",
        },
      ],
      appointmentsByStatus: [
        { _id: "scheduled", count: 45 },
        { _id: "completed", count: 380 },
        { _id: "cancelled", count: 25 },
      ],
      reportsByStatus: [
        { _id: "pending", count: 15 },
        { _id: "completed", count: 350 },
        { _id: "reviewed", count: 15 },
      ],
      monthlyAppointments: [30, 40, 45, 50, 55, 60, 65, 60, 55, 50, 45, 40],
    }
  }
  
  export function getMockUserAnalytics() {
    return {
      monthlyRegistrations: [5, 8, 12, 15, 10, 8, 6, 9, 11, 14, 10, 7],
      usersByStatus: [
        { _id: "active", count: 100 },
        { _id: "inactive", count: 20 },
      ],
      topUsersByAppointments: [
        { _id: "60d21b4667d0d8992e610c90", count: 12, name: "John Doe", email: "john@example.com" },
        { _id: "60d21b4667d0d8992e610c91", count: 10, name: "Jane Smith", email: "jane@example.com" },
        { _id: "60d21b4667d0d8992e610c92", count: 8, name: "Robert Johnson", email: "robert@example.com" },
        { _id: "60d21b4667d0d8992e610c93", count: 7, name: "Emily Davis", email: "emily@example.com" },
        { _id: "60d21b4667d0d8992e610c94", count: 6, name: "Michael Wilson", email: "michael@example.com" },
      ],
    }
  }
  
  export function getMockReportAnalytics() {
    return {
      reportsByTestType: [
        { _id: "Blood Test", count: 150 },
        { _id: "Urine Test", count: 120 },
        { _id: "X-Ray", count: 80 },
        { _id: "MRI", count: 30 },
      ],
      monthlyReports: [25, 30, 35, 40, 45, 40, 35, 30, 25, 20, 25, 30],
      topEmployeesByReports: [
        { _id: "60d21b4667d0d8992e610d00", count: 50, name: "Dr. Smith", role: "employee" },
        { _id: "60d21b4667d0d8992e610d01", count: 45, name: "Dr. Johnson", role: "employee" },
        { _id: "60d21b4667d0d8992e610d02", count: 40, name: "Dr. Williams", role: "employee" },
        { _id: "60d21b4667d0d8992e610d03", count: 35, name: "Dr. Brown", role: "employee" },
        { _id: "60d21b4667d0d8992e610d04", count: 30, name: "Dr. Jones", role: "employee" },
      ],
    }
  }
  
  