"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockQuizzes = [
  {
    id: "1",
    title: "Fundamentos de Estruturas de Dados",
    description: "Teste seus conhecimentos sobre arrays, listas encadeadas, pilhas e filas",
    category: "Ciência da Computação",
    questionCount: 15,
    duration: 20,
    difficulty: "Intermediário",
    createdBy: "Mike Chen",
    participants: 89,
    averageScore: 78,
    status: "available",
  },
  {
    id: "2",
    title: "Teste Prático de Cálculo III",
    description: "Quiz abrangente cobrindo conceitos de cálculo multivariável",
    category: "Matemática",
    questionCount: 20,
    duration: 30,
    difficulty: "Avançado",
    createdBy: "Sarah Johnson",
    participants: 124,
    averageScore: 72,
    status: "available",
  },
  {
    id: "3",
    title: "Reações de Química Orgânica",
    description: "Identifique e preveja mecanismos de reações de química orgânica",
    category: "Química",
    questionCount: 12,
    duration: 15,
    difficulty: "Intermediário",
    createdBy: "Emily Davis",
    participants: 67,
    averageScore: 81,
    status: "available",
  },
  {
    id: "4",
    title: "Quiz de Gramática Espanhola",
    description: "Teste sua compreensão de conjugações verbais e tempos verbais em espanhol",
    category: "Idiomas",
    questionCount: 10,
    duration: 10,
    difficulty: "Iniciante",
    createdBy: "Alex Rivera",
    participants: 45,
    averageScore: 85,
    status: "completed",
  },
]

const myQuizResults = [
  { id: "4", title: "Quiz de Gramática Espanhola", score: 90, takenAt: "há 2 dias" },
  { id: "1", title: "Fundamentos de Estruturas de Dados", score: 85, takenAt: "há 1 semana" },
]

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available")

  const filteredQuizzes = mockQuizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = activeTab === "available" ? quiz.status === "available" : quiz.status === "completed"
    return matchesSearch && matchesStatus
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-green-100 text-green-700"
      case "Intermediário":
        return "bg-yellow-100 text-yellow-700"
      case "Avançado":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Quizzes</h1>
            <p className="text-gray-400 mt-1">Teste seus conhecimentos e acompanhe seu progresso</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar Quiz
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">23</p>
                  <p className="text-sm text-gray-400">Quizzes Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">82%</p>
                  <p className="text-sm text-gray-400">Pontuação Média</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-sm text-gray-400">Pontuações Perfeitas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {myQuizResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Meus Resultados Recentes</CardTitle>
              <CardDescription>Seus últimos desempenhos em quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myQuizResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                          result.score >= 90
                            ? "bg-green-100 text-green-700"
                            : result.score >= 70
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {result.score}%
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{result.title}</p>
                        <p className="text-xs text-gray-400">Realizado {result.takenAt}</p>
                      </div>
                    </div>
                    <Link href={`/dashboard/quizzes/${result.id}/results`}>
                      <Button variant="outline" size="sm">
                        Ver Resultados
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Buscar quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "available" ? "default" : "outline"}
                  onClick={() => setActiveTab("available")}
                >
                  Disponíveis
                </Button>
                <Button
                  variant={activeTab === "completed" ? "default" : "outline"}
                  onClick={() => setActiveTab("completed")}
                >
                  Completados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{quiz.category}</Badge>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Questões</p>
                      <p className="font-medium text-white">{quiz.questionCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Duração</p>
                      <p className="font-medium text-white">{quiz.duration} min</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Média</p>
                      <p className="font-medium text-white">{quiz.averageScore}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 pt-2 border-t border-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-xs">
                      Por {quiz.createdBy} • {quiz.participants} participantes
                    </span>
                  </div>

                  <Link href={`/dashboard/quizzes/${quiz.id}`}>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      {quiz.status === "completed" ? "Revisar Quiz" : "Iniciar Quiz"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showCreateModal && <CreateQuizModal onClose={() => setShowCreateModal(false)} />}
    </DashboardLayout>
  )
}

function CreateQuizModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Intermediário",
    duration: 15,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Criar Novo Quiz</CardTitle>
          <CardDescription>Configure um quiz para testar conhecimentos sobre um tópico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Título do Quiz</label>
              <Input
                placeholder="ex: Fundamentos de Estruturas de Dados"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Descrição</label>
              <textarea
                className="w-full min-h-24 px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Descreva o que este quiz abrange..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Categoria</label>
                <Input
                  placeholder="ex: Matemática"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Duração (minutos)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                Criar & Adicionar Questões
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
