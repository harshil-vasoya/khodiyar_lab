import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, Droplet, FlaskRoundIcon as Flask, FileText, Search, Clipboard } from "lucide-react"

export default function ClinicalPathologyPage() {
  return (
    <DepartmentLayout
      title="Clinical Pathology Department"
      description="Comprehensive analysis of body fluids and tissues for accurate diagnosis of various diseases and conditions"
      image="/placeholder.svg?height=500&width=700&text=Clinical+Pathology+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  About Our Clinical Pathology Department
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Clinical Pathology Department specializes in the analysis of body fluids and tissues to diagnose
                  diseases and conditions. We perform a wide range of laboratory tests on samples such as blood, urine,
                  stool, and other body fluids.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of experienced pathologists and technicians work together to ensure that all tests are
                  performed with precision and results are interpreted correctly to aid in the diagnosis and treatment
                  of various medical conditions.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/clinicalPathology.svg"
                  alt="Clinical Pathology Team"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Clinical Pathology Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of clinical pathology tests to diagnose and monitor various conditions
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Microscope,
                title: "Microscopic Examination",
                description: "Examination of body fluids and tissues under a microscope to detect abnormalities.",
              },
              {
                icon: Droplet,
                title: "Urinalysis",
                description:
                  "Analysis of urine to detect various diseases and conditions affecting the urinary system.",
              },
              {
                icon: Flask,
                title: "Body Fluid Analysis",
                description:
                  "Analysis of various body fluids such as cerebrospinal fluid, pleural fluid, and synovial fluid.",
              },
              {
                icon: FileText,
                title: "Stool Analysis",
                description:
                  "Analysis of stool samples to detect digestive disorders, infections, and other conditions.",
              },
              {
                icon: Search,
                title: "Parasite Detection",
                description: "Detection of parasites in blood, stool, and other body fluids.",
              },
              {
                icon: Clipboard,
                title: "Comprehensive Reports",
                description:
                  "Detailed reports with interpretation and recommendations for further testing or treatment.",
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
                Our clinical pathology department helps diagnose and monitor a wide range of medical conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Urinary Tract Infections",
                description:
                  "Infections that affect the urinary system, including the kidneys, bladder, ureters, and urethra.",
              },
              {
                title: "Kidney Disorders",
                description:
                  "Various conditions that affect the kidneys, including chronic kidney disease and kidney stones.",
              },
              {
                title: "Digestive Disorders",
                description:
                  "Conditions that affect the digestive system, including inflammatory bowel disease and malabsorption syndromes.",
              },
              {
                title: "Parasitic Infections",
                description: "Infections caused by parasites, such as malaria, giardiasis, and intestinal worms.",
              },
              {
                title: "Metabolic Disorders",
                description: "Conditions that affect metabolism, including diabetes and metabolic syndrome.",
              },
              {
                title: "Inflammatory Conditions",
                description: "Various inflammatory conditions that can be detected through analysis of body fluids.",
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
                description: "High-resolution microscopes for detailed examination of body fluids and tissues.",
              },
              {
                title: "Automated Urinalysis Systems",
                description: "Sophisticated systems that provide rapid and accurate analysis of urine samples.",
              },
              {
                title: "Digital Imaging Systems",
                description:
                  "Advanced imaging systems for capturing and analyzing microscopic images of body fluids and tissues.",
              },
            ].map((equipment, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Clinical Pathology Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced pathologists and technicians are dedicated to providing the highest quality of
                care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Anjali Verma",
                role: "Head of Clinical Pathology",
                bio: "Dr. Verma has over 14 years of experience in clinical pathology and specializes in urinalysis and body fluid analysis.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Verma",
              },
              {
                name: "Dr. Rahul Sharma",
                role: "Senior Pathologist",
                bio: "Dr. Sharma specializes in parasite detection and has contributed to several research studies in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Sharma",
              },
              {
                name: "Dr. Pooja Patel",
                role: "Clinical Pathologist",
                bio: "Dr. Patel is an expert in stool analysis and has trained at prestigious institutions around the world.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Patel",
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

