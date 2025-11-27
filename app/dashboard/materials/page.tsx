"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockMaterials = [
  {
    id: "1",
    title: "Notas Completas de Álgebra Linear.pdf",
    description: "Notas abrangentes cobrindo todos os tópicos do semestre",
    category: "Matemática",
    difficulty: "Intermediário",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2 dias atrás",
    downloads: 45,
    rating: 4.8,
    type: "pdf",
    size: "2.4 MB",
  },
  {
    id: "2",
    title: "Guia Rápido de Estruturas de Dados",
    description: "Referência rápida para estruturas de dados comuns e suas complexidades",
    category: "Ciência da Computação",
    difficulty: "Iniciante",
    uploadedBy: "Mike Chen",
    uploadedAt: "5 dias atrás",
    downloads: 128,
    rating: 4.9,
    type: "pdf",
    size: "856 KB",
  },
  {
    id: "3",
    title: "Template de Relatório de Laboratório de Química Orgânica",
    description: "Template profissional para relatórios de laboratório com formatação adequada",
    category: "Química",
    difficulty: "Intermediário",
    uploadedBy: "Emily Davis",
    uploadedAt: "1 semana atrás",
    downloads: 67,
    rating: 4.5,
    type: "pdf",
    size: "1.2 MB",
  },
  {
    id: "4",
    title: "Vídeos de Aula de Machine Learning",
    description: "Aulas gravadas do curso de ML com exemplos",
    category: "Ciência da Computação",
    difficulty: "Avançado",
    uploadedBy: "Alex Rivera",
    uploadedAt: "3 dias atrás",
    downloads: 89,
    rating: 4.7,
    type: "video",
    size: "450 MB",
  },
]

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || material.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case "video":
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        )
    }
  }

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
            <h1 className="text-3xl font-bold text-foreground">Materiais de Estudo</h1>
            <p className="text-gray-600 mt-1">Navegue e compartilhe recursos de aprendizado</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Enviar Material
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Buscar materiais por título ou descrição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="Matemática">Matemática</SelectItem>
                  <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
                  <SelectItem value="Química">Química</SelectItem>
                  <SelectItem value="Física">Física</SelectItem>
                  <SelectItem value="Idiomas">Idiomas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Níveis</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-100">248</p>
                  <p className="text-sm text-gray-400">Total de Materiais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-100">12</p>
                  <p className="text-sm text-gray-400">Seus Uploads</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-100">1.2K</p>
                  <p className="text-sm text-gray-400">Total de Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      material.type === "pdf"
                        ? "bg-red-100"
                        : material.type === "video"
                          ? "bg-purple-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {getFileIcon(material.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{material.category}</Badge>
                    <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
                    <span className="text-xs text-gray-500">{material.size}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{material.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>{material.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div className="text-xs text-gray-500">
                      Por {material.uploadedBy} • {material.uploadedAt}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Visualizar
                    </Button>
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Baixar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-100 mb-2">Nenhum material encontrado</h3>
              <p className="text-gray-400">Tente ajustar sua busca ou filtros</p>
            </CardContent>
          </Card>
        )}
      </div>

      {showUploadModal && <UploadMaterialModal onClose={() => setShowUploadModal(false)} />}
    </DashboardLayout>
  )
}

function UploadMaterialModal({ onClose }: { onClose: () => void }) {
  const [uploadMethod, setUploadMethod] = useState<"file" | "drive" | "link">("file")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    externalLink: "",
  })
  const [isConnectingDrive, setIsConnectingDrive] = useState(false)
  const [isDriveConnected, setIsDriveConnected] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onClose()
  }

  const handleConnectDrive = async () => {
    setIsConnectingDrive(true)
    // Simular conexão com Google Drive
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsDriveConnected(true)
    setIsConnectingDrive(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Enviar Material de Estudo</CardTitle>
          <CardDescription>Compartilhe suas notas, documentos ou recursos com outros estudantes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-gray-700">
                <button
                  type="button"
                  onClick={() => setUploadMethod("file")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    uploadMethod === "file"
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload de Arquivo
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod("drive")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    uploadMethod === "drive"
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  Google Drive
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod("link")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    uploadMethod === "link"
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Link Externo
                </button>
              </div>

              {/* Upload de Arquivo */}
              {uploadMethod === "file" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Selecione o arquivo</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer bg-gray-800/30">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-500 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-300 mb-1">Clique para fazer upload ou arraste e solte</p>
                    <p className="text-xs text-gray-500">PDF, DOC, PPT, XLSX ou ZIP (máx 50MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip" />
                  </div>
                </div>
              )}

              {/* Google Drive */}
              {uploadMethod === "drive" && (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                    {!isDriveConnected ? (
                      <>
                        <svg
                          className="w-16 h-16 mx-auto text-blue-500 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-200 mb-2">Conectar ao Google Drive</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          Importe arquivos diretamente da sua conta do Google Drive
                        </p>
                        <Button
                          type="button"
                          onClick={handleConnectDrive}
                          disabled={isConnectingDrive}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {isConnectingDrive ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Conectando...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              Conectar com Google Drive
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <svg className="w-12 h-12 mx-auto text-green-500 mb-3" fill="none" viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-200 mb-2">Conectado ao Google Drive</h3>
                        <p className="text-sm text-gray-400 mb-4">Selecione um arquivo para importar</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer border border-gray-600">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-200">Notas de Cálculo.pdf</p>
                              <p className="text-xs text-gray-500">2.3 MB</p>
                            </div>
                            <input type="radio" name="drive-file" className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer border border-gray-600">
                            <svg
                              className="w-8 h-8 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-200">Slides Apresentação.pptx</p>
                              <p className="text-xs text-gray-500">5.1 MB</p>
                            </div>
                            <input type="radio" name="drive-file" className="w-4 h-4" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Link Externo (YouTube/Dropbox) */}
              {uploadMethod === "link" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cole o link do recurso</label>
                    <Input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=... ou https://www.dropbox.com/..."
                      value={formData.externalLink}
                      onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                      className="bg-gray-800 border-gray-600"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-900/20 border border-red-800 rounded-lg">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="text-xs text-gray-300">YouTube</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-900/20 border border-blue-800 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 9.75l-6.562 6.562-1.72-1.72 4.843-4.843-4.844-4.843 1.72-1.72 6.563 6.564z" />
                        </svg>
                        <span className="text-xs text-gray-300">Dropbox</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-900/20 border border-purple-800 rounded-lg">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span className="text-xs text-gray-300">Outros Links</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="text-sm text-blue-300">
                        <p className="font-medium mb-1">Plataformas suportadas:</p>
                        <ul className="text-xs space-y-1 text-blue-400">
                          <li>• YouTube (vídeos e playlists)</li>
                          <li>• Dropbox (arquivos compartilhados)</li>
                          <li>• Google Drive (links públicos)</li>
                          <li>• OneDrive (links compartilhados)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Restante do formulário */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  placeholder="e.g., Notas Completas de Álgebra Linear"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                  className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva o que esse material abrange..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Idiomas">Idiomas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dificuldade</label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Iniciante">Iniciante</SelectItem>
                      <SelectItem value="Intermediário">Intermediário</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                  Enviar Material
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
