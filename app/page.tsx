import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, FileText, Zap, BrainCircuit, Users, Target, Code2 } from "lucide-react"
import { GithubIcon } from "@/components/icons"

export default function LandingPage() {
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/onboarding">
                <Button size="lg" className="h-12 px-8 gap-2 w-full sm:w-auto text-base">
                  <GithubIcon className="h-5 w-5" />
                  Connect GitHub
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-12 px-8 gap-2 w-full sm:w-auto text-base">
                  View Demo Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition (Dual-Signal Engine) */}
        <section className="border-y bg-muted/30 py-24" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">The Dual-Signal Intelligence Engine</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We evaluate your true capabilities by weighting what you build heavier than what you claim.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background border shadow-sm">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">70% Proof-of-Work</h3>
                <p className="text-muted-foreground">
                  Deep analysis of your GitHub activity, commit velocity, PR quality, and real-world code contributions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background border shadow-sm">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">30% Declared Intent</h3>
                <p className="text-muted-foreground">
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
            <Code2 className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">DEVCON GIG</span>
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
