"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const mockResults = {
  quizTitle: "Fundamentos de Estruturas de Dados",
  score: 85,
  correctAnswers: 17,
  totalQuestions: 20,
  timeSpent: 18,
  questionResults: [
    {
      question: "Qual é a complexidade de tempo para acessar um elemento em um array por índice?",
      userAnswer: "O(1)",
      correctAnswer: "O(1)",
      isCorrect: true,
    },
    {
      question: "Qual estrutura de dados segue o princípio LIFO?",
      userAnswer: "Pilha",
      correctAnswer: "Pilha",
      isCorrect: true,
    },
    {
      question: "Qual é a principal vantagem de uma lista encadeada?",
      userAnswer: "Acesso mais rápido",
      correctAnswer: "Tamanho dinâmico",
      isCorrect: false,
    },
  ],
}

export default function QuizResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number.parseInt(searchParams.get("score") || "85")

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-900"
    if (score >= 70) return "bg-yellow-900"
    return "bg-red-900"
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div
              className={`w-24 h-24 ${getScoreBgColor(score)} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
            </div>
            <CardTitle className="text-2xl">Quiz Completado!</CardTitle>
            <CardDescription>Veja como você se saiu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Pontuação</p>
                <p className="text-2xl font-bold text-white">{score}%</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Respostas Corretas</p>
                <p className="text-2xl font-bold text-white">4/5</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Tempo Gasto</p>
                <p className="text-2xl font-bold text-white">18 min</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard/quizzes" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Voltar aos Quizzes
                </Button>
              </Link>
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Revisar Respostas</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhamento de Desempenho</CardTitle>
            <CardDescription>Suas respostas comparadas às corretas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.questionResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 border-l-4 rounded-lg ${
                    result.isCorrect ? "border-green-500 bg-green-950" : "border-red-500 bg-red-950"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        result.isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {result.isCorrect ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white mb-2">{result.question}</p>
                      <div className="space-y-1 text-sm">
                        <p className={result.isCorrect ? "text-green-400" : "text-red-400"}>
                          Sua resposta: <span className="font-medium">{result.userAnswer}</span>
                        </p>
                        {!result.isCorrect && (
                          <p className="text-green-400">
                            Resposta correta: <span className="font-medium">{result.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
