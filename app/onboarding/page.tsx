"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Dice5, FileUp, Sparkles } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSessionState } from "@/components/providers/session-provider"
import { GithubIcon } from "@/components/icons"
import type { CareerProfile, GigMatch, ProfileGenerateResponse } from "@/lib/types"

type Step = 1 | 2 | 3

const LOADING_MESSAGES = [
  "Analyzing Resume",
  "Analyzing GitHub",
  "Finding Amazing Projects",
  "Looking to know you more",
  "Wow You're good",
]

function Stepper({ step }: { step: Step }) {
  const steps = [
    { id: 1, label: "Profile Upload" },
    { id: 2, label: "Career Profile" },
    { id: 3, label: "Gig Matching" },
  ] as const

  return (
    <div className="mb-8">
      <div className="flex items-start">
        {steps.map((s, idx) => {
          const isActive = s.id === step
          const isDone = s.id < step
          return (
            <div key={s.id} className="flex flex-1 items-start">
              <div className="flex w-full flex-col items-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl font-semibold transition ${
                    isActive
                      ? "border-[#0f2652] bg-[#0f2652] text-white shadow-[0_10px_20px_rgba(15,38,82,0.22)]"
                      : isDone
                        ? "border-[#1258e8] bg-[#e7efff] text-[#1258e8]"
                        : "border-[#d1dbe9] bg-[#eef2f7] text-[#6b85aa]"
                  }`}
                >
                  {s.id}
                </div>
                <p
                  className={`mt-3 text-sm font-medium ${
                    isActive ? "text-[#0f2652]" : isDone ? "text-[#1258e8]" : "text-[#89a0c0]"
                  }`}
                >
                  {s.label}
                </p>
              </div>
              {idx < steps.length - 1 ? (
                <div className="mx-4 mt-6 h-1 flex-1 rounded-full bg-[#d8e1ee]" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RollingLoader({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#d9e3f3] bg-white p-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f1ff]">
        <Dice5 className="h-5 w-5 animate-spin text-[#1258e8]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#1a2c47]">Working on it...</p>
        <p className="text-sm text-[#4f6c95]">{LOADING_MESSAGES[index]}</p>
      </div>
    </div>
  )
}

function toStep1Markdown(data: ProfileGenerateResponse): string {
  const gh = data.analysis.github
  const rs = data.analysis.resume
  const skills =
    gh.detected_skills?.map((s) => `- ${s.skill} (${Math.round((s.confidence || 0) * 100)}%)`).join("\n") ||
    "- No detected skills found."
  const strengths = gh.engineering_strengths?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const declared = rs.declared_skills?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const signals = gh.ai_readiness_signals?.map((s) => `- ${s}`).join("\n") || "- None listed."

  return `## GitHub + Resume Findings

### Detected Skills
${skills}

### Engineering Strengths
${strengths}

### Declared Resume Skills
${declared}

### AI Readiness Signals
${signals}

### Narrative
${data.narrative || "No narrative returned."}
`
}

function toStep2Markdown(data: CareerProfile): string {
  const strengths = data.strengths?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const missing = data.missing_skills?.map((s) => `- ${s}`).join("\n") || "- None listed."

  return `## Career Profile

### Readiness Score
**${data.readiness_score}/100**

### Role Match
${data.role_match || "Not provided"}

### Strengths
${strengths}

### Missing Skills
${missing}

### Recommended Career Path
${data.recommended_career_path || "Not provided"}

### Narrative
${data.narrative || "No narrative returned."}
`
}

export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboardingProfile, setCareerProfile, setGigMatches, onboardingProfile, careerProfile, gigMatches } =
    useSessionState()

  const [step, setStep] = useState<Step>(1)
  const [githubUsername, setGithubUsername] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step1Done, setStep1Done] = useState(false)
  const [step2Done, setStep2Done] = useState(false)
  const [step3Done, setStep3Done] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const loadMe = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (!response.ok) return
        const data = (await response.json()) as { profile?: { github_username?: string | null } }
        if (data.profile?.github_username) {
          setGithubUsername(data.profile.github_username)
        }
      } catch {
        // keep default
      }
    }
    void loadMe()
  }, [])

  useEffect(() => {
    if (!loading) return
    const id = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 1200)
    return () => clearInterval(id)
  }, [loading])

  const step1Markdown = useMemo(() => (onboardingProfile ? toStep1Markdown(onboardingProfile) : ""), [onboardingProfile])
  const step2Markdown = useMemo(() => (careerProfile ? toStep2Markdown(careerProfile) : ""), [careerProfile])

  const validateResume = (file: File | null): string | null => {
    if (!file) return "Resume PDF is required."
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    if (!isPdf) return "Resume must be a PDF file."
    if (file.size > 5 * 1024 * 1024) return "Resume must be 5MB or smaller."
    return null
  }

  const runStep1 = async () => {
    const username = githubUsername.trim()
    const resumeErr = validateResume(resumeFile)
    if (!username) {
      setError("GitHub username is required.")
      return
    }
    if (resumeErr) {
      setError(resumeErr)
      return
    }
    setLoading(true)
    setError(null)
    setMsgIndex(0)
    try {
      const form = new FormData()
      form.append("github_url", `https://github.com/${username}`)
      form.append("resume", resumeFile as File)
      const response = await fetch("/api/profile/generate", { method: "POST", body: form })
      const data = (await response.json()) as ProfileGenerateResponse & { detail?: string }
      if (!response.ok) {
        setError(data.detail || "Profile generation failed.")
        return
      }
      setOnboardingProfile(data)
      setStep1Done(true)
    } catch {
      setError("Unable to process Step 1.")
    } finally {
      setLoading(false)
    }
  }

  const runStep2 = async () => {
    setLoading(true)
    setError(null)
    setMsgIndex(0)
    try {
      const response = await fetch("/api/career/generate", { method: "POST" })
      const data = (await response.json()) as CareerProfile & { detail?: string }
      if (!response.ok) {
        setError(data.detail || "Career generation failed.")
        return
      }
      setCareerProfile(data)
      setStep2Done(true)
    } catch {
      setError("Unable to process Step 2.")
    } finally {
      setLoading(false)
    }
  }

  const runStep3 = async () => {
    setLoading(true)
    setError(null)
    setMsgIndex(0)
    try {
      const response = await fetch("/api/gigs/match", { method: "POST" })
      const data = (await response.json()) as { matches?: GigMatch[]; detail?: string }
      if (!response.ok) {
        setError(data.detail || "Gig matching failed.")
        return
      }
      setGigMatches(data.matches || [])
      setStep3Done(true)
    } catch {
      setError("Unable to process Step 3.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <Header showActions={false} light />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-[#1d2c44]">Onboarding</h1>
        <p className="mt-1 text-sm text-[#607a9f]">Complete all 3 steps to unlock your dashboard.</p>
        <Stepper step={step} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#d8e2f2] bg-[#f7faff]">
            <CardHeader>
              <CardTitle className="text-[#1d2c44]">
                {step === 1 ? "Step 1 Actions" : step === 2 ? "Create Career Profile In one click" : "Find your gigs"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="relative">
                    <GithubIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6080ad]" />
                    <input
                      type="text"
                      value={githubUsername}
                      disabled
                      readOnly
                      className="w-full rounded-md border border-[#ccd9ed] bg-[#eaf0fa] px-9 py-2.5 text-sm text-[#35517a]"
                    />
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragOver(false)
                      const file = e.dataTransfer.files?.[0] || null
                      setResumeFile(file)
                    }}
                    className={`rounded-lg border-2 border-dashed p-6 text-center transition ${
                      dragOver ? "border-[#1258e8] bg-[#edf3ff]" : "border-[#c8d5ea] bg-white"
                    }`}
                  >
                    <FileUp className="mx-auto h-8 w-8 text-[#1258e8]" />
                    <p className="mt-2 text-sm font-medium text-[#27466f]">Drag and drop your resume PDF</p>
                    <p className="text-xs text-[#6b85aa]">or click to choose file (max 5MB)</p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="mt-3 w-full text-sm text-[#5f7ea8]"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                    {resumeFile ? <p className="mt-2 text-xs text-[#27466f]">Selected: {resumeFile.name}</p> : null}
                  </div>

                  <Button className="w-full" onClick={runStep1} disabled={loading}>
                    {loading ? "Generating profile..." : "Generate Step 1"}
                  </Button>
                  <div className="mt-2 flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="min-w-28 rounded-2xl border-[#cfd9e8] bg-[#f3f6fb] px-7 text-[#90a0b8] hover:bg-[#eaf0f7]"
                      onClick={() => router.push("/")}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    {step1Done ? (
                      <Button
                        className="min-w-28 rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        onClick={() => setStep(2)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="min-w-28 rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        disabled
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <Button className="w-full" onClick={runStep2} disabled={loading}>
                    {loading ? "Creating career profile..." : "Create Career Profile"}
                  </Button>
                  <div className="mt-2 flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="min-w-28 rounded-2xl border-[#cfd9e8] bg-[#f3f6fb] px-7 text-[#5f7597] hover:bg-[#eaf0f7]"
                      onClick={() => setStep(1)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    {step2Done ? (
                      <Button
                        className="min-w-28 rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        onClick={() => setStep(3)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="min-w-28 rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        disabled
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <Button className="w-full" onClick={runStep3} disabled={loading}>
                    {loading ? "Finding gigs..." : "Find Gigs"}
                  </Button>
                  <div className="mt-2 flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="min-w-28 rounded-2xl border-[#cfd9e8] bg-[#f3f6fb] px-7 text-[#5f7597] hover:bg-[#eaf0f7]"
                      onClick={() => setStep(2)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    {step3Done && gigMatches.length > 0 ? (
                      <Button
                        className="rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        onClick={() => router.push("/dashboard")}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="min-w-28 rounded-2xl bg-[#0f2652] px-7 text-white hover:bg-[#0b1d3f]"
                        disabled
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </>
              ) : null}

              {error ? <p className="text-sm text-[#d92d20]">{error}</p> : null}
            </CardContent>
          </Card>

          <Card className="border-[#d8e2f2] bg-white">
            <CardHeader>
              <CardTitle className="text-[#1d2c44]">{loading ? "Loading..." : "Results"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? <RollingLoader index={msgIndex} /> : null}

              {step === 1 && !loading ? (
                onboardingProfile ? (
                  <div className="max-h-[420px] overflow-y-auto rounded-md border border-[#d9e3f3] bg-[#f8fbff] p-4 text-sm">
                    <article className="max-w-none leading-6 text-[#1d2c44] [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mb-3 [&_p]:text-[#2f4e76] [&_li]:ml-5 [&_li]:list-disc [&_li]:text-[#2f4e76] [&_strong]:text-[#1d2c44]">
                      <ReactMarkdown>{step1Markdown}</ReactMarkdown>
                    </article>
                  </div>
                ) : (
                  <p className="text-sm text-[#607a9f]">Upload your resume and GitHub username to begin.</p>
                )
              ) : null}

              {step === 2 && !loading ? (
                careerProfile ? (
                  <div className="max-h-[420px] overflow-y-auto rounded-md border border-[#d9e3f3] bg-[#f8fbff] p-4 text-sm">
                    <article className="max-w-none leading-6 text-[#1d2c44] [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mb-3 [&_p]:text-[#2f4e76] [&_li]:ml-5 [&_li]:list-disc [&_li]:text-[#2f4e76] [&_strong]:text-[#1d2c44]">
                      <ReactMarkdown>{step2Markdown}</ReactMarkdown>
                    </article>
                  </div>
                ) : (
                  <p className="text-sm text-[#607a9f]">Create your career profile in one click.</p>
                )
              ) : null}

              {step === 3 && !loading ? (
                gigMatches.length > 0 ? (
                  <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                    {gigMatches.slice(0, 5).map((match) => (
                      <div key={match.gig_id} className="rounded-lg border border-[#d9e3f3] bg-[#f8fbff] p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <p className="font-semibold text-[#1d2c44]">{match.gig.title}</p>
                          <span className="rounded-full bg-[#e8f0ff] px-2 py-1 text-xs font-semibold text-[#1258e8]">
                            {match.match_percentage}%
                          </span>
                        </div>
                        <p className="mb-2 text-xs uppercase tracking-wide text-[#6b85aa]">{match.gig.type}</p>
                        <p className="text-sm text-[#2f4e76]">{match.explanation}</p>
                        {match.missing_requirements?.length > 0 ? (
                          <p className="mt-2 text-xs text-[#8a5f00]">
                            Missing: {match.missing_requirements.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#607a9f]">Start finding gigs to see your top matches.</p>
                )
              ) : null}

              {!loading && step3Done && gigMatches.length === 0 ? (
                <div className="rounded-md border border-[#e0e7f4] bg-[#f8fbff] p-3 text-sm text-[#4c6d97]">
                  <Sparkles className="mr-2 inline h-4 w-4 text-[#1258e8]" />
                  No gigs returned yet. Try running Step 3 again.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
