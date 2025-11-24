"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const recentActivity = [
    { id: 1, type: "group", title: "Entrou em 'Grupo de Estudo de Cálculo Avançado'", time: "2 horas atrás" },
    { id: 2, type: "material", title: "Enviou 'Notas de Álgebra Linear.pdf'", time: "5 horas atrás" },
    { id: 3, type: "quiz", title: "Completou 'Quiz de Estruturas de Dados' - Pontuação: 85%", time: "1 dia atrás" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Sessão de Estudo de Redes de Computadores", date: "Hoje, 18:00" },
    { id: 2, title: "Revisão em Grupo de Design de Banco de Dados", date: "Amanhã, 15:00" },
    { id: 3, title: "Quiz de Análise de Algoritmos", date: "Sexta-feira, 14:00" },
  ]

  const featuredContent = [
    {
      id: 1,
      title: "Aprendendo Química: Funções orgânicas",
      author: "Giuseppe",
      views: "58",
      weeks: "2 semanas atrás",
      image: "/organic-molecules.png",
      bgColor: "from-teal-500/80 to-cyan-600/80",
      category: "Química",
    },
    {
      id: 2,
      title: "Literatura: Machado de Assis",
      author: "Tony Santos",
      views: "34",
      weeks: "2 semanas atrás",
      image: "/book-literature-machado-de-assis.jpg",
      bgColor: "from-amber-700/80 to-orange-800/80",
      category: "Literatura",
    },
  ]

  const activeChats = [
    {
      id: 1,
      title: "Lógica de programação com Python",
      author: "Kenia",
      online: 53,
      weeks: "2 semanas atrás",
      image: "/python-programming-logo.jpg",
      status: "online",
    },
    {
      id: 2,
      title: "Análise de dados e Dashboards",
      author: "Robson",
      online: 24,
      weeks: "2 semanas atrás",
      image: "/data-analytics-dashboard.png",
      status: "online",
    },
    {
      id: 3,
      title: "Programação orientada a objeto",
      author: "Nadionilto",
      online: 23,
      weeks: "2 semanas atrás",
      image: "/coffee-cup-coding-workspace.jpg",
      status: "online",
    },
    {
      id: 4,
      title: "Desenho técnico",
      author: "Douglas",
      online: 14,
      weeks: "2 semanas atrás",
      image: "/technical-drawing-blueprint.jpg",
      status: "online",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Descobrir</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featuredContent.map((content) => (
            <Link key={content.id} href={`/dashboard/groups/${content.id}`}>
              <Card className="group relative overflow-hidden h-64 bg-card border-border hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                <div className="absolute inset-0">
                  <img
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${content.bgColor}`}></div>
                </div>
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white text-balance leading-tight">{content.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white/50">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-white/20 text-white">
                          {content.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{content.author}</p>
                        <p className="text-xs text-white/80">
                          {content.views} Views • {content.weeks}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {content.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">Chats ativos</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeChats.map((chat) => (
              <Link key={chat.id} href={`/dashboard/groups/${chat.id}`}>
                <Card className="group overflow-hidden bg-card border-border hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={chat.image || "/placeholder.svg"}
                      alt={chat.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end gap-3">
                        <Avatar className="w-12 h-12 border-2 border-white/50 relative">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {chat.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                          {chat.status === "online" && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-xs text-white/80">{chat.author}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{chat.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {chat.online} Online • {chat.weeks}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Visão Geral</h2>
            <p className="text-muted-foreground mt-1">Aqui está o que está acontecendo com seus estudos hoje.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">Grupos de Estudo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground mt-1">3 ativos essa semana</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">Materiais Compartilhados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">48</div>
                <p className="text-xs text-muted-foreground mt-1">15 este mês</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">Questionários Realizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">23</div>
                <p className="text-xs text-muted-foreground mt-1">Pontuação média: 82%</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">Sequência de Estudos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">7 dias</div>
                <p className="text-xs text-muted-foreground mt-1">Continue assim!</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Atividade Recente</CardTitle>
                <CardDescription>Suas últimas ações no EduConnect</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {activity.type === "group" && (
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        )}
                        {activity.type === "material" && (
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 00-2-2V5a2 2 0 002-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                        {activity.type === "quiz" && (
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Próximos Eventos</CardTitle>
                <CardDescription>Suas sessões de estudo e questionários agendados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent border-border text-foreground hover:bg-accent/10"
                >
                  Ver Todos os Eventos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
              <CardDescription>Comece suas atividades de estudo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/groups">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-6 flex-col gap-2 bg-transparent border-border hover:bg-accent/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Criar Grupo de Estudo
                  </Button>
                </Link>

                <Link href="/dashboard/materials">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-6 flex-col gap-2 bg-transparent border-border hover:bg-accent/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Enviar Material
                  </Button>
                </Link>

                <Link href="/dashboard/quizzes">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-6 flex-col gap-2 bg-transparent border-border hover:bg-accent/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Criar Questionário
                  </Button>
                </Link>

                <Link href="/dashboard/search">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-6 flex-col gap-2 bg-transparent border-border hover:bg-accent/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Encontrar Grupos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
