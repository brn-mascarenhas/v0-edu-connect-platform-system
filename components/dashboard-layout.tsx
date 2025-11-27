"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface Notification {
  id: string
  type: "message" | "material" | "member" | "quiz" | "event"
  title: string
  description: string
  time: string
  read: boolean
  link?: string
  avatar?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Nova mensagem em Cálculo II",
    description: "Giuseppe comentou: 'Alguém pode me ajudar com o exercício 5?'",
    time: "há 5 minutos",
    read: false,
    link: "/dashboard/groups/1",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    type: "material",
    title: "Novo material adicionado",
    description: "Lucas adicionou 'Apostila de Química Orgânica.pdf' em Química Orgânica",
    time: "há 15 minutos",
    read: false,
    link: "/dashboard/materials",
  },
  {
    id: "3",
    type: "member",
    title: "Novo membro na comunidade",
    description: "Maria Silva entrou no grupo Programação Python",
    time: "há 1 hora",
    read: false,
    link: "/dashboard/groups/2",
  },
  {
    id: "4",
    type: "quiz",
    title: "Quiz disponível",
    description: "Novo quiz 'Introdução ao React' está disponível",
    time: "há 2 horas",
    read: true,
    link: "/dashboard/quizzes",
  },
  {
    id: "5",
    type: "event",
    title: "Sessão de estudo amanhã",
    description: "Lembre-se: Revisão de Física Quântica às 14h",
    time: "há 3 horas",
    read: true,
    link: "/dashboard/groups/3",
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length
    setUnreadCount(unread)
  }, [notifications])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        )
      case "material":
        return (
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )
      case "member":
        return (
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        )
      case "quiz":
        return (
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
      case "event":
        return (
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
    }
  }

  const navigation = [
    {
      name: "Início",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1.447.894L15 14M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M5 10a2 2 0 11-4 0 2 2 0 014 0zm6 3a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "Comunidades",
      href: "/dashboard/groups",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "Ao vivo",
      href: "/dashboard/live",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Materiais",
      href: "/dashboard/materials",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Progresso",
      href: "/dashboard/quizzes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      name: "Atividades",
      href: "/dashboard/notes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-sidebar border-r border-sidebar-border">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-6 mb-8">
              <Image src="/images/image-2016.png" alt="EduConnect Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-sidebar-foreground">EduConnect</span>
            </Link>

            <div className="px-6 mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">MENU</p>
            </div>

            <nav className="flex-1 space-y-1 px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-sidebar-primary/20 text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex flex-shrink-0 border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 hover:bg-sidebar-accent rounded-lg p-2 transition-colors">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Meu Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/preferences">Preferências</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-sidebar border-b border-sidebar-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/images/image-2016.png" alt="EduConnect Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-bold text-sidebar-foreground">EduConnect</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6 text-sidebar-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-sidebar-border p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <header className="bg-sidebar border-b border-sidebar-border sticky top-0 z-10">
          <div className="py-4 px-6 flex items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
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
                  placeholder="Pesquisar..."
                  className="pl-10 bg-secondary border-border text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <svg
                      className="w-6 h-6 text-sidebar-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 max-h-[500px] overflow-y-auto">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <DropdownMenuLabel className="text-base font-semibold p-0">Notificações</DropdownMenuLabel>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="h-7 text-xs text-primary hover:text-primary"
                      >
                        Marcar todas como lida
                      </Button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <p className="text-sm text-muted-foreground">Nenhuma notificação</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 hover:bg-accent cursor-pointer transition-colors ${!notification.read ? "bg-accent/50" : ""}`}
                          onClick={() => {
                            markAsRead(notification.id)
                            if (notification.link) {
                              router.push(notification.link)
                            }
                          }}
                        >
                          <div className="flex gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium text-foreground leading-tight">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
