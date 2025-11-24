"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    university: "",
    course: "",
    studyPreference: "",
    bio: "",
  })
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user profile
      const updatedUser = { ...user, ...formData, profileComplete: true }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      router.push("/dashboard")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0a1929] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-gray-700 shadow-lg bg-[#0f2744]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Complete seu Perfil</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Conte-nos um pouco mais sobre você para aproveitar ao máximo o EduConnect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-teal-600 text-white text-2xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-gray-300">
                    Universidade
                  </Label>
                  <Input
                    id="university"
                    name="university"
                    type="text"
                    placeholder="ex: USP, UNICAMP"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="bg-[#1a3a52] border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course" className="text-gray-300">
                    Curso
                  </Label>
                  <Input
                    id="course"
                    name="course"
                    type="text"
                    placeholder="ex: Ciência da Computação"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="bg-[#1a3a52] border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyPreference" className="text-gray-300">
                  Preferência de Estudo
                </Label>
                <Input
                  id="studyPreference"
                  name="studyPreference"
                  type="text"
                  placeholder="ex: Estudo em grupo, Visual, Manhã"
                  value={formData.studyPreference}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-[#1a3a52] border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio (Opcional)
                </Label>
                <textarea
                  id="bio"
                  name="bio"
                  className="w-full min-h-24 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#1a3a52] text-white placeholder:text-gray-500"
                  placeholder="Conte-nos sobre você, seus interesses, e o que você esta estudando..."
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-[#1a3a52]"
                  onClick={() => router.push("/dashboard")}
                  disabled={loading}
                >
                  Pular por enquanto
                </Button>
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" disabled={loading}>
                  {loading ? "Salvando..." : "Concluir Configuração"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
