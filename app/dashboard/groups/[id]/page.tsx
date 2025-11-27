"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [inCall, setInCall] = useState(false)
  const [sessionForm, setSessionForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  })

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

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nova sessão agendada:", sessionForm)
    setShowScheduleModal(false)
    setSessionForm({ title: "", date: "", time: "", location: "" })
  }

  const toggleCall = () => {
    setInCall(!inCall)
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
          <div className="flex gap-2">
            <Button
              onClick={toggleCall}
              className={inCall ? "bg-red-600 hover:bg-red-700 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}
            >
              {inCall ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                    />
                  </svg>
                  Encerrar Chamada
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Iniciar Chamada
                </>
              )}
            </Button>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Configurações
            </Button>
          </div>
        </div>

        {inCall && (
          <Card className="bg-teal-900/30 border-teal-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-gray-100 font-medium">Chamada em andamento</span>
                  <span className="text-gray-400 text-sm">3 participantes</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    Microfone
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Câmera
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Compartilhar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                <Button onClick={() => setShowScheduleModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
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
                      <Link href={`/dashboard/users/${member.id}`}>
                        <Avatar className="cursor-pointer hover:ring-2 hover:ring-teal-500 transition-all">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-teal-600 text-white">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <Link href={`/dashboard/users/${member.id}`}>
                          <p className="font-medium text-sm text-gray-100 hover:text-teal-400 cursor-pointer transition-colors">
                            {member.name}
                          </p>
                        </Link>
                        <p className="text-xs text-gray-500">{member.course}</p>
                      </div>
                      <Link href={`/dashboard/users/${member.id}`}>
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-100">Agendar Nova Sessão</h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleScheduleSession} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-200">
                      Título da Sessão
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Revisão de Cálculo III"
                      value={sessionForm.title}
                      onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-200">
                        Data
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={sessionForm.date}
                        onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-gray-200">
                        Horário
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={sessionForm.time}
                        onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-200">
                      Local / Plataforma
                    </Label>
                    <Select
                      value={sessionForm.location}
                      onValueChange={(value) => setSessionForm({ ...sessionForm, location: value })}
                      required
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="zoom" className="text-gray-100">
                          Virtual (Zoom)
                        </SelectItem>
                        <SelectItem value="meet" className="text-gray-100">
                          Virtual (Google Meet)
                        </SelectItem>
                        <SelectItem value="teams" className="text-gray-100">
                          Virtual (Microsoft Teams)
                        </SelectItem>
                        <SelectItem value="biblioteca" className="text-gray-100">
                          Biblioteca - Sala de Estudo
                        </SelectItem>
                        <SelectItem value="sala204" className="text-gray-100">
                          Biblioteca - Sala 204
                        </SelectItem>
                        <SelectItem value="laboratorio" className="text-gray-100">
                          Laboratório de Informática
                        </SelectItem>
                        <SelectItem value="outro" className="text-gray-100">
                          Outro local
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowScheduleModal(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                      Agendar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
