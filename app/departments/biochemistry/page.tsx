import DepartmentLayout from "@/components/layout/department-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Beaker, Heart, Droplet, Dna, Thermometer, Activity } from "lucide-react"

export default function BiochemistryPage() {
  return (
    <DepartmentLayout
      title="Biochemistry Department"
      description="Advanced analysis of blood chemistry, hormones, and other biological markers for comprehensive health assessment"
      image="/placeholder.svg?height=500&width=700&text=Biochemistry+Lab"
    >
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Biochemistry Department</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our Biochemistry Department specializes in the analysis of blood chemistry, hormones, enzymes, and
                  other biological markers. We use cutting-edge technology to provide accurate and reliable results for
                  a wide range of biochemical tests.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of experienced biochemists and technicians work together to ensure that all tests are
                  performed with precision and results are interpreted correctly to aid in the diagnosis and treatment
                  of various medical conditions.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full">
                <img
                  src="/placeholder.svg?height=350&width=600&text=Biochemistry+Team"
                  alt="Biochemistry Team"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Biochemistry Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of biochemical tests to assess various aspects of your health
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                icon: Heart,
                title: "Lipid Profile",
                description: "Measures cholesterol and triglycerides to assess heart disease risk.",
              },
              {
                icon: Beaker,
                title: "Liver Function Tests",
                description: "Measures enzymes and proteins to assess liver health and function.",
              },
              {
                icon: Droplet,
                title: "Kidney Function Tests",
                description: "Measures waste products to assess kidney health and function.",
              },
              {
                icon: Thermometer,
                title: "Thyroid Function Tests",
                description: "Measures thyroid hormones to assess thyroid health and function.",
              },
              {
                icon: Activity,
                title: "Cardiac Markers",
                description: "Measures proteins released during heart damage to diagnose heart attacks.",
              },
              {
                icon: Dna,
                title: "Hormone Analysis",
                description: "Measures hormone levels to diagnose endocrine disorders.",
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
                Our biochemistry department helps diagnose and monitor a wide range of medical conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Diabetes",
                description:
                  "A group of metabolic disorders characterized by high blood sugar levels over a prolonged period.",
              },
              {
                title: "Liver Disease",
                description:
                  "Various conditions that affect the liver, including hepatitis, cirrhosis, and fatty liver disease.",
              },
              {
                title: "Kidney Disease",
                description:
                  "Various conditions that affect the kidneys, including chronic kidney disease and kidney stones.",
              },
              {
                title: "Thyroid Disorders",
                description: "Conditions that affect the thyroid gland, including hypothyroidism and hyperthyroidism.",
              },
              {
                title: "Heart Disease",
                description:
                  "Various conditions that affect the heart, including coronary artery disease and heart failure.",
              },
              {
                title: "Hormonal Imbalances",
                description:
                  "Conditions caused by too much or too little of a hormone, affecting various bodily functions.",
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
                title: "Automated Chemistry Analyzers",
                description:
                  "Advanced analyzers that provide rapid and accurate results for a wide range of biochemical tests.",
                image: "/placeholder.svg?height=200&width=300&text=Chemistry+Analyzer",
              },
              {
                title: "Immunoassay Analyzers",
                description:
                  "Sophisticated instruments used to measure hormone levels and other proteins with high sensitivity.",
                image: "/placeholder.svg?height=200&width=300&text=Immunoassay+Analyzer",
              },
              {
                title: "Electrolyte Analyzers",
                description:
                  "Specialized equipment for measuring electrolytes like sodium, potassium, and chloride in blood and other fluids.",
                image: "/placeholder.svg?height=200&width=300&text=Electrolyte+Analyzer",
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Biochemistry Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experienced biochemists and technicians are dedicated to providing the highest quality of
                care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Dr. Meera Shah",
                role: "Head of Biochemistry",
                bio: "Dr. Shah has over 12 years of experience in clinical biochemistry and specializes in endocrine disorders.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Shah",
              },
              {
                name: "Dr. Vikram Mehta",
                role: "Senior Biochemist",
                bio: "Dr. Mehta specializes in cardiac markers and has contributed to several research studies in the field.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Mehta",
              },
              {
                name: "Dr. Anita Joshi",
                role: "Clinical Biochemist",
                bio: "Dr. Joshi is an expert in liver and kidney function tests and has trained at prestigious institutions.",
                image: "/placeholder.svg?height=200&width=200&text=Dr.+Joshi",
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

