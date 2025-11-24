"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const mockSearchResults = {
  groups: [
    {
      id: "1",
      type: "group",
      name: "Advanced Calculus Study Group",
      description: "Weekly study sessions for Calculus III students",
      memberCount: 24,
      category: "Mathematics",
    },
    {
      id: "2",
      type: "group",
      name: "Data Structures & Algorithms",
      description: "Collaborative problem-solving and algorithm practice",
      memberCount: 18,
      category: "Computer Science",
    },
  ],
  materials: [
    {
      id: "1",
      type: "material",
      title: "Linear Algebra Complete Notes.pdf",
      description: "Comprehensive notes covering all topics",
      category: "Mathematics",
      uploadedBy: "Sarah Johnson",
      downloads: 45,
      rating: 4.8,
    },
    {
      id: "2",
      type: "material",
      title: "Data Structures Cheat Sheet",
      description: "Quick reference for common data structures",
      category: "Computer Science",
      uploadedBy: "Mike Chen",
      downloads: 128,
      rating: 4.9,
    },
  ],
  users: [
    {
      id: "1",
      type: "user",
      name: "Sarah Johnson",
      course: "Mathematics",
      university: "MIT",
      bio: "Math major interested in calculus and linear algebra",
    },
    {
      id: "2",
      type: "user",
      name: "Mike Chen",
      course: "Computer Science",
      university: "Stanford",
      bio: "CS student passionate about algorithms and data structures",
    },
    {
      id: "3",
      type: "user",
      name: "Emily Davis",
      course: "Chemistry",
      university: "Harvard",
      bio: "Chemistry student specializing in organic chemistry",
    },
  ],
  courses: [
    {
      id: "1",
      type: "course",
      name: "Calculus III",
      description: "Multivariable calculus and vector analysis",
      category: "Mathematics",
      studyGroups: 8,
      materials: 45,
    },
    {
      id: "2",
      type: "course",
      name: "Data Structures",
      description: "Fundamental data structures and algorithms",
      category: "Computer Science",
      studyGroups: 12,
      materials: 67,
    },
  ],
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    // Simulate search
    setTimeout(() => setIsSearching(false), 500)
  }

  const filteredGroups = mockSearchResults.groups.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredMaterials = mockSearchResults.materials.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUsers = mockSearchResults.users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCourses = mockSearchResults.courses.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const hasResults = searchQuery.trim() !== ""

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search & Discovery</h1>
          <p className="text-gray-600 mt-1">Find groups, materials, students, and courses</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search for groups, materials, students, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSearching}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {!hasResults ? (
          /* Discover Section */
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Calculus",
                  "Data Structures",
                  "Organic Chemistry",
                  "Spanish",
                  "Physics",
                  "Machine Learning",
                  "Statistics",
                  "Biology",
                ].map((topic) => (
                  <Button key={topic} variant="outline" onClick={() => setSearchQuery(topic)}>
                    {topic}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Study Groups</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mockSearchResults.groups.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {group.memberCount}
                          </div>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>
                        <Link href={`/dashboard/groups/${group.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Materials This Week</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mockSearchResults.materials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-medium">{material.rating}</span>
                          </div>
                          <span className="text-gray-600">{material.downloads} downloads</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">
                All ({filteredGroups.length + filteredMaterials.length + filteredUsers.length + filteredCourses.length})
              </TabsTrigger>
              <TabsTrigger value="groups">Groups ({filteredGroups.length})</TabsTrigger>
              <TabsTrigger value="materials">Materials ({filteredMaterials.length})</TabsTrigger>
              <TabsTrigger value="users">Students ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="courses">Courses ({filteredCourses.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Groups Results */}
              {filteredGroups.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Study Groups</h3>
                  <div className="space-y-3">
                    {filteredGroups.map((group) => (
                      <Card key={group.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{group.name}</h4>
                              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  {group.memberCount} members
                                </div>
                                <Badge variant="outline">{group.category}</Badge>
                              </div>
                            </div>
                            <Link href={`/dashboard/groups/${group.id}`}>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Group</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials Results */}
              {filteredMaterials.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Study Materials</h3>
                  <div className="space-y-3">
                    {filteredMaterials.map((material) => (
                      <Card key={material.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{material.title}</h4>
                              <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="font-medium">{material.rating}</span>
                                </div>
                                <span className="text-gray-600">{material.downloads} downloads</span>
                                <Badge variant="outline">{material.category}</Badge>
                              </div>
                            </div>
                            <Button variant="outline">Download</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Results */}
              {filteredUsers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Students</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredUsers.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-gray-600">
                                {user.course} • {user.university}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">{user.bio}</p>
                              <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                                Connect
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {filteredCourses.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Courses</h3>
                  <div className="space-y-3">
                    {filteredCourses.map((course) => (
                      <Card key={course.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{course.name}</h4>
                              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{course.studyGroups} study groups</span>
                                <span>{course.materials} materials</span>
                                <Badge variant="outline">{course.category}</Badge>
                              </div>
                            </div>
                            <Button variant="outline">Explore</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredGroups.length === 0 &&
                filteredMaterials.length === 0 &&
                filteredUsers.length === 0 &&
                filteredCourses.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600">Try searching with different keywords</p>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            <TabsContent value="groups">
              <div className="space-y-3">
                {filteredGroups.map((group) => (
                  <Card key={group.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{group.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              {group.memberCount} members
                            </div>
                            <Badge variant="outline">{group.category}</Badge>
                          </div>
                        </div>
                        <Link href={`/dashboard/groups/${group.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Group</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="materials">
              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{material.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-medium">{material.rating}</span>
                            </div>
                            <span className="text-gray-600">{material.downloads} downloads</span>
                            <Badge variant="outline">{material.category}</Badge>
                          </div>
                        </div>
                        <Button variant="outline">Download</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="grid md:grid-cols-2 gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">
                            {user.course} • {user.university}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">{user.bio}</p>
                          <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="space-y-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{course.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{course.studyGroups} study groups</span>
                            <span>{course.materials} materials</span>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                        </div>
                        <Button variant="outline">Explore</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}
