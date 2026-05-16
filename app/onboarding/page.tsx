"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, CheckCircle2, Loader2, FileText } from "lucide-react"
import { GithubIcon } from "@/components/icons"

type Step = "github" | "resume" | "processing"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("github")
  const [progress, setProgress] = useState(0)

  // Simulate AI processing
  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => router.push("/dashboard"), 500)
            return 100
          }
          return prev + 5
        })
      }, 150)
      return () => clearInterval(interval)
    }
  }, [step, router])

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className={`h-2.5 w-16 rounded-full ${step === "github" ? "bg-primary shadow-[0_0_10px_rgba(0,229,255,0.6)]" : "bg-primary/20"}`} />
            <div className={`h-2.5 w-16 rounded-full ${step === "resume" ? "bg-primary shadow-[0_0_10px_rgba(0,229,255,0.6)]" : step === "processing" ? "bg-primary/20" : "bg-muted"}`} />
            <div className={`h-2.5 w-16 rounded-full ${step === "processing" ? "bg-primary shadow-[0_0_10px_rgba(0,229,255,0.6)]" : "bg-muted"}`} />
          </div>
          
          {step === "github" && (
            <Card className="glass shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                  <GithubIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Connect GitHub</CardTitle>
                <CardDescription>
                  We need read access to your public repos, commits, and PRs to evaluate your Proof-of-Work.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Read public repositories</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Analyze commit history</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Review Pull Requests</p>
                </div>
                <Button className="w-full h-12 text-base gap-2" onClick={() => setStep("resume")}>
                  Authorize DEVCON GIG
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "resume" && (
            <Card className="glass shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Upload Resume</CardTitle>
                <CardDescription>
                  Provide your declared experience to complement your code signals.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div 
                  className="w-full rounded-xl border-2 border-dashed border-border/50 bg-background/50 hover:bg-background/80 transition-colors p-8 flex flex-col items-center justify-center gap-4 text-muted-foreground cursor-pointer"
                  onClick={() => setStep("processing")}
                >
                  <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto" />
                  <p className="font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF or TXT (max. 5MB)</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Button variant="ghost" onClick={() => setStep("processing")}>
                    Skip for now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "processing" && (
            <Card className="glass shadow-[0_0_30px_rgba(0,229,255,0.1)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <CardTitle className="text-2xl">AI Data Fusion</CardTitle>
                <CardDescription>
                  Fusing GitHub metrics with your declared experience...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="h-3 w-full bg-background/50 rounded-full overflow-hidden border border-border/50">
                  <div className="h-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm text-muted-foreground flex flex-col gap-3 font-mono">
                  <p className={progress > 10 ? "text-foreground" : ""}>Fetching Repositories...</p>
                  <p className={progress > 40 ? "text-foreground" : ""}>Calculating Commit Activity & PR Counts...</p>
                  <p className={progress > 70 ? "text-foreground" : ""}>Compiling Language Matrix...</p>
                  <p className={progress >= 100 ? "text-foreground font-medium" : ""}>
                    {progress >= 100 ? "Profile Synced!" : "Finalizing..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
