"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    course: "",
    studyPreference: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setFormData({
        name: parsed.name || "Anderson Silva",
        email: parsed.email || "anderson@exemplo.com",
        university: parsed.university || "Universidade Federal do Tocantins",
        course: parsed.course || "Ciência da Computação",
        studyPreference: parsed.studyPreference || "Estudante matutino, aprende visualmente",
        bio: parsed.bio || "Estudante de Ciência da Computação apaixonado por programação e tecnologia.",
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...formData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setSuccess(true)
    setLoading(false)
  }

  const mockActivity = [
    { id: 1, type: "quiz", title: "Completou quiz de Cálculo III", time: "2 horas atrás" },
    { id: 2, type: "material", title: "Compartilhou Guia de Química Orgânica", time: "1 dia atrás" },
    { id: 3, type: "group", title: "Entrou no grupo Programação Python", time: "3 dias atrás" },
    { id: 4, type: "session", title: "Participou da sessão de revisão", time: "5 dias atrás" },
  ]

  const mockStats = {
    groups: 8,
    materials: 24,
    quizzes: 15,
    contributions: 42,
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header do Perfil */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-teal-600 text-white text-4xl">
                  {formData.name?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">{formData.name}</h1>
                <p className="text-gray-400 mb-3">
                  {formData.course} • {formData.university}
                </p>
                <p className="text-gray-300 mb-4">{formData.bio}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Programação</Badge>
                  <Badge variant="secondary">Matemática</Badge>
                  <Badge variant="secondary">Física</Badge>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{mockStats.groups}</div>
                <div className="text-sm text-gray-400">Grupos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{mockStats.materials}</div>
                <div className="text-sm text-gray-400">Materiais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{mockStats.quizzes}</div>
                <div className="text-sm text-gray-400">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{mockStats.contributions}</div>
                <div className="text-sm text-gray-400">Contribuições</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Aba de Atividade */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas interações na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.type === "quiz"
                            ? "bg-purple-900/30"
                            : activity.type === "material"
                              ? "bg-blue-900/30"
                              : activity.type === "group"
                                ? "bg-green-900/30"
                                : "bg-orange-900/30"
                        }`}
                      >
                        {activity.type === "quiz" && (
                          <svg
                            className="w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                        {activity.type === "material" && (
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {activity.type === "group" && (
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        )}
                        {activity.type === "session" && (
                          <svg
                            className="w-5 h-5 text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Configurações */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais e preferências</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-teal-600 text-white text-2xl">
                        {formData.name?.charAt(0).toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        Alterar Foto
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. Máx. 2MB.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled={loading} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">Universidade</Label>
                      <Input
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course">Curso</Label>
                      <Input
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyPreference">Preferências de Estudo</Label>
                    <Input
                      id="studyPreference"
                      name="studyPreference"
                      value={formData.studyPreference}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Ex: Estudante matutino, estudo em grupo, aprende visualmente"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="w-full min-h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Conte-nos sobre você, seus interesses, e o que você está estudando..."
                    />
                  </div>

                  {success && (
                    <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-sm">
                      Perfil atualizado com sucesso!
                    </div>
                  )}

                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
