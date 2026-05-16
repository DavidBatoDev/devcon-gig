"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MOCK_DATA } from "@/lib/mock-data"
import { BrainCircuit, Send, User, Sparkles, Map, Code, BookOpen } from "lucide-react"

export default function CopilotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content: "Hi Alex! I'm your AI Career Copilot. Based on your Dual-Signal profile, I see you're targeting AI Full Stack roles. How can I help you today?"
    }
  ])

  const presetPrompts = [
    { title: "Generate Roadmap", icon: Map, prompt: "Create a 3-month learning roadmap to bridge my gap in System Design Fundamentals." },
    { title: "Mock Interview Prep", icon: Code, prompt: "Give me a mock technical interview question for a Senior Next.js Developer role." },
    { title: "Suggest Next Project", icon: BookOpen, prompt: "Suggest an open-source project I can contribute to that uses Docker and React." },
  ]

  const handleSend = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: "user", content: text }])
    setInput("")
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "agent", 
        content: `I'd be happy to help with that! Given your strong background in Next.js, focusing on that area makes a lot of sense. \n\nHere is a suggested action plan:\n1. **Review Basics**: Check out our curated guides.\n2. **Build a Demo**: A simple CRUD app using Docker.\n3. **Apply**: Check the Gig Matching tab for roles that fit this new skill.` 
      }])
    }, 1000)
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Career Copilot</h1>
          <p className="text-muted-foreground mt-2">
            Your personal advisor for navigating the DEVCON ecosystem.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          
          {/* Sidebar / Preset Prompts */}
          <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Suggested Actions</h3>
            {presetPrompts.map((preset, i) => {
              const Icon = preset.icon
              return (
                <button
                  key={i}
                  onClick={() => handleSend(preset.prompt)}
                  className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium leading-snug">{preset.title}</span>
                </button>
              )
            })}
          </div>

          {/* Chat Window */}
          <Card className="flex-1 flex flex-col shadow-sm border-muted overflow-hidden">
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0 border">
                      {msg.role === "user" ? (
                        <>
                          <AvatarImage src={MOCK_DATA.user.avatar_url} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </>
                      ) : (
                        <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground">
                          <BrainCircuit className="h-4 w-4" />
                        </div>
                      )}
                    </Avatar>
                    
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      {msg.role === "agent" && i === 0 && (
                        <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                          <Sparkles className="h-4 w-4" /> DEVCON Agent
                        </div>
                      )}
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-background">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask Copilot anything about your career..."
                    className="w-full h-12 pl-4 pr-12 rounded-full border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                  <Button 
                    size="icon" 
                    className="absolute right-1.5 h-9 w-9 rounded-full"
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </AppLayout>
  )
}
