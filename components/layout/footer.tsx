import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10 bg-gray-50">
      <div className="container flex flex-col gap-4 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-primary">Khodiyar Pathology</h3>
            <p className="text-sm text-muted-foreground">Accurate diagnostics for better health</p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">Quick Links</h3>
            <Link href="/about" className="text-sm text-gray-500 hover:text-primary">
              About Us
            </Link>
            <Link href="/services" className="text-sm text-gray-500 hover:text-primary">
              Services
            </Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-primary">
              Contact
            </Link>
            <Link href="/book-appointment" className="text-sm text-gray-500 hover:text-primary">
              Book Appointment
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">Departments</h3>
            <Link href="/departments/hematology" className="text-sm text-gray-500 hover:text-primary">
              Hematology
            </Link>
            <Link href="/departments/biochemistry" className="text-sm text-gray-500 hover:text-primary">
              Biochemistry
            </Link>
            <Link href="/departments/immunoassay" className="text-sm text-gray-500 hover:text-primary">
              Immunoassay
            </Link>
            <Link href="/departments/clinical-pathology" className="text-sm text-gray-500 hover:text-primary">
              Clinical Pathology
            </Link>
            <Link href="/departments/histopathology" className="text-sm text-gray-500 hover:text-primary">
              Histopathology
            </Link>
            <Link href="/departments/microbiology" className="text-sm text-gray-500 hover:text-primary">
              Microbiology
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">Contact Us</h3>
            <p className="text-sm text-gray-500">123 Main Street, Ahmedabad, Gujarat, India</p>
            <p className="text-sm text-gray-500">+91 9876543210</p>
            <p className="text-sm text-gray-500">info@khodiyarpathology.com</p>
            <p className="text-sm text-gray-500">Mon-Sat: 7:00 AM - 9:00 PM</p>
            <p className="text-sm text-gray-500">Sunday: 8:00 AM - 2:00 PM</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Khodiyar Pathology. All rights reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-gray-500 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

