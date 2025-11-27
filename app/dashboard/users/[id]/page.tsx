"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados mockados do usuário
const mockUserData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Giuseppe Silva",
    course: "Química",
    university: "Universidade Federal do Tocantins",
    bio: "Apaixonado por química orgânica e reações. Adoro compartilhar conhecimento!",
    interests: ["Química Orgânica", "Bioquímica", "Laboratório"],
    stats: { groups: 5, materials: 18, quizzes: 12 },
  },
  "2": {
    id: "2",
    name: "Tony Santos",
    course: "Literatura",
    university: "Universidade de São Paulo",
    bio: "Estudante de literatura brasileira. Foco em Machado de Assis e autores do século XIX.",
    interests: ["Literatura Brasileira", "Machado de Assis", "Análise Literária"],
    stats: { groups: 7, materials: 25, quizzes: 8 },
  },
  "3": {
    id: "3",
    name: "Kenia Rodrigues",
    course: "Ciência da Computação",
    university: "Universidade Federal do Rio de Janeiro",
    bio: "Desenvolvedora Python em formação. Entusiasta de IA e Machine Learning.",
    interests: ["Python", "Machine Learning", "Data Science"],
    stats: { groups: 10, materials: 32, quizzes: 20 },
  },
  "4": {
    id: "4",
    name: "Robson Almeida",
    course: "Engenharia de Software",
    university: "Universidade Estadual de Campinas",
    bio: "Engenheiro de software focado em análise de dados e dashboards.",
    interests: ["Análise de Dados", "Dashboards", "Visualização"],
    stats: { groups: 6, materials: 22, quizzes: 15 },
  },
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = mockUserData[params.id] || mockUserData["1"]
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const mockActivity = [
    { id: 1, type: "material", title: "Compartilhou Notas de Química Orgânica", time: "1 dia atrás" },
    { id: 2, type: "quiz", title: "Completou quiz de Funções Orgânicas", time: "3 dias atrás" },
    { id: 3, type: "group", title: "Entrou no grupo Estudo de Química", time: "1 semana atrás" },
  ]

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSending(false)
    setSent(true)

    setTimeout(() => {
      setShowMessageModal(false)
      setMessage("")
      setSent(false)
    }, 2000)
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
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">{user.name}</h1>
                <p className="text-gray-400 mb-3">
                  {user.course} • {user.university}
                </p>
                <p className="text-gray-300 mb-4">{user.bio}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {user.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowMessageModal(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Adicionar Conexão
                  </Button>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{user.stats.groups}</div>
                <div className="text-sm text-gray-400">Grupos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{user.stats.materials}</div>
                <div className="text-sm text-gray-400">Materiais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{user.stats.quizzes}</div>
                <div className="text-sm text-gray-400">Quizzes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas interações de {user.name} na plataforma</CardDescription>
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
                          activity.type === "material"
                            ? "bg-blue-900/30"
                            : activity.type === "quiz"
                              ? "bg-purple-900/30"
                              : "bg-green-900/30"
                        }`}
                      >
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
                        {activity.type === "group" && (
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>Grupos</CardTitle>
                <CardDescription>Grupos dos quais {user.name} participa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center py-8">Informações de grupos não estão visíveis publicamente.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Materiais Compartilhados</CardTitle>
                <CardDescription>Materiais públicos compartilhados por {user.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center py-8">Nenhum material público disponível.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal de Mensagem Direta */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Enviar Mensagem para {user.name}</CardTitle>
                <CardDescription>Envie uma mensagem direta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="space-y-2">
                    <textarea
                      className="w-full min-h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100"
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={sending || sent}
                    />
                  </div>

                  {sent && (
                    <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-sm">
                      Mensagem enviada com sucesso!
                    </div>
                  )}

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowMessageModal(false)
                        setMessage("")
                      }}
                      disabled={sending}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={sending || sent}
                    >
                      {sending ? "Enviando..." : sent ? "Enviado!" : "Enviar"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
