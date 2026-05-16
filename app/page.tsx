"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, FileText, Zap, BrainCircuit, Users, Target } from "lucide-react"
import { GithubIcon } from "@/components/icons"

type AuthState = "unauthenticated" | "sign_up" | "sign_up_github" | "sign_in" | "fully_setup"

export default function LandingPage() {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [githubUsername, setGithubUsername] = useState("")

  const handleAuthDemo = (e: React.FormEvent) => {
    e.preventDefault()
    if (authState === "sign_up") {
      setAuthState("sign_up_github")
    } else if (authState === "sign_in") {
      setAuthState("fully_setup")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Turn Contributions Into Opportunities
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              The AI-powered career intelligence platform for the DEVCON ecosystem. We match builders with roles based on real-world engineering activity, not just resumes.
            </p>
            
            {/* CTA State Machine */}
            <div className="max-w-md mx-auto pt-4 glass p-6 rounded-2xl text-left shadow-[0_0_30px_rgba(0,229,255,0.05)]">
              {authState === "unauthenticated" && (
                <div className="flex flex-col gap-4 text-center">
                  <Button 
                    size="lg" 
                    className="h-12 w-full text-base bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
                    onClick={() => setAuthState("sign_up")}
                  >
                    Create Account
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="h-12 w-full text-base border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => setAuthState("sign_in")}
                  >
                    Sign In
                  </Button>
                </div>
              )}

              {(authState === "sign_up" || authState === "sign_in") && (
                <form onSubmit={handleAuthDemo} className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-center">
                    {authState === "sign_up" ? "Sign Up for DEVCON GIG" : "Sign In"}
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@example.com" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className={`w-full mt-2 font-bold ${authState === "sign_up" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                    {authState === "sign_up" ? "Continue" : "Sign In"}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setAuthState("unauthenticated")} className="w-full">
                    Back
                  </Button>
                </form>
              )}

              {authState === "sign_up_github" && (
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Link GitHub Account</h3>
                    <p className="text-sm text-muted-foreground mt-1">We use this to calculate your Proof-of-Work score.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub Username</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. torvalds" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                    />
                  </div>
                  <Link href="/onboarding" className="w-full mt-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold" onClick={() => setAuthState("fully_setup")}>
                      Verify & Sync Profile
                    </Button>
                  </Link>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setAuthState("sign_up")} className="w-full">
                    Back
                  </Button>
                </div>
              )}

              {authState === "fully_setup" && (
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Account Linked Successfully
                  </div>
                  <Link href="/dashboard" className="w-full">
                    <Button size="lg" className="h-12 w-full text-base gap-2">
                      Go to Dashboard <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => setAuthState("unauthenticated")}>Reset Demo State</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Value Proposition (Dual-Signal Engine) */}
        <section className="border-y border-border/50 bg-[#131B2F]/30 py-24" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">The Dual-Signal Intelligence Engine</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We evaluate your true capabilities by weighting what you build heavier than what you claim.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-8 rounded-2xl glass shadow-sm">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">70% Proof-of-Work</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep analysis of your GitHub activity, commit velocity, PR quality, and real-world code contributions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl glass shadow-sm">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(232,202,4,0.3)]">
                  <FileText className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">30% Declared Intent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your resume, past experiences, and educational background provide context to your engineering trajectory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-24" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Platform Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to navigate your engineering career.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Profile Analyzer</h3>
                <p className="text-muted-foreground">
                  Get an objective AI Readiness Score based on your public code and identify critical skill gaps.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gig Matching Engine</h3>
                <p className="text-muted-foreground">
                  Discover AI engineering roles, internships, and open-source bounties tailored to your unique stack.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <BrainCircuit className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Career Copilot</h3>
                <p className="text-muted-foreground">
                  Chat with an expert agent to generate learning roadmaps, prep for interviews, or decide on your next project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/dv_rectangle.png" alt="DEVCON GIG" width={100} height={24} className="h-6 w-auto opacity-70" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} DEVCON Ecosystem. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-500"></div> System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
