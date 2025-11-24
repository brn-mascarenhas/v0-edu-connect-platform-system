"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockGroupData = {
  id: "1",
  name: "Grupo de Estudo de Cálculo Avançado",
  description:
    "Sessões de estudo semanais para alunos de Cálculo III se preparando para as provas finais. Focamos em cálculo multivariável, derivadas parciais e cálculo vetorial.",
  category: "Matemática",
  isPrivate: false,
  memberCount: 24,
  createdAt: "15 de outubro de 2024",
  members: [
    { id: "1", name: "Sarah Johnson", course: "Matemática", avatar: "/placeholder.svg" },
    { id: "2", name: "Mike Chen", course: "Engenharia", avatar: "/placeholder.svg" },
    { id: "3", name: "Emily Davis", course: "Física", avatar: "/placeholder.svg" },
    { id: "4", name: "Alex Rivera", course: "Matemática", avatar: "/placeholder.svg" },
  ],
  materials: [
    {
      id: "1",
      title: "Guia de Estudo Cálculo III.pdf",
      uploadedBy: "Sarah Johnson",
      uploadedAt: "2 dias atrás",
      type: "pdf",
    },
    { id: "2", title: "Lista de Exercícios 5", uploadedBy: "Mike Chen", uploadedAt: "3 dias atrás", type: "pdf" },
    {
      id: "3",
      title: "Notas de Cálculo Vetorial",
      uploadedBy: "Emily Davis",
      uploadedAt: "1 semana atrás",
      type: "pdf",
    },
  ],
  upcomingSessions: [
    { id: "1", title: "Revisão Capítulo 12", date: "Hoje, 18:00", location: "Biblioteca Sala 204" },
    { id: "2", title: "Soluções do Simulado", date: "Sexta-feira, 16:00", location: "Virtual (Zoom)" },
  ],
}

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Sarah Johnson",
      text: "Olá pessoal! Não esqueçam nossa sessão de estudo hoje às 18h",
      time: "2 horas atrás",
    },
    {
      id: "2",
      sender: "Mike Chen",
      text: "Estarei lá! Alguém pode me ajudar com o problema 5 da tarefa?",
      time: "1 hora atrás",
    },
    {
      id: "3",
      sender: "Emily Davis",
      text: "Claro Mike! Eu resolvi esse. Podemos revisar juntos",
      time: "30 minutos atrás",
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return

    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: "Você",
        text: messageText,
        time: "Agora mesmo",
      },
    ])
    setMessageText("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Group Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-100">{mockGroupData.name}</h1>
              {mockGroupData.isPrivate && (
                <Badge variant="secondary">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Privado
                </Badge>
              )}
            </div>
            <p className="text-gray-400 mb-3">{mockGroupData.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {mockGroupData.memberCount} membros
              </div>
              <Badge variant="outline">{mockGroupData.category}</Badge>
              <span>Criado em {mockGroupData.createdAt}</span>
            </div>
          </div>
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configurações
          </Button>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="sessions">Sessões</TabsTrigger>
            <TabsTrigger value="members">Membros</TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle>Chat do Grupo</CardTitle>
                <CardDescription>Comunique-se com os membros do grupo em tempo real</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-teal-600 text-white text-sm">
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-sm text-gray-100">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{message.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                    Enviar
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Materiais Compartilhados</CardTitle>
                  <CardDescription>Arquivos e recursos compartilhados pelos membros do grupo</CardDescription>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Enviar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGroupData.materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-100">{material.title}</p>
                          <p className="text-xs text-gray-500">
                            Enviado por {material.uploadedBy} • {material.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sessões de Estudo</CardTitle>
                  <CardDescription>Reuniões e sessões de estudo agendadas</CardDescription>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Agendar Sessão
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGroupData.upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-indigo-400"
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
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-100">{session.title}</p>
                          <p className="text-xs text-gray-500">
                            {session.date} • {session.location}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Membros do Grupo ({mockGroupData.memberCount})</CardTitle>
                <CardDescription>Estudantes participando deste grupo de estudo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mockGroupData.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-teal-600 text-white">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-100">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.course}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
