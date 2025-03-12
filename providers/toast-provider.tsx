"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          style: {
            background: "#22c55e",
          },
        },
        error: {
          style: {
            background: "#ef4444",
          },
        },
      }}
    />
  )
}

