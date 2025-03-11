import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, WormIcon as Virus, Dna, Thermometer, Zap, Pill } from "lucide-react"

export default function ImmunoassayPage() {
  return (
    <DepartmentLayout
      title="Immunoassay Department"
      description="Precise detection and measurement of antibodies, antigens, and hormones for accurate diagnosis of various conditions"
      image="/placeholder.svg?height=500&width=700&text=Immunoassay+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Immunoassay Department</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Immunoassay Department specializes in the detection and measurement of antibodies, antigens,
                  hormones, and other substances in the blood using highly sensitive immunological techniques.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  We use advanced immunoassay technologies to provide accurate and reliable results for a wide range of
                  tests, helping clinicians diagnose and monitor various conditions including infectious diseases,
                  autoimmune disorders, allergies, and hormonal imbalances.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/placeholder.svg?height=350&width=600&text=Immunoassay+Technology"
                  alt="Immunoassay Technology"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Immunoassay Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of immunoassay tests to diagnose and monitor various conditions
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Shield,
                title: "Allergy Testing",
                description:
                  "Detection of specific IgE antibodies to identify allergic reactions to various substances.",
              },
              {
                icon: Virus,
                title: "Infectious Disease Testing",
                description: "Detection of antibodies and antigens to diagnose various infectious diseases.",
              },
              {
                icon: Dna,
                title: "Autoimmune Disease Testing",
                description: "Detection of autoantibodies to diagnose various autoimmune disorders.",
              },
              {
                icon: Thermometer,
                title: "Hormone Testing",
                description:
                  "Measurement of hormone levels to diagnose endocrine disorders and monitor hormone therapy.",
              },
              {
                icon: Zap,
                title: "Tumor Marker Testing",
                description: "Detection of tumor markers to aid in the diagnosis and monitoring of various cancers.",
              },
              {
                icon: Pill,
                title: "Therapeutic Drug Monitoring",
                description:
                  "Measurement of drug levels in the blood to ensure optimal dosing and minimize side effects.",
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
                Our immunoassay department helps diagnose and monitor a wide range of medical conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Allergies",
                description: "Abnormal immune responses to substances that are typically harmless to most people.",
              },
              {
                title: "Autoimmune Disorders",
                description:
                  "Conditions where the immune system attacks the body's own tissues, such as rheumatoid arthritis and lupus.",
              },
              {
                title: "Infectious Diseases",
                description: "Diseases caused by pathogenic microorganisms, such as hepatitis, HIV, and COVID-19.",
              },
              {
                title: "Hormonal Imbalances",
                description:
                  "Conditions caused by too much or too little of a hormone, affecting various bodily functions.",
              },
              {
                title: "Cancer",
                description: "Various types of cancer that can be detected or monitored using tumor markers.",
              },
              {
                title: "Thyroid Disorders",
                description: "Conditions that affect the thyroid gland, including hypothyroidism and hyperthyroidism.",
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Immunoassay Technologies</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We use advanced immunoassay technologies to ensure accurate and reliable results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "ELISA (Enzyme-Linked Immunosorbent Assay)",
                description:
                  "A plate-based assay technique designed for detecting and quantifying substances such as peptides, proteins, antibodies, and hormones.",
                image: "/placeholder.svg?height=200&width=300&text=ELISA",
              },
              {
                title: "Chemiluminescence Immunoassay",
                description:
                  "A highly sensitive technique that uses light emission to detect and quantify various substances in the blood.",
                image: "/placeholder.svg?height=200&width=300&text=Chemiluminescence",
              },
              {
                title: "Fluorescence Immunoassay",
                description:
                  "A technique that uses fluorescent compounds to detect and quantify various substances with high sensitivity.",
                image: "/placeholder.svg?height=200&width=300&text=Fluorescence",
              },
            ].map((technology, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={technology.image || "/placeholder.svg"}
                    alt={technology.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{technology.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{technology.description}</CardDescription>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Immunoassay Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced immunologists and technicians are dedicated to providing the highest quality of
                care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Neha Gupta",
                role: "Head of Immunoassay",
                bio: "Dr. Gupta has over 10 years of experience in immunology and specializes in autoimmune disorders.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Gupta",
              },
              {
                name: "Dr. Sanjay Kumar",
                role: "Senior Immunologist",
                bio: "Dr. Kumar specializes in infectious disease testing and has contributed to several research studies in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Kumar",
              },
              {
                name: "Dr. Ritu Singh",
                role: "Clinical Immunologist",
                bio: "Dr. Singh is an expert in allergy testing and has trained at prestigious institutions around the world.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Singh",
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

