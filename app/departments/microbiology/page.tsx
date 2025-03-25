import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, WormIcon as Virus, FlaskRoundIcon as Flask, FileText, Search, Clipboard } from "lucide-react"

export default function MicrobiologyPage() {
  return (
    <DepartmentLayout
      title="Microbiology Department"
      description="Identification and analysis of microorganisms for accurate diagnosis of infectious diseases"
      image="/placeholder.svg?height=500&width=700&text=Microbiology+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Microbiology Department</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Microbiology Department specializes in the identification and analysis of microorganisms such as
                  bacteria, viruses, fungi, and parasites. We perform a wide range of tests to diagnose infectious
                  diseases and guide appropriate treatment.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of experienced microbiologists and technicians work together to ensure that all tests are
                  performed with precision and results are interpreted correctly to aid in the diagnosis and treatment
                  of various infectious diseases.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/placeholder.svg?height=350&width=600&text=Microbiology+Team"
                  alt="Microbiology Team"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Microbiology Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of microbiology tests to diagnose and monitor various infectious diseases
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Microscope,
                title: "Bacterial Culture",
                description: "Cultivation and identification of bacteria from various clinical specimens.",
              },
              {
                icon: Virus,
                title: "Viral Detection",
                description: "Detection of viruses using various techniques such as PCR and serology.",
              },
              {
                icon: Flask,
                title: "Fungal Culture",
                description: "Cultivation and identification of fungi from various clinical specimens.",
              },
              {
                icon: FileText,
                title: "Parasite Detection",
                description: "Detection of parasites in blood, stool, and other body fluids.",
              },
              {
                icon: Search,
                title: "Antimicrobial Susceptibility Testing",
                description: "Testing to determine which antibiotics are effective against specific bacteria.",
              },
              {
                icon: Clipboard,
                title: "Comprehensive Reports",
                description: "Detailed reports with interpretation and recommendations for appropriate treatment.",
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Common Infections We Help Diagnose</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our microbiology department helps diagnose and monitor a wide range of infectious diseases
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
                title: "Respiratory Infections",
                description:
                  "Infections that affect the respiratory system, including pneumonia, bronchitis, and tuberculosis.",
              },
              {
                title: "Gastrointestinal Infections",
                description:
                  "Infections that affect the digestive system, including food poisoning and gastroenteritis.",
              },
              {
                title: "Skin and Soft Tissue Infections",
                description:
                  "Infections that affect the skin and underlying tissues, including cellulitis and abscesses.",
              },
              {
                title: "Bloodstream Infections",
                description: "Infections that affect the bloodstream, including sepsis and bacteremia.",
              },
              {
                title: "Sexually Transmitted Infections",
                description:
                  "Infections that are primarily transmitted through sexual contact, including gonorrhea and chlamydia.",
              },
            ].map((infection, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg border bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 h-12 w-12 flex items-center justify-center">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{infection.title}</h3>
                  <p className="text-gray-500 mt-2">{infection.description}</p>
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
                title: "Automated Culture Systems",
                description:
                  "Advanced systems for rapid and accurate cultivation and identification of microorganisms.",
              },
              {
                title: "PCR Machines",
                description:
                  "Sophisticated equipment for detecting and identifying microorganisms at the molecular level.",
              },
              {
                title: "MALDI-TOF Mass Spectrometry",
                description: "Cutting-edge technology for rapid and accurate identification of microorganisms.",
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

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Microbiology Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced microbiologists and technicians are dedicated to providing the highest quality
                of care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Anil Gupta",
                role: "Head of Microbiology",
                bio: "Dr. Gupta has over 16 years of experience in microbiology and specializes in antibiotic resistance.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Gupta",
              },
              {
                name: "Dr. Sunita Patel",
                role: "Senior Microbiologist",
                bio: "Dr. Patel specializes in molecular diagnostics and has contributed to several research studies in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Patel",
              },
              {
                name: "Dr. Vivek Sharma",
                role: "Clinical Microbiologist",
                bio: "Dr. Sharma is an expert in fungal infections and has trained at prestigious institutions around the world.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Sharma",
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

