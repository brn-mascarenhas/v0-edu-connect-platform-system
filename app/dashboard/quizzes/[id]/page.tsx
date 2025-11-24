"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const mockQuiz = {
  id: "1",
  title: "Fundamentos de Estruturas de Dados",
  description: "Teste seus conhecimentos sobre arrays, listas encadeadas, pilhas e filas",
  category: "Ciência da Computação",
  difficulty: "Intermediário",
  duration: 20,
  questions: [
    {
      id: "1",
      question: "Qual é a complexidade de tempo para acessar um elemento em um array por índice?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
    },
    {
      id: "2",
      question: "Qual estrutura de dados segue o princípio LIFO (Last In First Out)?",
      options: ["Fila", "Pilha", "Array", "Lista Encadeada"],
      correctAnswer: 1,
    },
    {
      id: "3",
      question: "Qual é a principal vantagem de uma lista encadeada sobre um array?",
      options: [
        "Acesso mais rápido aos elementos",
        "Tamanho dinâmico e inserções/remoções eficientes",
        "Melhor localidade de memória",
        "Implementação mais simples",
      ],
      correctAnswer: 1,
    },
    {
      id: "4",
      question: "Em uma fila, onde novos elementos são adicionados?",
      options: ["Frente", "Traseira", "Meio", "Posição aleatória"],
      correctAnswer: 1,
    },
    {
      id: "5",
      question: "Qual é a complexidade de espaço de um algoritmo recursivo que tem n chamadas recursivas?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
    },
  ],
}

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.duration * 60)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!quizStarted || quizCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setQuizCompleted(true)
    const correctAnswers = Object.entries(selectedAnswers).filter(
      ([questionIndex, answerIndex]) =>
        mockQuiz.questions[Number.parseInt(questionIndex)].correctAnswer === answerIndex,
    ).length
    const score = Math.round((correctAnswers / mockQuiz.questions.length) * 100)

    setTimeout(() => {
      router.push(`/dashboard/quizzes/${params.id}/results?score=${score}`)
    }, 1500)
  }

  if (!quizStarted) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{mockQuiz.title}</CardTitle>
                  <CardDescription>{mockQuiz.description}</CardDescription>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">{mockQuiz.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Questões</p>
                    <p className="font-semibold text-white">{mockQuiz.questions.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Duração</p>
                    <p className="font-semibold text-white">{mockQuiz.duration} minutos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Nota Mínima</p>
                    <p className="font-semibold text-white">70%</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-950 border border-teal-800 rounded-lg p-4">
                <h3 className="font-semibold text-teal-300 mb-2">Instruções</h3>
                <ul className="text-sm text-teal-200 space-y-1 list-disc list-inside">
                  <li>Você tem {mockQuiz.duration} minutos para completar o quiz</li>
                  <li>Selecione uma resposta para cada questão</li>
                  <li>Você pode navegar entre as questões usando os botões Anterior e Próximo</li>
                  <li>Envie seu quiz quando estiver pronto ou quando o tempo acabar</li>
                  <li>Você não pode pausar ou retomar o quiz uma vez iniciado</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setQuizStarted(true)}
                >
                  Iniciar Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (quizCompleted) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Enviado!</h2>
              <p className="text-gray-400">Calculando seus resultados...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const question = mockQuiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold text-lg text-white">{formatTime(timeRemaining)}</span>
              </div>
              <span className="text-sm text-gray-400">
                Questão {currentQuestion + 1} de {mockQuiz.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion + 1}. {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-teal-600 bg-teal-950"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index ? "border-teal-600 bg-teal-600" : "border-gray-600"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex-1 bg-transparent"
          >
            Anterior
          </Button>
          {currentQuestion < mockQuiz.questions.length - 1 ? (
            <Button onClick={handleNextQuestion} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Próximo
            </Button>
          ) : (
            <Button onClick={handleSubmitQuiz} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Enviar Quiz
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
