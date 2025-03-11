import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, Scissors, FileText, Search, AlertCircle, Layers } from "lucide-react"

export default function HistopathologyPage() {
  return (
    <DepartmentLayout
      title="Histopathology Department"
      description="Expert examination of tissue samples for accurate diagnosis of diseases and conditions"
      image="/placeholder.svg?height=500&width=700&text=Histopathology+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Histopathology Department</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Histopathology Department specializes in the microscopic examination of tissue samples to diagnose
                  diseases and conditions. We analyze tissue samples from biopsies, surgeries, and other procedures to
                  provide accurate diagnoses.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of experienced histopathologists and technicians work together to ensure that all tissue
                  samples are processed, examined, and interpreted with precision to aid in the diagnosis and treatment
                  of various medical conditions, including cancer.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/placeholder.svg?height=350&width=600&text=Histopathology+Team"
                  alt="Histopathology Team"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Histopathology Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of histopathology services to diagnose and monitor various conditions
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Microscope,
                title: "Routine Histopathology",
                description: "Examination of tissue samples to diagnose various diseases and conditions.",
              },
              {
                icon: Scissors,
                title: "Frozen Section",
                description:
                  "Rapid processing and examination of tissue samples during surgery to guide surgical decisions.",
              },
              {
                icon: FileText,
                title: "Cytopathology",
                description:
                  "Examination of cells from various body sites to detect abnormalities and diagnose diseases.",
              },
              {
                icon: Search,
                title: "Immunohistochemistry",
                description:
                  "Special staining techniques to identify specific proteins in tissue samples for more accurate diagnosis.",
              },
              {
                icon: AlertCircle,
                title: "Fine Needle Aspiration",
                description:
                  "Collection and examination of cells from suspicious lumps or masses to diagnose cancer and other conditions.",
              },
              {
                icon: Layers,
                title: "Special Stains",
                description:
                  "Various staining techniques to highlight specific tissue components for better visualization and diagnosis.",
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Common Conditions We Help Diagnose</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our histopathology department helps diagnose and monitor a wide range of medical conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Cancer",
                description: "Various types of cancer, including breast, colon, lung, and skin cancer.",
              },
              {
                title: "Inflammatory Conditions",
                description: "Various inflammatory conditions affecting different organs and tissues.",
              },
              {
                title: "Infectious Diseases",
                description: "Infections caused by bacteria, viruses, fungi, and parasites that affect tissues.",
              },
              {
                title: "Autoimmune Disorders",
                description:
                  "Conditions where the immune system attacks the body's own tissues, such as rheumatoid arthritis and lupus.",
              },
              {
                title: "Degenerative Diseases",
                description:
                  "Conditions characterized by progressive deterioration of tissues, such as Alzheimer's disease.",
              },
              {
                title: "Metabolic Disorders",
                description:
                  "Conditions that affect metabolism and can cause tissue damage, such as diabetes and fatty liver disease.",
              },
            ].map((condition, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg border bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 h-12 w-12 flex items-center justify-center">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{condition.title}</h3>
                  <p className="text-gray-500 mt-2">{condition.description}</p>
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
                title: "Advanced Microscopes",
                description: "High-resolution microscopes for detailed examination of tissue samples.",
                image: "/placeholder.svg?height=200&width=300&text=Advanced+Microscopes",
              },
              {
                title: "Automated Tissue Processors",
                description: "Sophisticated equipment for processing tissue samples with precision and consistency.",
                image: "/placeholder.svg?height=200&width=300&text=Tissue+Processors",
              },
              {
                title: "Digital Pathology Systems",
                description: "Advanced systems for capturing, storing, and analyzing digital images of tissue samples.",
                image: "/placeholder.svg?height=200&width=300&text=Digital+Pathology",
              },
            ].map((equipment, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={equipment.image || "/placeholder.svg"}
                    alt={equipment.title}
                    className="h-full w-full object-cover"
                  />
                </div>
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

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Histopathology Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced histopathologists and technicians are dedicated to providing the highest quality
                of care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Suresh Kumar",
                role: "Head of Histopathology",
                bio: "Dr. Kumar has over 15 years of experience in histopathology and specializes in cancer diagnosis.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Kumar",
              },
              {
                name: "Dr. Nisha Shah",
                role: "Senior Histopathologist",
                bio: "Dr. Shah specializes in immunohistochemistry and has contributed to several research studies in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Shah",
              },
              {
                name: "Dr. Rajiv Mehta",
                role: "Cytopathologist",
                bio: "Dr. Mehta is an expert in fine needle aspiration and has trained at prestigious institutions around the world.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Mehta",
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
      </section>
    </DepartmentLayout>
  )
}

