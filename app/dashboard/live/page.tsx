"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"

const categories = [
  { id: "all", name: "Todas" },
  { id: "exatas", name: "Ciências Exatas" },
  { id: "humanas", name: "Ciências Humanas" },
  { id: "biologicas", name: "Ciências Biológicas" },
  { id: "tecnologia", name: "Tecnologia" },
  { id: "artes", name: "Artes e Literatura" },
]

const liveChats = [
  {
    id: 1,
    title: "Cálculo Diferencial e Integral",
    category: "exatas",
    instructor: {
      name: "Prof. Carlos Silva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 45,
    duration: "1h 30min",
    topic: "Limites e Derivadas",
    online: 45,
    lastMessage: "Alguém pode explicar o teorema do valor médio?",
    timestamp: "2 min atrás",
    image: "/mathematics-calculus.jpg",
  },
  {
    id: 2,
    title: "História do Brasil Contemporâneo",
    category: "humanas",
    instructor: {
      name: "Profa. Ana Paula",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 32,
    duration: "2h",
    topic: "República Velha",
    online: 32,
    lastMessage: "Quais foram as principais causas da Revolução de 1930?",
    timestamp: "5 min atrás",
    image: "/brazil-history-books.jpg",
  },
  {
    id: 3,
    title: "Química Orgânica Avançada",
    category: "biologicas",
    instructor: {
      name: "Dr. Roberto Lima",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 28,
    duration: "1h 15min",
    topic: "Reações de Substituição",
    online: 28,
    lastMessage: "Como diferenciar SN1 de SN2?",
    timestamp: "1 min atrás",
    image: "/organic-chemistry-molecules.png",
  },
  {
    id: 4,
    title: "Programação Python para Iniciantes",
    category: "tecnologia",
    instructor: {
      name: "Lucas Tech",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 67,
    duration: "2h 30min",
    topic: "Funções e Módulos",
    online: 67,
    lastMessage: "Como importar bibliotecas externas?",
    timestamp: "Agora",
    image: "/python-code.png",
  },
  {
    id: 5,
    title: "Física Quântica Aplicada",
    category: "exatas",
    instructor: {
      name: "Dr. Fernando Alves",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 23,
    duration: "1h 45min",
    topic: "Princípio da Incerteza",
    online: 23,
    lastMessage: "Explicação sobre o experimento da dupla fenda",
    timestamp: "10 min atrás",
    image: "/quantum-physics-particles.jpg",
  },
  {
    id: 6,
    title: "Literatura Brasileira Moderna",
    category: "artes",
    instructor: {
      name: "Profa. Mariana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 19,
    duration: "1h 20min",
    topic: "Clarice Lispector",
    online: 19,
    lastMessage: "Análise de 'A Hora da Estrela'",
    timestamp: "7 min atrás",
    image: "/literature-books-reading.jpg",
  },
  {
    id: 7,
    title: "Banco de Dados Relacionais",
    category: "tecnologia",
    instructor: {
      name: "Prof. João Santos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 41,
    duration: "2h",
    topic: "Normalização e SQL",
    online: 41,
    lastMessage: "Diferença entre INNER e LEFT JOIN?",
    timestamp: "3 min atrás",
    image: "/database-sql-server.jpg",
  },
  {
    id: 8,
    title: "Biologia Celular e Molecular",
    category: "biologicas",
    instructor: {
      name: "Dra. Patricia Souza",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 36,
    duration: "1h 40min",
    topic: "Ciclo Celular",
    online: 36,
    lastMessage: "Checkpoints da mitose",
    timestamp: "4 min atrás",
    image: "/cell-biology-microscope.png",
  },
]

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = liveChats.filter((chat) => {
    const matchesCategory = selectedCategory === "all" || chat.category === selectedCategory
    const matchesSearch =
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Ao vivo</h1>
          <p className="text-muted-foreground">
            Participe de discussões e sessões de estudo ao vivo com outros estudantes
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
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
              <Input
                type="search"
                placeholder="Buscar por tópico, instrutor ou matéria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-secondary border-border">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar Sala
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-muted-foreground">Salas Ativas</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{filteredChats.length}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Participantes Online</p>
            <p className="text-2xl font-bold text-foreground">
              {filteredChats.reduce((acc, chat) => acc + chat.online, 0)}
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Categorias</p>
            <p className="text-2xl font-bold text-foreground">{categories.length - 1}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Média de Duração</p>
            <p className="text-2xl font-bold text-foreground">1h 45min</p>
          </div>
        </div>

        {/* Live Chats Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-foreground">Salas de Estudo Ao Vivo</h2>
            <Badge variant="secondary" className="ml-2">
              {filteredChats.length} salas
            </Badge>
          </div>

          {filteredChats.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
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
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma sala encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar seus filtros ou criar uma nova sala de estudo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/dashboard/live/${chat.id}`}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <img
                      src={chat.image || "/placeholder.svg"}
                      alt={chat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
                        <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></div>
                        AO VIVO
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/50 text-white border-0">
                        {chat.duration}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Tópico: {chat.topic}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={chat.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {chat.instructor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{chat.instructor.name}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span className="font-medium text-green-500">{chat.online} online</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                    </div>

                    {/* Last Message Preview */}
                    <div className="bg-secondary/50 rounded p-2 border border-border/50">
                      <p className="text-xs text-muted-foreground line-clamp-2">{chat.lastMessage}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Category Sections */}
        <div className="space-y-6 mt-8">
          {categories.slice(1).map((category) => {
            const categoryChats = liveChats.filter((chat) => chat.category === category.id)
            if (categoryChats.length === 0) return null

            return (
              <div key={category.id}>
                <h2 className="text-xl font-semibold text-foreground mb-4">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryChats.slice(0, 4).map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/dashboard/live/${chat.id}`}
                      className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={chat.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {chat.instructor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm">
                            {chat.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{chat.instructor.name}</p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{chat.topic}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{chat.online} online</span>
                        <span>{chat.timestamp}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
