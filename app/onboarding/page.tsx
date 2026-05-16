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
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {step === "github" && (
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
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
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Upload Resume</CardTitle>
                <CardDescription>
                  Provide your declared experience to complement your code signals.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div 
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setStep("processing")}
                >
                  <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
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
            <Card className="border-2 border-primary/20 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <CardTitle className="text-2xl">Analyzing Profile</CardTitle>
                <CardDescription>
                  The Dual-Signal engine is processing your data...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <Progress value={progress} className="h-3" />
                <div className="text-sm text-muted-foreground flex flex-col gap-2">
                  <p className={progress > 10 ? "text-foreground" : ""}>Extracting GitHub repositories...</p>
                  <p className={progress > 40 ? "text-foreground" : ""}>Parsing resume timeline...</p>
                  <p className={progress > 70 ? "text-foreground" : ""}>Calculating Readiness Score...</p>
                  <p className={progress >= 100 ? "text-foreground font-medium" : ""}>
                    {progress >= 100 ? "Complete!" : "Finding best gigs..."}
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
