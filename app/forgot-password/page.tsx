"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Image src="/images/image-2016.png" alt="EduConnect Logo" width={40} height={40} className="rounded-lg" />
          <span className="text-2xl font-bold text-foreground">EduConnect</span>
        </Link>

        <Card className="border-border shadow-lg bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">Redefinir sua senha</CardTitle>
            <CardDescription className="text-center">
              {submitted
                ? "Verifique seu email para instruções de redefinição"
                : "Digite seu email para receber um link de redefinição de senha"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@universidade.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Link de Redefinição"}
                </Button>
              </form>
            ) : (
              <div className="bg-primary/10 border border-primary text-card-foreground px-4 py-3 rounded-lg text-sm text-center">
                Instruções de redefinição de senha foram enviadas para {email}
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="text-primary hover:underline font-medium">
                Voltar para Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
