"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const mockNotes = [
  {
    id: "1",
    title: "Cálculo III - Resumo do Capítulo 12",
    content:
      "Conceitos-chave do cálculo multivariável incluindo derivadas parciais, integrais múltiplas e cálculo vetorial...",
    category: "Matemática",
    lastEdited: "2 horas atrás",
    shared: false,
  },
  {
    id: "2",
    title: "Guia de Estudo de Estruturas de Dados",
    content:
      "Estruturas de dados importantes: Arrays, Listas Ligadas, Árvores, Grafos, Tabelas Hash com complexidades de tempo...",
    category: "Ciência da Computação",
    lastEdited: "1 dia atrás",
    shared: true,
  },
  {
    id: "3",
    title: "Vocabulário de Espanhol - Semana 5",
    content: "Novas palavras e frases de vocabulário aprendidas esta semana com conjugações e frases de exemplo...",
    category: "Idiomas",
    lastEdited: "3 dias atrás",
    shared: false,
  },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredNotes = mockNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Minhas Anotações</h1>
            <p className="text-gray-400 mt-1">Crie e organize suas anotações de estudo pessoais</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Anotação
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Input
              placeholder="Buscar suas anotações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  {note.shared && (
                    <Badge variant="secondary" className="ml-2">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Compartilhado
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">{note.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{note.category}</Badge>
                  <span className="text-gray-500 text-xs">{note.lastEdited}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-100 mb-2">Nenhuma anotação encontrada</h3>
              <p className="text-gray-400 mb-4">Crie sua primeira anotação para começar</p>
              <Button onClick={() => setShowCreateModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
                Criar Anotação
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {showCreateModal && <CreateNoteModal onClose={() => setShowCreateModal(false)} />}
    </DashboardLayout>
  )
}

function CreateNoteModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Criar Nova Anotação</CardTitle>
          <CardDescription>Escreva e organize suas anotações de estudo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                placeholder="ex: Resumo do Capítulo 5"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Input
                placeholder="ex: Matemática"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Conteúdo</label>
              <textarea
                className="w-full min-h-64 px-3 py-2 border border-gray-600 bg-navy-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
                placeholder="Escreva suas anotações aqui..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                Criar Anotação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
