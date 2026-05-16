"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import {
  User, ChevronRight, Terminal, FileText, Info, ArrowRight,
  UserCheck, GitPullRequest, Cpu, Star, CheckCircle2,
  UploadCloud, FileSpreadsheet, Sparkles, Loader2
} from "lucide-react"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSessionState } from "@/components/providers/session-provider"
import { GithubIcon } from "@/components/icons"
import type { CareerProfile, GigMatch, ProfileGenerateResponse } from "@/lib/types"

type Step = 1 | 2 | 3

const MOCK_STEP1_DAVID: ProfileGenerateResponse = {
  github_analysis_id: "mock-gh-analysis-david",
  resume_analysis_id: "mock-rs-analysis-david",
  narrative:
    "## David Bato-Dev\n\nDavid demonstrates consistent full-stack momentum with strong activity in TypeScript/Next.js projects and practical API integration work. His profile signals a builder mindset: he ships working features, iterates quickly, and aligns projects with real user needs.\n\n## Proof-of-Work Highlights\n\nGitHub signals show repeat usage of modern web stacks, with emphasis on React patterns, server-side routing, and production-style integrations. Project choices indicate an engineering direction toward AI-enabled product development.\n\n## Declared vs Demonstrated\n\nResume intent and project output are aligned: declared skills in web engineering and backend integration are supported by tangible repository evidence. Growth opportunities remain in infra and deployment depth (Docker, system design, scaling patterns).\n\n## Plausible Role Fit\n\nMost plausible near-term role: AI Product Engineer (TypeScript + Python-adjacent integrations), with a progression path toward full AI Application Engineer responsibilities.",
  analysis: {
    github: {
      detected_skills: [
        { skill: "TypeScript", confidence: 0.95 },
        { skill: "Next.js", confidence: 0.9 },
        { skill: "React", confidence: 0.88 },
        { skill: "Node.js", confidence: 0.82 },
        { skill: "Python", confidence: 0.62 },
      ],
      engineering_strengths: [
        "Fast iteration and shipping cadence",
        "Strong frontend architecture habits",
        "Good product-oriented implementation choices",
      ],
      project_complexity_score: 75,
      ai_readiness_signals: [
        "LLM-enabled feature experimentation",
        "API integration reliability",
        "Practical full-stack delivery",
      ],
    },
    resume: {
      declared_skills: ["TypeScript", "React", "Next.js", "Python", "SQL"],
      education: [{ institution: "University", degree: "BS Computer Science", year: "2027" }],
      experience: [
        {
          company: "Startup Team",
          role: "Software Engineer Intern",
          duration: "2025",
          summary: "Built product features and improved API workflows for internal tools.",
        },
      ],
      projects: [
        { name: "DEVCON Gig", summary: "Career intelligence and matching platform for developers." },
        { name: "AI Assistant Integration", summary: "Chat workflow and route orchestration using API-first design." },
      ],
    },
  },
}

const MOCK_STEP2_DAVID: CareerProfile = {
  readiness_score: 76,
  role_match: "AI Product Engineer (TypeScript/Next.js + API Integrations)",
  strengths: [
    "Strong TypeScript + Next.js delivery",
    "Evidence-backed full-stack project execution",
    "Good alignment between declared and demonstrated skills",
  ],
  missing_skills: ["Docker", "System Design for scale", "Advanced MLOps fundamentals"],
  recommended_career_path:
    "Focus on production-grade deployment, architecture patterns, and AI application reliability to move toward Senior AI Application Engineer roles.",
  narrative:
    "David is a practical builder with a strong web engineering core and emerging AI product instincts. His GitHub and resume alignment is a positive signal for role readiness. The next growth leap is not syntax-level coding but production depth: deployment, observability, and scalable system design. If he invests in those areas while continuing to ship user-facing AI features, he can rapidly progress into higher-impact AI engineering roles.",
}

const MOCK_GIG_MATCHES_DAVID: GigMatch[] = [
  {
    user_id: "mock-user-david",
    gig_id: "mock-gig-1",
    match_percentage: 92,
    explanation:
      "Strong alignment with TypeScript/Next.js delivery and practical API integration experience shown in portfolio work.",
    missing_requirements: ["Docker production deployment"],
    gig: {
      id: "mock-gig-1",
      title: "AI Full Stack Engineer",
      description: "Build and ship AI-powered web features using Next.js, APIs, and data pipelines.",
      type: "role",
      required_skills: ["TypeScript", "Next.js", "React", "API Integration"],
      nice_to_have_skills: ["Docker", "System Design", "LLM Tooling"],
      min_readiness_score: 70,
      external_url: null,
    },
  },
  {
    user_id: "mock-user-david",
    gig_id: "mock-gig-2",
    match_percentage: 87,
    explanation:
      "Profile shows solid frontend + backend balance and a strong product execution pattern suitable for startup delivery.",
    missing_requirements: ["Advanced MLOps"],
    gig: {
      id: "mock-gig-2",
      title: "Startup Founding Engineer (AI)",
      description: "Own end-to-end product features for an AI-first startup from prototype to production.",
      type: "startup",
      required_skills: ["React", "Node.js", "Product Engineering"],
      nice_to_have_skills: ["MLOps", "Cloud Architecture"],
      min_readiness_score: 75,
      external_url: null,
    },
  },
  {
    user_id: "mock-user-david",
    gig_id: "mock-gig-3",
    match_percentage: 84,
    explanation:
      "Good fit for practical shipping speed and API-first implementation in a scoped freelance engagement.",
    missing_requirements: [],
    gig: {
      id: "mock-gig-3",
      title: "Freelance: Resume Parser MVP",
      description: "Develop a resume parsing MVP with extraction, validation, and simple scoring.",
      type: "freelance",
      required_skills: ["TypeScript", "APIs", "Text Processing"],
      nice_to_have_skills: ["Python", "NLP Basics"],
      min_readiness_score: 65,
      external_url: null,
    },
  },
  {
    user_id: "mock-user-david",
    gig_id: "mock-gig-4",
    match_percentage: 81,
    explanation:
      "Strong candidate for remote internship-style execution with clear mentorship and feature ownership.",
    missing_requirements: ["Cloud deployment confidence"],
    gig: {
      id: "mock-gig-4",
      title: "Remote AI Product Intern",
      description: "Contribute to user-facing AI product features and internal tooling.",
      type: "internship",
      required_skills: ["JavaScript", "React", "Problem Solving"],
      nice_to_have_skills: ["Cloud", "Prompt Engineering"],
      min_readiness_score: 55,
      external_url: null,
    },
  },
  {
    user_id: "mock-user-david",
    gig_id: "mock-gig-5",
    match_percentage: 79,
    explanation:
      "Evidence of strong practical coding makes this a solid match for contribution-driven open-source roadmap tasks.",
    missing_requirements: ["Maintainer-level OSS workflows"],
    gig: {
      id: "mock-gig-5",
      title: "Open Source AI Contributor",
      description: "Implement scoped features and fixes in open-source AI tooling projects.",
      type: "open_source",
      required_skills: ["Git", "TypeScript", "Code Quality"],
      nice_to_have_skills: ["Testing", "Docs", "Issue Triage"],
      min_readiness_score: 60,
      external_url: null,
    },
  },
]

/* ---------- Markdown helpers (preserved from original) ---------- */
function toStep1Markdown(data: ProfileGenerateResponse): string {
  const gh = data.analysis.github
  const rs = data.analysis.resume
  const skills = gh.detected_skills?.map((s) => `- ${s.skill} (${Math.round((s.confidence || 0) * 100)}%)`).join("\n") || "- No detected skills found."
  const strengths = gh.engineering_strengths?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const declared = rs.declared_skills?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const signals = gh.ai_readiness_signals?.map((s) => `- ${s}`).join("\n") || "- None listed."
  return `## GitHub + Resume Findings\n\n### Detected Skills\n${skills}\n\n### Engineering Strengths\n${strengths}\n\n### Declared Resume Skills\n${declared}\n\n### AI Readiness Signals\n${signals}\n\n### Narrative\n${data.narrative || "No narrative returned."}\n`
}

function toStep2Markdown(data: CareerProfile): string {
  const strengths = data.strengths?.map((s) => `- ${s}`).join("\n") || "- None listed."
  const missing = data.missing_skills?.map((s) => `- ${s}`).join("\n") || "- None listed."
  return `## Career Profile\n\n### Readiness Score\n**${data.readiness_score}/100**\n\n### Role Match\n${data.role_match || "Not provided"}\n\n### Strengths\n${strengths}\n\n### Missing Skills\n${missing}\n\n### Recommended Career Path\n${data.recommended_career_path || "Not provided"}\n\n### Narrative\n${data.narrative || "No narrative returned."}\n`
}

function isSparseStep1(data: ProfileGenerateResponse): boolean {
  const gh = data.analysis?.github || {}
  const rs = data.analysis?.resume || {}
  const hasGh =
    (gh.detected_skills?.length || 0) > 0 ||
    (gh.engineering_strengths?.length || 0) > 0 ||
    (gh.ai_readiness_signals?.length || 0) > 0
  const hasRs =
    (rs.declared_skills?.length || 0) > 0 ||
    (rs.experience?.length || 0) > 0 ||
    (rs.projects?.length || 0) > 0
  const narrative = (data.narrative || "").trim()
  return !(hasGh && hasRs && narrative.length > 80)
}

function isSparseStep2(data: CareerProfile): boolean {
  const narrative = (data.narrative || "").trim()
  const hasCore =
    typeof data.readiness_score === "number" &&
    !!data.role_match &&
    (data.strengths?.length || 0) > 0 &&
    (data.missing_skills?.length || 0) > 0
  return !(hasCore && narrative.length > 80)
}

/* ---------- Sync log type ---------- */
type SyncLog = { id: string; status: "success" | "processing" | "pending"; msg: string; icon: typeof UserCheck }

const SYNC_LOGS: SyncLog[] = [
  { id: "log_1", status: "success", msg: "Supabase matching user session resolved.", icon: UserCheck },
  { id: "log_2", status: "success", msg: "Account mapping completed for users.github_username...", icon: UserCheck },
  { id: "log_3", status: "processing", msg: "Extracting official Octokit GitHub GraphQL payload...", icon: GitPullRequest },
  { id: "log_4", status: "processing", msg: "Syncing repos, pr_count, and issue_count records...", icon: GitPullRequest },
  { id: "log_5", status: "processing", msg: "Organizing language matrix metadata layer...", icon: Cpu },
  { id: "log_6", status: "processing", msg: "Compiling stars_received and follower graph...", icon: Star },
  { id: "log_7", status: "success", msg: "GitHub Proof-of-Work indexed. Ready for intent data.", icon: CheckCircle2 },
]

/* ---------- Route Progress Tracker ---------- */
function RouteTracker({ step }: { step: Step }) {
  const nodes = [
    { id: 1, icon: User, label: "Profile" },
    { id: 2, icon: Terminal, label: "GitHub Index" },
    { id: 3, icon: FileText, label: "Resume Align" },
  ]
  return (
    <div className="flex items-center gap-1.5 mb-2">
      {nodes.map((n, idx) => {
        const Icon = n.icon
        const isActive = n.id === step
        const isDone = n.id < step
        return (
          <div key={n.id} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" strokeWidth={1.5} />}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-mono uppercase tracking-wider ${isActive ? "text-sky-600 bg-sky-50 font-bold" : isDone ? "text-emerald-600" : "text-slate-400"}`}>
              <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {n.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Markdown article styling ---------- */
const mdClasses = "max-w-none leading-6 text-slate-800 [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mb-3 [&_p]:text-slate-600 [&_li]:ml-5 [&_li]:list-disc [&_li]:text-slate-600 [&_strong]:text-slate-900"

/* ========== MAIN COMPONENT ========== */
export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboardingProfile, setCareerProfile, setGigMatches, onboardingProfile, careerProfile, gigMatches } = useSessionState()

  const [step, setStep] = useState<Step>(1)
  const [githubUsername, setGithubUsername] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step1Done, setStep1Done] = useState(false)
  const [step2Done, setStep2Done] = useState(false)
  const [step3Done, setStep3Done] = useState(false)
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null)

  // Terminal sync animation state
  const [visibleLogs, setVisibleLogs] = useState<SyncLog[]>([])
  const [isSyncing, setIsSyncing] = useState(false)

  // Resume extraction simulation
  const [extractedData, setExtractedData] = useState<{ name: string; type: string } | null>(null)

  useEffect(() => {
    const loadMe = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (!response.ok) return
        const data = (await response.json()) as { profile?: { github_username?: string | null } }
        if (data.profile?.github_username) setGithubUsername(data.profile.github_username)
      } catch { /* keep default */ }
    }
    void loadMe()
  }, [])

  // Sync log animation effect
  useEffect(() => {
    if (!isSyncing) return
    let idx = 0
    const interval = setInterval(() => {
      if (idx < SYNC_LOGS.length) {
        const nextLog = SYNC_LOGS[idx]
        if (nextLog) {
          setVisibleLogs(prev => [...prev, nextLog])
        }
        idx++
      } else {
        clearInterval(interval)
        setIsSyncing(false)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isSyncing])

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
    if (!username) { setError("GitHub username is required."); return }
    if (resumeErr) { setError(resumeErr); return }
    setLoading(true); setError(null); setFallbackNotice(null); setIsSyncing(true); setVisibleLogs([])
    try {
      const form = new FormData()
      form.append("github_url", `https://github.com/${username}`)
      form.append("resume", resumeFile as File)
      const response = await fetch("/api/profile/generate", { method: "POST", body: form })
      const data = (await response.json()) as ProfileGenerateResponse & { detail?: string }
      if (!response.ok) {
        setOnboardingProfile(MOCK_STEP1_DAVID)
        setStep1Done(true)
        setFallbackNotice("Live Step 1 failed. Using David mock data so you can continue.")
        return
      }
      if (isSparseStep1(data)) {
        setOnboardingProfile(MOCK_STEP1_DAVID)
        setStep1Done(true)
        setFallbackNotice("Live Step 1 returned sparse data. Using David mock data so you can continue.")
        return
      }
      setOnboardingProfile(data); setStep1Done(true)
    } catch {
      setOnboardingProfile(MOCK_STEP1_DAVID)
      setStep1Done(true)
      setFallbackNotice("Step 1 request failed. Using David mock data so you can continue.")
    }
    finally { setLoading(false); setIsSyncing(false) }
  }

  const runStep2 = async () => {
    setLoading(true); setError(null); setFallbackNotice(null)
    try {
      const response = await fetch("/api/career/generate", { method: "POST" })
      const data = (await response.json()) as CareerProfile & { detail?: string }
      if (!response.ok) {
        setCareerProfile(MOCK_STEP2_DAVID)
        setStep2Done(true)
        setFallbackNotice("Live Step 2 failed. Using David mock career profile so you can continue.")
        return
      }
      if (isSparseStep2(data)) {
        setCareerProfile(MOCK_STEP2_DAVID)
        setStep2Done(true)
        setFallbackNotice("Live Step 2 returned sparse data. Using David mock career profile so you can continue.")
        return
      }
      setCareerProfile(data); setStep2Done(true)
    } catch {
      setCareerProfile(MOCK_STEP2_DAVID)
      setStep2Done(true)
      setFallbackNotice("Step 2 request failed. Using David mock career profile so you can continue.")
    }
    finally { setLoading(false) }
  }

  const runStep3 = async () => {
    setLoading(true); setError(null); setFallbackNotice(null)
    try {
      const response = await fetch("/api/gigs/match", { method: "POST" })
      const data = (await response.json()) as { matches?: GigMatch[]; detail?: string }
      if (!response.ok) {
        setGigMatches(MOCK_GIG_MATCHES_DAVID)
        setStep3Done(true)
        setFallbackNotice("Live Step 3 failed. Using David mock gigs so you can continue.")
        return
      }
      const matches = data.matches || []
      if (matches.length === 0) {
        setGigMatches(MOCK_GIG_MATCHES_DAVID)
        setStep3Done(true)
        setFallbackNotice("No live gigs returned. Using David mock gigs so you can continue.")
        return
      }
      setGigMatches(matches); setStep3Done(true)
    } catch {
      setGigMatches(MOCK_GIG_MATCHES_DAVID)
      setStep3Done(true)
      setFallbackNotice("Step 3 request failed. Using David mock gigs so you can continue.")
    }
    finally { setLoading(false) }
  }

  const handleFileUpload = (file: File | null) => {
    setResumeFile(file)
    if (file) {
      setExtractedData(null)
      setTimeout(() => setExtractedData({ name: file.name, type: file.type || "application/pdf" }), 1200)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header showActions={false} light />
      <main className="mx-auto max-w-4xl px-6 py-10">

        {/* Route Progress Tracker */}
        <RouteTracker step={step} />

        {/* Context Header */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
            Onboarding Protocol
          </h1>
          <div className="flex items-start gap-2 text-sm text-slate-500 leading-relaxed">
            <Info className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <span>Dual-Signal Synchronization: Your GitHub data yields <strong className="text-slate-700">70% weight</strong>, your resume yields <strong className="text-slate-700">30% weight</strong>.</span>
          </div>
        </div>

        {/* ===== STEP 1: GitHub Data Extraction ===== */}
        {step === 1 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Actions */}
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">Step 01 — Index GitHub</h2>
                <p className="text-xs text-slate-500">Map your public code footprint to the intelligence schema.</p>
              </div>

              {/* GitHub Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">GitHub Handle</label>
                <div className="flex items-center border border-slate-200 bg-white rounded-sm overflow-hidden h-10 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-400 transition-all">
                  <span className="px-3 flex items-center border-r border-slate-200 bg-slate-50 h-full">
                    <GithubIcon className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="alexdevcon"
                    className="flex-1 bg-transparent px-3 text-sm font-mono text-slate-800 focus:outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Resume Drop Zone */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Developer Resume</label>
                {!resumeFile ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files?.[0] || null) }}
                    className={`border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragOver ? "border-sky-400 bg-sky-50/50" : "border-slate-200 bg-slate-50/50 hover:border-slate-300"}`}
                  >
                    <UploadCloud className="w-6 h-6 text-slate-400 mb-2" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-slate-600 mb-1">Drop developer profile PDF here</span>
                    <span className="text-[10px] text-slate-400 font-mono">MAX: 5MB · PDF ONLY</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="mt-3 w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-sm file:border file:border-slate-200 file:bg-white file:text-xs file:font-medium file:text-slate-600 hover:file:bg-slate-50"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    />
                  </div>
                ) : (
                  <div className="border border-slate-200 bg-white rounded-sm p-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-sm" />
                    {!extractedData ? (
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="w-5 h-5 text-amber-600 animate-pulse" strokeWidth={1.5} />
                        <span className="text-xs font-mono text-slate-500">Parsing document structure...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                          <div>
                            <p className="text-xs font-mono font-bold text-slate-800">{extractedData.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">{extractedData.type}</p>
                          </div>
                        </div>
                        <button onClick={() => { setResumeFile(null); setExtractedData(null) }} className="text-[10px] font-mono text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider">Remove</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button
                className="w-full h-10 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm shadow-none gap-2"
                onClick={runStep1}
                disabled={loading}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Generate Profile <ArrowRight className="w-4 h-4" /></>}
              </Button>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" className="rounded-sm text-xs font-mono text-slate-400 uppercase tracking-wider hover:text-slate-600" onClick={() => router.push("/")} disabled={loading}>
                  Back
                </Button>
                <Button
                  className="rounded-sm bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider h-9 px-6"
                  onClick={() => setStep(2)}
                  disabled={!step1Done}
                >
                  Next Step
                </Button>
              </div>

              {error && <p className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 rounded-sm p-2">{error}</p>}
              {fallbackNotice && <p className="text-xs font-mono text-amber-700 border border-amber-200 bg-amber-50 rounded-sm p-2">{fallbackNotice}</p>}
            </div>

            {/* Right: Terminal / Results */}
            <Card className="border-slate-200 bg-white shadow-none overflow-hidden">
              <CardContent className="p-0">
                {loading || isSyncing ? (
                  <div className="bg-slate-900 text-slate-100 p-4 font-mono text-xs min-h-[320px] rounded-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-4 pb-2 border-b border-slate-700/50">
                      <Terminal className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>root@devcon-indexer:~# ./sync_profile --target {githubUsername || "..."}</span>
                    </div>
                    <div className="space-y-2.5">
                      {visibleLogs
                        .filter((log): log is SyncLog => Boolean(log && log.icon))
                        .map((log) => {
                        const Icon = log.icon
                        const statusColor = log.status === "success" ? "text-emerald-400" : "text-sky-400"
                        const tag = log.status === "success" ? "[SUCCESS]" : "[INDEXING]"
                        return (
                          <div key={log.id} className="flex items-start gap-2">
                            <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${statusColor}`} strokeWidth={1.5} />
                            <span><span className={`font-bold ${statusColor}`}>{tag}</span> {log.msg}</span>
                          </div>
                        )
                      })}
                      {isSyncing && <div className="flex items-center gap-2 text-slate-500 animate-pulse"><span className="w-2 h-3.5 bg-sky-400" /></div>}
                    </div>
                  </div>
                ) : onboardingProfile ? (
                  <div className="max-h-[420px] overflow-y-auto p-5 text-sm">
                    <article className={mdClasses}><ReactMarkdown>{step1Markdown}</ReactMarkdown></article>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[320px] text-center p-6">
                    <Terminal className="w-8 h-8 text-slate-200 mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-slate-400">Upload your resume and submit to begin indexing.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== STEP 2: Career Profile ===== */}
        {step === 2 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">Step 02 — Career Profile</h2>
                <p className="text-xs text-slate-500">Generate your career intelligence profile in one click.</p>
              </div>
              <Button className="w-full h-10 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-sm shadow-none gap-2" onClick={runStep2} disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating profile...</> : <>Create Career Profile <ArrowRight className="w-4 h-4" /></>}
              </Button>
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" className="rounded-sm text-xs font-mono text-slate-400 uppercase tracking-wider hover:text-slate-600" onClick={() => setStep(1)} disabled={loading}>Back</Button>
                <Button className="rounded-sm bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider h-9 px-6" onClick={() => setStep(3)} disabled={!step2Done}>Next Step</Button>
              </div>
              {error && <p className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 rounded-sm p-2">{error}</p>}
              {fallbackNotice && <p className="text-xs font-mono text-amber-700 border border-amber-200 bg-amber-50 rounded-sm p-2">{fallbackNotice}</p>}
            </div>
            <Card className="border-slate-200 bg-white shadow-none overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center min-h-[320px] gap-3">
                    <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
                    <span className="text-xs font-mono text-slate-400">Generating career profile...</span>
                  </div>
                ) : careerProfile ? (
                  <div className="max-h-[420px] overflow-y-auto p-5 text-sm"><article className={mdClasses}><ReactMarkdown>{step2Markdown}</ReactMarkdown></article></div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[320px] text-center p-6">
                    <User className="w-8 h-8 text-slate-200 mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-slate-400">Create your career profile to continue.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== STEP 3: Gig Matching ===== */}
        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">Step 03 — Gig Matching</h2>
                <p className="text-xs text-slate-500">Find opportunities matched against your dual-signal footprint.</p>
              </div>
              <Button className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm shadow-none gap-2" onClick={runStep3} disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Matching gigs...</> : <>Find Gigs <ArrowRight className="w-4 h-4" /></>}
              </Button>
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" className="rounded-sm text-xs font-mono text-slate-400 uppercase tracking-wider hover:text-slate-600" onClick={() => setStep(2)} disabled={loading}>Back</Button>
                <Button className="rounded-sm bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider h-9 px-6" onClick={() => router.push("/dashboard")} disabled={!step3Done || gigMatches.length === 0}>Dashboard</Button>
              </div>
              {error && <p className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 rounded-sm p-2">{error}</p>}
              {fallbackNotice && <p className="text-xs font-mono text-amber-700 border border-amber-200 bg-amber-50 rounded-sm p-2">{fallbackNotice}</p>}
            </div>
            <Card className="border-slate-200 bg-white shadow-none overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center min-h-[320px] gap-3">
                    <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                    <span className="text-xs font-mono text-slate-400">Scanning opportunity matrix...</span>
                  </div>
                ) : gigMatches.length > 0 ? (
                  <div className="max-h-[420px] space-y-0 overflow-y-auto divide-y divide-slate-100">
                    {gigMatches.slice(0, 5).map((match) => (
                      <div key={match.gig_id} className="p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-bold text-sm text-slate-900">{match.gig.title}</p>
                          <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">{match.match_percentage}%</span>
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">{match.gig.type}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{match.explanation}</p>
                        {match.missing_requirements?.length > 0 && (
                          <p className="mt-2 text-[11px] text-amber-700 font-mono">⚠ Missing: {match.missing_requirements.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : step3Done ? (
                  <div className="flex flex-col items-center justify-center min-h-[320px] text-center p-6">
                    <Sparkles className="w-6 h-6 text-sky-400 mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-slate-500">No gigs returned. Try running Step 3 again.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[320px] text-center p-6">
                    <FileText className="w-8 h-8 text-slate-200 mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-slate-400">Start matching to see your top opportunities.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

      </main>
    </div>
  )
}
