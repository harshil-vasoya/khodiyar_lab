"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, Share2, Bookmark, Heart, Activity, Droplets, Thermometer, WormIcon as Virus, FileText, FlaskRoundIcon as Flask, Microscope, Pill, Stethoscope, Syringe, Clipboard, AlertCircle, CheckCircle, XCircle, Clock, User, Users, Shield, Zap } from 'lucide-react'

// Sample blog posts data - in a real app, this would come from a database or API
const blogPosts = [
  {
    id: 1,
    title: "Understanding Blood Test Results: A Complete Guide",
    excerpt: "Learn how to interpret your blood test results and what the different values mean for your health.",
    content: `
      <div class="flex items-center justify-center mb-6">
        <div class="bg-primary/10 p-4 rounded-full">
          <span class="text-primary text-4xl">🔬</span>
        </div>
      </div>

      <p>Blood tests are one of the most common diagnostic tools used by healthcare providers. They provide valuable information about your overall health and can help detect a wide range of conditions, from infections to chronic diseases.</p>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><Droplets class="h-6 w-6 text-primary" /> Common Blood Tests and What They Mean</h2>
      
      <h3 class="flex items-center gap-2 mt-6 mb-3"><FileText class="h-5 w-5 text-primary" /> Complete Blood Count (CBC)</h3>
      <p>A complete blood count measures several components of your blood, including:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Red Blood Cells (RBCs):</strong> These cells carry oxygen from your lungs to the rest of your body. Low RBC count may indicate anemia, while a high count could suggest dehydration or other conditions.</li>
        <li><strong>White Blood Cells (WBCs):</strong> These cells help fight infections. An elevated WBC count often indicates an infection or inflammation, while a low count might suggest an immune system disorder.</li>
        <li><strong>Platelets:</strong> These cell fragments help your blood clot. Low platelet count can lead to easy bruising and bleeding, while high counts might increase the risk of blood clots.</li>
        <li><strong>Hemoglobin:</strong> This protein in red blood cells carries oxygen. Low levels might indicate anemia or blood loss.</li>
        <li><strong>Hematocrit:</strong> This measures the percentage of red blood cells in your blood. Low hematocrit might indicate anemia, while high levels could suggest dehydration.</li>
      </ul>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
        <div class="flex">
          <div class="flex-shrink-0 text-blue-500 mr-2">⚠️</div>
          <p><strong>Important:</strong> Reference ranges for blood tests can vary between laboratories and may be adjusted based on age, sex, and other factors.</p>
        </div>
      </div>
      
      <h3 class="flex items-center gap-2 mt-6 mb-3"><div class="text-primary">🧪</div> Basic Metabolic Panel (BMP)</h3>
      <p>This test measures different chemicals in your blood, including:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Glucose:</strong> Blood sugar levels that are too high might indicate diabetes, while low levels could suggest hypoglycemia.</li>
        <li><strong>Calcium:</strong> Important for bone health, nerve function, and blood clotting.</li>
        <li><strong>Electrolytes:</strong> Sodium, potassium, and chloride are essential for proper cell function.</li>
        <li><strong>Kidney Function Tests:</strong> Blood urea nitrogen (BUN) and creatinine help assess kidney function.</li>
      </ul>
      
      <h3 class="flex items-center gap-2 mt-6 mb-3"><div class="text-primary">❤️</div> Lipid Panel</h3>
      <p>This test measures fats in your blood, including:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Total Cholesterol:</strong> High levels increase the risk of heart disease.</li>
        <li><strong>HDL Cholesterol:</strong> Often called "good" cholesterol, higher levels are generally better.</li>
        <li><strong>LDL Cholesterol:</strong> Often called "bad" cholesterol, lower levels are generally better.</li>
        <li><strong>Triglycerides:</strong> A type of fat in the blood; high levels may increase the risk of heart disease.</li>
      </ul>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="flex justify-center mb-2 text-green-500">✓</div>
          <h4 class="font-medium">Normal Range</h4>
          <p class="text-sm">Values within the reference range</p>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg text-center">
          <div class="flex justify-center mb-2 text-yellow-500">⚠️</div>
          <h4 class="font-medium">Borderline</h4>
          <p class="text-sm">Values slightly outside the reference range</p>
        </div>
        <div class="bg-red-50 p-4 rounded-lg text-center">
          <div class="flex justify-center mb-2 text-red-500">⚠️</div>
          <h4 class="font-medium">Abnormal</h4>
          <p class="text-sm">Values significantly outside the reference range</p>
        </div>
      </div>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">📋</div> Understanding Your Results</h2>
      
      <p>When you receive your blood test results, you'll typically see your values alongside a "reference range." This range represents what's considered normal for that particular test. If your results fall outside this range, it doesn't necessarily mean you have a health problem, but it might warrant further investigation.</p>
      
      <p>Several factors can affect your blood test results, including:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>Age and sex</li>
        <li>Medications you're taking</li>
        <li>Diet and fasting status</li>
        <li>Exercise habits</li>
        <li>Hydration levels</li>
        <li>Time of day the blood was drawn</li>
      </ul>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">🩺</div> When to Consult Your Doctor</h2>
      
      <p>Always discuss your blood test results with your healthcare provider. They can help interpret the results in the context of your overall health and medical history. Don't hesitate to ask questions if you don't understand something about your results.</p>
      
      <p>If your results show significant abnormalities, your doctor might recommend:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>Repeating the test to confirm the results</li>
        <li>Additional tests to gather more information</li>
        <li>Changes to your diet or lifestyle</li>
        <li>Medication adjustments</li>
        <li>Referral to a specialist</li>
      </ul>
      
      <div class="bg-primary/10 p-4 rounded-lg my-6">
        <h4 class="font-medium flex items-center gap-2 mb-2">
          <div class="text-primary">⏱️</div> Regular Monitoring
        </h4>
        <p>For many conditions, regular blood tests are essential for monitoring your health over time. Your doctor may recommend periodic testing to track changes and adjust treatment as needed.</p>
      </div>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">✓</div> Conclusion</h2>
      
      <p>Blood tests are valuable tools for monitoring your health and detecting potential problems early. By understanding what these tests measure and what the results mean, you can take a more active role in managing your health.</p>
      
      <p>Remember, regular check-ups and blood tests are an important part of preventive healthcare. They can help identify issues before they become serious and guide treatment decisions for existing conditions.</p>
    `,
    date: "2023-11-15",
    category: "Health Education",
    image: "/placeholder.svg?height=400&width=800&text=Blood+Test+Results",
    author: "Dr. Patel",
    authorTitle: "Chief Pathologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Patel",
  },
  {
    id: 2,
    title: "The Importance of Regular Health Check-ups",
    excerpt: "Discover why preventive health check-ups are crucial for early detection and management of health conditions.",
    content: `
      <div class="flex items-center justify-center mb-6">
        <div class="bg-primary/10 p-4 rounded-full">
          <span class="text-primary text-4xl">🩺</span>
        </div>
      </div>

      <p>Regular health check-ups are a cornerstone of preventive healthcare. They allow healthcare providers to detect potential health issues before they become serious problems, monitor existing conditions, and provide guidance on maintaining a healthy lifestyle.</p>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">🛡️</div> Why Regular Check-ups Matter</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="border rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="text-primary">⚠️</div>
            <h3 class="font-medium">Early Detection</h3>
          </div>
          <p>Many serious conditions like cancer, diabetes, and heart disease can be treated more effectively when caught early. Regular check-ups increase the chances of early detection.</p>
        </div>
        <div class="border rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="text-primary">📊</div>
            <h3 class="font-medium">Disease Prevention</h3>
          </div>
          <p>Your doctor can identify risk factors for common diseases and help you take steps to prevent them from developing.</p>
        </div>
        <div class="border rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="text-primary">⏱️</div>
            <h3 class="font-medium">Monitoring Existing Conditions</h3>
          </div>
          <p>For those with chronic conditions, regular check-ups help monitor the effectiveness of treatments and make adjustments as needed.</p>
        </div>
        <div class="border rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="text-primary">⚡</div>
            <h3 class="font-medium">Improved Health Outcomes</h3>
          </div>
          <p>Studies show that people who have regular check-ups tend to have better health outcomes and live longer.</p>
        </div>
      </div>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">📋</div> What to Expect During a Health Check-up</h2>
      
      <p>A comprehensive health check-up typically includes:</p>
      
      <ul class="list-disc pl-6 space-y-3 my-4">
        <li>
          <strong>Medical history review:</strong> Your doctor will ask about your personal and family medical history, current medications, allergies, and lifestyle habits.
        </li>
        <li>
          <strong>Vital signs check:</strong> This includes measuring your blood pressure, heart rate, respiratory rate, and temperature.
        </li>
        <li>
          <strong>Physical examination:</strong> Your doctor will examine your body, including your heart, lungs, abdomen, and skin, to check for any abnormalities.
        </li>
        <li>
          <strong>Laboratory tests:</strong> Blood and urine tests can provide information about your cholesterol levels, blood sugar, kidney and liver function, and more.
        </li>
        <li>
          <strong>Screening tests:</strong> Depending on your age, sex, and risk factors, your doctor may recommend specific screening tests such as mammograms, colonoscopies, or prostate exams.
        </li>
      </ul>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
        <div class="flex">
          <div class="flex-shrink-0 text-blue-500 mr-2">⚠️</div>
          <p><strong>Important:</strong> The specific components of your health check-up may vary based on your age, sex, family history, and personal risk factors.</p>
        </div>
      </div>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">📅</div> How Often Should You Have a Check-up?</h2>
      
      <p>The frequency of health check-ups depends on various factors, including your age, sex, health status, and risk factors. Here are some general guidelines:</p>
      
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-3 text-left">Age Group</th>
              <th class="border p-3 text-left">Recommended Frequency</th>
              <th class="border p-3 text-left">Key Screenings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3">18-39 years</td>
              <td class="border p-3">Every 1-3 years</td>
              <td class="border p-3">Blood pressure, cholesterol, diabetes (if at risk)</td>
            </tr>
            <tr>
              <td class="border p-3">40-49 years</td>
              <td class="border p-3">Every 1-2 years</td>
              <td class="border p-3">Blood pressure, cholesterol, diabetes, cancer screenings</td>
            </tr>
            <tr>
              <td class="border p-3">50-64 years</td>
              <td class="border p-3">Annually</td>
              <td class="border p-3">Blood pressure, cholesterol, diabetes, colorectal cancer, other cancer screenings</td>
            </tr>
            <tr>
              <td class="border p-3">65+ years</td>
              <td class="border p-3">Annually</td>
              <td class="border p-3">All of the above plus bone density, hearing, and vision tests</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>Remember, these are general guidelines. Your doctor may recommend more frequent check-ups if you have chronic conditions or specific risk factors.</p>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">👤</div> Making the Most of Your Check-up</h2>
      
      <p>To get the most benefit from your health check-up:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>Prepare a list of questions or concerns to discuss with your doctor.</li>
        <li>Bring a list of all medications, supplements, and vitamins you're taking.</li>
        <li>Be honest about your lifestyle habits, including diet, exercise, smoking, and alcohol consumption.</li>
        <li>Follow through with any recommended follow-up tests or specialist referrals.</li>
        <li>Take notes during your appointment or bring someone with you to help remember important information.</li>
      </ul>
      
      <div class="bg-primary/10 p-4 rounded-lg my-6">
        <h4 class="font-medium flex items-center gap-2 mb-2">
          <div class="text-primary">✓</div> Pro Tip
        </h4>
        <p>Consider scheduling your next check-up before leaving the doctor's office. This helps ensure you stay on track with your preventive healthcare schedule.</p>
      </div>
      
      <h2 class="flex items-center gap-2 mt-8 mb-4"><div class="text-primary">✓</div> Conclusion</h2>
      
      <p>Regular health check-ups are an investment in your long-term health and well-being. By detecting potential health issues early and monitoring existing conditions, you can work with your healthcare provider to maintain optimal health and prevent serious complications.</p>
      
      <p>Remember, prevention is always better than cure. Make regular health check-ups a priority in your healthcare routine.</p>
    `,
    date: "2023-11-10",
    category: "Preventive Care",
    image: "/placeholder.svg?height=400&width=800&text=Health+Check-ups",
    author: "Dr. Sharma",
    authorTitle: "Preventive Medicine Specialist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Sharma",
  },
  // Other blog posts remain the same...
  {
    id: 3,
    title: "Diabetes Management: The Role of Regular Testing",
    excerpt: "How regular blood glucose monitoring can help manage diabetes effectively and prevent complications.",
    content: `... Content for blog post 3 ...`,
    date: "2023-11-05",
    category: "Chronic Conditions",
    image: "/placeholder.svg?height=400&width=800&text=Diabetes+Management",
    author: "Dr. Desai",
    authorTitle: "Endocrinologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Desai",
  },
  {
    id: 4,
    title: "Thyroid Disorders: Symptoms and Diagnosis",
    excerpt: "Understanding thyroid disorders, their symptoms, and how laboratory tests can help in diagnosis.",
    content: `... Content for blog post 4 ...`,
    date: "2023-10-28",
    category: "Health Education",
    image: "/placeholder.svg?height=400&width=800&text=Thyroid+Disorders",
    author: "Dr. Shah",
    authorTitle: "Endocrinologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Shah",
  },
  {
    id: 5,
    title: "Anemia: Causes, Symptoms, and Diagnosis",
    excerpt: "Learn about the different types of anemia, their causes, symptoms, and how they are diagnosed.",
    content: `... Content for blog post 5 ...`,
    date: "2023-10-20",
    category: "Health Education",
    image: "/placeholder.svg?height=400&width=800&text=Anemia",
    author: "Dr. Patel",
    authorTitle: "Hematologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Patel",
  },
  {
    id: 6,
    title: "COVID-19 Testing: What You Need to Know",
    excerpt: "Understanding the different types of COVID-19 tests, when to get tested, and what the results mean.",
    content: `... Content for blog post 6 ...`,
    date: "2023-10-15",
    category: "Infectious Diseases",
    image: "/placeholder.svg?height=400&width=800&text=COVID-19+Testing",
    author: "Dr. Sharma",
    authorTitle: "Infectious Disease Specialist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Sharma",
  },
  {
    id: 7,
    title: "Heart Health: Understanding Cardiac Markers",
    excerpt: "Learn about cardiac markers and how they help diagnose heart conditions and assess heart health.",
    content: `... Content for blog post 7 ...`,
    date: "2023-10-10",
    category: "Cardiac Health",
    image: "/placeholder.svg?height=400&width=800&text=Cardiac+Markers",
    author: "Dr. Desai",
    authorTitle: "Cardiologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Desai",
  },
  {
    id: 8,
    title: "Liver Function Tests: What They Reveal About Your Health",
    excerpt: "Understanding liver function tests and what abnormal results might indicate about your liver health.",
    content: `... Content for blog post 8 ...`,
    date: "2023-10-05",
    category: "Health Education",
    image: "/placeholder.svg?height=400&width=800&text=Liver+Function+Tests",
    author: "Dr. Shah",
    authorTitle: "Hepatologist",
    authorImage: "/placeholder.svg?height=100&width=100&text=Dr.+Shah",
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Properly unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const [blogPost, setBlogPost] = useState<any>(null)
  
  useEffect(() => {
    // Find the blog post with the matching ID
    const id = parseInt(unwrappedParams.id)
    const post = blogPosts.find(post => post.id === id)
    
    if (post) {
      setBlogPost(post)
    }
  }, [unwrappedParams.id])

  if (!blogPost) {
    return (
      <div className="container max-w-4xl py-12 md:py-16 lg:py-24 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p>If this message persists, the blog post may not exist.</p>
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      <article className="container max-w-4xl py-12 md:py-16 lg:py-24 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary" className="text-xs font-normal">
                {blogPost.category}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(blogPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{blogPost.title}</h1>
            <p className="text-xl text-gray-500">{blogPost.excerpt}</p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={blogPost.authorImage || "/placeholder.svg"}
                alt={blogPost.author}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{blogPost.author}</div>
              <div className="text-sm text-muted-foreground">{blogPost.authorTitle}</div>
            </div>
          </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
          <img src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} className="h-full w-full object-cover" />
        </div>

        <div className="prose prose-green max-w-none prose-headings:font-bold prose-headings:text-primary-foreground prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-li:text-base prose-li:leading-7 prose-table:border-collapse prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-td:p-2 prose-img:rounded-md" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </article>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Related Articles</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                You might also be interested in these articles
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {blogPosts
              .filter(post => post.id !== blogPost.id)
              .slice(0, 3)
              .map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
                      <p className="line-clamp-2 mt-2 text-sm text-gray-500">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
