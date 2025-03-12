import { AppointmentEditForm } from "./appointment-edit-form"

// This is a server component that receives the params
export default function AppointmentEditPage({ params }: { params: { id: string } }) {
  // Pass the ID to the client component
  return <AppointmentEditForm appointmentId={params.id} />
}

