"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight, Search } from "lucide-react"

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Understanding Blood Test Results: A Complete Guide",
    excerpt: "Learn how to interpret your blood test results and what the different values mean for your health.",
    date: "2023-11-15",
    category: "Health Education",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Patel",
  },
  {
    id: 2,
    title: "The Importance of Regular Health Check-ups",
    excerpt:
      "Discover why preventive health check-ups are crucial for early detection and management of health conditions.",
    date: "2023-11-10",
    category: "Preventive Care",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Sharma",
  },
  {
    id: 3,
    title: "Diabetes Management: The Role of Regular Testing",
    excerpt: "How regular blood glucose monitoring can help manage diabetes effectively and prevent complications.",
    date: "2023-11-05",
    category: "Chronic Conditions",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Desai",
  },
  {
    id: 4,
    title: "Thyroid Disorders: Symptoms and Diagnosis",
    excerpt: "Understanding thyroid disorders, their symptoms, and how laboratory tests can help in diagnosis.",
    date: "2023-10-28",
    category: "Health Education",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Shah",
  },
  {
    id: 5,
    title: "Anemia: Causes, Symptoms, and Diagnosis",
    excerpt: "Learn about the different types of anemia, their causes, symptoms, and how they are diagnosed.",
    date: "2023-10-20",
    category: "Health Education",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Patel",
  },
  {
    id: 6,
    title: "COVID-19 Testing: What You Need to Know",
    excerpt: "Understanding the different types of COVID-19 tests, when to get tested, and what the results mean.",
    date: "2023-10-15",
    category: "Infectious Diseases",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Sharma",
  },
  {
    id: 7,
    title: "Heart Health: Understanding Cardiac Markers",
    excerpt: "Learn about cardiac markers and how they help diagnose heart conditions and assess heart health.",
    date: "2023-10-10",
    category: "Cardiac Health",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Desai",
  },
  {
    id: 8,
    title: "Liver Function Tests: What They Reveal About Your Health",
    excerpt: "Understanding liver function tests and what abnormal results might indicate about your liver health.",
    date: "2023-10-05",
    category: "Health Education",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Shah",
  },
]

// Categories
const categories = [
  "All",
  "Health Education",
  "Preventive Care",
  "Chronic Conditions",
  "Infectious Diseases",
  "Cardiac Health",
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts based on search term and selected category
  useEffect(() => {
    let filtered = blogPosts

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.author.toLowerCase().includes(searchLower),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory])

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Blog</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay informed with our latest health articles and news
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Search</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={category === selectedCategory ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Recent Posts</h2>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-2">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="line-clamp-2 text-sm font-medium">
                          <Link href={`/blog/${post.id}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or category filter to find what you're looking for.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
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
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">By {post.author}</div>
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center text-primary hover:underline"
                          >
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
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
                            className="h-4 w-4"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant="outline"
                            size="sm"
                            className={
                              currentPage === page ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                            }
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          size="icon"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
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
                            className="h-4 w-4"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

