import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Microscope, Droplet, Activity, FileText, AlertCircle } from "lucide-react"

export default function HematologyPage() {
  return (
    <DepartmentLayout
      title="Hematology Department"
      description="Comprehensive blood analysis for accurate diagnosis and monitoring of blood disorders"
      image="/placeholder.svg?height=500&width=700&text=Hematology+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Hematology Department</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Hematology Department specializes in the study of blood, blood-forming tissues, and blood
                  disorders. We use advanced technology and techniques to analyze blood samples and provide accurate
                  diagnoses.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of experienced hematologists and technicians work together to ensure that all tests are
                  performed with precision and results are interpreted correctly to aid in the diagnosis and treatment
                  of various blood disorders.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/hematology.svg"
                  alt="Hematology Team"
                  className="mx-auto h-full w-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Hematology Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a wide range of hematology tests to diagnose and monitor various blood disorders
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Microscope,
                title: "Complete Blood Count (CBC)",
                description: "Measures the levels of red blood cells, white blood cells, and platelets in your blood.",
              },
              {
                icon: Droplet,
                title: "Hemoglobin and Hematocrit",
                description:
                  "Measures the amount of hemoglobin in your blood and the proportion of red blood cells in your blood.",
              },
              {
                icon: Activity,
                title: "Coagulation Studies",
                description: "Tests that measure how well your blood clots, including PT, PTT, and INR.",
              },
              {
                icon: FileText,
                title: "Blood Smear Examination",
                description:
                  "Microscopic examination of blood cells to detect abnormalities in size, shape, and number.",
              },
              {
                icon: AlertCircle,
                title: "Bone Marrow Aspiration",
                description:
                  "Collection and examination of bone marrow to diagnose blood disorders and certain cancers.",
              },
              {
                icon: CheckCircle2,
                title: "Hemoglobinopathy Screening",
                description:
                  "Tests to detect abnormal forms of hemoglobin, such as in sickle cell anemia and thalassemia.",
              },
            ].map((service, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <service.icon className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Common Blood Disorders We Diagnose</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our hematology department helps diagnose and monitor a wide range of blood disorders
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Anemia",
                description:
                  "A condition where you don't have enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
              },
              {
                title: "Hemophilia",
                description:
                  "A rare disorder in which your blood doesn't clot normally because it lacks sufficient blood-clotting proteins.",
              },
              {
                title: "Leukemia",
                description:
                  "A cancer of blood-forming tissues, including bone marrow, that hinders the body's ability to fight infection.",
              },
              {
                title: "Lymphoma",
                description: "A cancer of the lymphatic system, which is part of the body's germ-fighting network.",
              },
              {
                title: "Thrombocytopenia",
                description: "A condition characterized by abnormally low levels of platelets, which help blood clot.",
              },
              {
                title: "Polycythemia Vera",
                description: "A slow-growing blood cancer in which your bone marrow makes too many red blood cells.",
              },
            ].map((disorder, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg border bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 h-12 w-12 flex items-center justify-center">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{disorder.title}</h3>
                  <p className="text-gray-500 mt-2">{disorder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Equipment and Technology</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We use state-of-the-art equipment and technology to ensure accurate and reliable results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Automated Hematology Analyzers",
                description: "Advanced analyzers that provide complete blood counts with high precision and accuracy.",
                image: "/placeholder.svg?height=200&width=300&text=Hematology+Analyzer",
              },
              {
                title: "Flow Cytometers",
                description:
                  "Sophisticated instruments used to analyze the physical and chemical characteristics of cells.",
                image: "/placeholder.svg?height=200&width=300&text=Flow+Cytometer",
              },
              {
                title: "Digital Microscopy",
                description:
                  "High-resolution digital microscopes for detailed examination of blood smears and bone marrow samples.",
                image: "/placeholder.svg?height=200&width=300&text=Digital+Microscope",
              },
            ].map((equipment, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{equipment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{equipment.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Hematology Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced hematologists and technicians are dedicated to providing the highest quality of
                care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Rajesh Patel",
                role: "Head of Hematology",
                bio: "Dr. Patel has over 15 years of experience in hematology and is specialized in diagnosing rare blood disorders.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Patel",
              },
              {
                name: "Dr. Priya Sharma",
                role: "Senior Hematologist",
                bio: "Dr. Sharma specializes in leukemia and lymphoma diagnosis and has published numerous research papers in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Sharma",
              },
              {
                name: "Dr. Amit Desai",
                role: "Hematopathologist",
                bio: "Dr. Desai is an expert in bone marrow examination and has trained at leading institutions around the world.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Desai",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </DepartmentLayout>
  )
}

