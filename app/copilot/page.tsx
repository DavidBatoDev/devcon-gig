"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MOCK_DATA } from "@/lib/mock-data"
import { BrainCircuit, Send, User, Sparkles, Target, Lightbulb, Code, BookOpen } from "lucide-react"

export default function CopilotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! I'm your DEVCON Career Copilot. I've analyzed your Dual-Signal profile (87/100 Readiness Score). How can I help you level up today?"
    },
    {
      role: "user",
      content: "Analyze my missing skills for AI Engineering"
    },
    {
      role: "system",
      content: "Based on your target role of **AI Full Stack Engineer**, I see two primary gaps in your profile:\n\n1.  **Docker / Containerization**\n    Your projects run well locally, but production AI deployments often require robust containerization.\n    Actionable Step: Containerize your `ai-agent-framework` repository using a simple `Dockerfile` and `docker-compose.yml`.\n\n2.  **System Design Fundamentals**\n    Scaling LLM architectures requires understanding caching, load balancing, and rate limiting.\n    Actionable Step: Study the 'ByteByteGo' System Design primer and implement Redis caching in your next API endpoint.\n\nWould you like me to generate a specific learning roadmap for either of these?"
    }
  ])

  const diagnosticPrompts = [
    { icon: Target, text: "Analyze my missing skills for AI Engineering", accent: "text-secondary" },
    { icon: Lightbulb, text: "Prep me for an AI Intern interview", accent: "text-primary" },
    { icon: Code, text: "How do I improve my Next.js architecture?", accent: "text-primary" },
    { icon: BookOpen, text: "Create a 30-day learning roadmap for Rust", accent: "text-primary" }
  ]

  const handleSend = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: "user", content: text }])
    setInput("")
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "system",
        content: "Great question! Based on your profile, here's a tailored response to help you level up. I recommend starting with the foundational concepts and then building a hands-on project to reinforce the learning."
      }])
    }, 800)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-8rem)] w-full gap-6 overflow-hidden pb-4">

        {/* Left Rail: Diagnostic Prompts */}
        <div className="hidden lg:flex w-80 flex-col gap-4 overflow-y-auto pr-2">
          <div className="rounded-lg border border-[#d8e2f2] bg-white p-5 text-[#1d2c44]">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-md bg-[#e8f0ff] p-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-bold text-lg">Diagnostics</h2>
            </div>
            <p className="mb-6 text-sm text-[#607a9f]">
              Actionable prompts based on your current capabilities and target roles.
            </p>
            <div className="space-y-3">
              {diagnosticPrompts.map((prompt, i) => {
                const Icon = prompt.icon
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="group flex w-full items-start gap-3 rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3 text-left text-sm transition-all hover:border-primary/30 hover:bg-[#eff5ff]"
                  >
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${prompt.accent} group-hover:scale-110 transition-transform`} />
                    <span className="text-[#2f4e76]">{prompt.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Viewport: Chat Area */}
        <Card className="flex flex-1 flex-col overflow-hidden border-[#d8e2f2] bg-white text-[#1d2c44]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-border/50">
                    {msg.role === "user" ? (
                      <>
                        <AvatarImage src={MOCK_DATA.users.avatar_url} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-4 text-sm whitespace-pre-wrap leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground font-medium"
                        : "border border-[#d8e2f2] bg-[#f8fbff] text-[#2f4e76]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#d8e2f2] bg-[#f8fbff] p-4">
            <div className="relative max-w-4xl mx-auto flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask Copilot about your career roadmap..."
                className="h-12 w-full rounded-lg border border-[#d8e2f2] bg-white pl-4 pr-14 text-sm text-[#1d2c44] focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                size="icon"
                className="absolute right-1.5 h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-[#607a9f]">
              AI Copilot can make mistakes. Verify technical guidance.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
