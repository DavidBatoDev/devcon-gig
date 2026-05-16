"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrainCircuit, Send, Sparkles, Target, Lightbulb, Code, BookOpen, User } from "lucide-react"
import { useSessionState } from "@/components/providers/session-provider"

type UiMessage = {
  role: "user" | "assistant"
  content: string
}

export default function CopilotPage() {
  const { profile } = useSessionState()
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your DEVCON Career Copilot. I can help you find roles, sharpen your profile, and plan job-ready next steps. What do you want to work on first?",
    },
  ])

  const diagnosticPrompts = [
    { icon: Target, text: "Find roles that match my current skills", accent: "text-secondary" },
    { icon: Lightbulb, text: "How can I improve my profile for AI jobs?", accent: "text-primary" },
    { icon: Code, text: "Give me 3 portfolio projects to get hired faster", accent: "text-primary" },
    { icon: BookOpen, text: "Create a 30-day interview prep roadmap", accent: "text-primary" },
  ]

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const nextMessages: UiMessage[] = [...messages, { role: "user", content: trimmed }]
    setMessages(nextMessages)
    setInput("")
    setSending(true)
    setError(null)

    try {
      const response = await fetch("/api/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-10),
        }),
      })
      const data = (await response.json()) as { reply?: string; detail?: string; message?: string }
      if (!response.ok) {
        setError(data.detail || data.message || "Copilot request failed.")
        return
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "No response returned." }])
    } catch {
      setError("Unable to reach Copilot right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const initials = (profile?.full_name || profile?.github_username || "User")
    .split(" ")
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2)

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-8rem)] w-full gap-6 overflow-hidden pb-4">
        <div className="hidden w-80 flex-col gap-4 overflow-y-auto pr-2 lg:flex">
          <div className="rounded-lg border border-[#d8e2f2] bg-white p-5 text-[#1d2c44]">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-md bg-[#e8f0ff] p-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold">Diagnostics</h2>
            </div>
            <p className="mb-6 text-sm text-[#607a9f]">
              Prompts to help you find roles, improve positioning, and get interview-ready.
            </p>
            <div className="space-y-3">
              {diagnosticPrompts.map((prompt, i) => {
                const Icon = prompt.icon
                return (
                  <button
                    key={i}
                    onClick={() => void sendMessage(prompt.text)}
                    className="group flex w-full items-start gap-3 rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3 text-left text-sm transition-all hover:border-primary/30 hover:bg-[#eff5ff]"
                  >
                    <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${prompt.accent} transition-transform group-hover:scale-110`} />
                    <span className="text-[#2f4e76]">{prompt.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <Card className="flex flex-1 flex-col overflow-hidden border-[#d8e2f2] bg-white text-[#1d2c44]">
          <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[85%] gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-[#d8e2f2]">
                    {msg.role === "user" ? (
                      <>
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>{initials || <User className="h-4 w-4" />}</AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`whitespace-pre-wrap rounded-lg p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary font-medium text-primary-foreground"
                        : "border border-[#d8e2f2] bg-[#f8fbff] text-[#2f4e76]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {sending ? <p className="text-sm text-[#607a9f]">Copilot is thinking...</p> : null}
            {error ? <p className="text-sm text-[#d92d20]">{error}</p> : null}
          </div>

          <div className="border-t border-[#d8e2f2] bg-[#f8fbff] p-4">
            <div className="relative mx-auto flex max-w-4xl items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void sendMessage(input)}
                placeholder="Ask Copilot how to improve your job opportunities..."
                className="h-12 w-full rounded-lg border border-[#d8e2f2] bg-white pl-4 pr-14 text-sm text-[#1d2c44] focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                size="icon"
                className="absolute right-1.5 h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => void sendMessage(input)}
                disabled={!input.trim() || sending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-[#607a9f]">
              Copilot provides guidance; validate important career decisions independently.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
