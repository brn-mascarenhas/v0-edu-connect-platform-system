import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Image src="/images/image-2016.png" alt="EduConnect Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-2xl font-bold text-foreground">EduConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Começar</Button>
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Colabore, Aprenda e <span className="text-primary">Alcance o Sucesso Juntos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Junte-se a milhares de estudantes universitários conectando-se, compartilhando materiais e dominando seus
            estudos através da aprendizagem colaborativa
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg bg-transparent border-border text-foreground hover:bg-accent"
              >
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Grupos de Estudo</h3>
            <p className="text-muted-foreground">
              Crie ou participe de grupos de estudo, colabore em tempo real e conquiste mais juntos
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Compartilhar Materiais</h3>
            <p className="text-muted-foreground">
              Faça upload e compartilhe PDFs, anotações, vídeos e recursos com sua comunidade de estudos
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Quizzes Interativos</h3>
            <p className="text-muted-foreground">
              Teste seus conhecimentos com quizzes colaborativos e acompanhe seu progresso
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-card rounded-3xl shadow-sm border border-border p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10.000+</div>
              <div className="text-muted-foreground">Estudantes Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5.000+</div>
              <div className="text-muted-foreground">Grupos de Estudo</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50.000+</div>
              <div className="text-muted-foreground">Materiais Compartilhados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
