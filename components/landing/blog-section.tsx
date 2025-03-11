"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/utils/use-scroll-animation"

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Understanding Blood Test Results: A Complete Guide",
    excerpt: "Learn how to interpret your blood test results and what the different values mean for your health.",
    date: "2023-11-15",
    category: "Health Education",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Importance of Regular Health Check-ups",
    excerpt:
      "Discover why preventive health check-ups are crucial for early detection and management of health conditions.",
    date: "2023-11-10",
    category: "Preventive Care",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Diabetes Management: The Role of Regular Testing",
    excerpt: "How regular blood glucose monitoring can help manage diabetes effectively and prevent complications.",
    date: "2023-11-05",
    category: "Chronic Conditions",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogSection() {
  useScrollAnimation()

  return (
    <section id="blog" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-up">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay informed with our latest health articles and news
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:shadow-lg animate-fade-up"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
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
                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-primary hover:underline">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 animate-fade-up">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

