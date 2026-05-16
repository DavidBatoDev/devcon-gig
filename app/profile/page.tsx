"use client"

import { useEffect, useMemo, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, CheckCircle2, Users, Box } from "lucide-react"
import { GithubIcon } from "@/components/icons"

type ProfilePayload = {
  user: {
    full_name?: string | null
    github_username?: string | null
    avatar_url?: string | null
  } | null
  github_profile: {
    repos?: Array<{ name?: string; stargazers_count?: number; primary_language?: string }>
    followers?: number
    pr_count?: number
  } | null
  github_analysis: {
    detected_skills?: Array<{ skill: string; confidence: number }>
    engineering_strengths?: string[]
  } | null
  resume_analysis: {
    declared_skills?: string[]
    experience?: Array<{ company?: string; role?: string; duration?: string; summary?: string }>
    education?: Array<{ institution?: string; degree?: string; year?: string }>
  } | null
  career_profile: {
    role_match?: string
    readiness_score?: number
    missing_skills?: string[]
  } | null
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfilePayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/profile/me")
        const body = (await response.json()) as ProfilePayload & { detail?: string }
        if (!response.ok) {
          setError(body.detail || "Failed to load profile.")
          return
        }
        setData(body)
      } catch {
        setError("Unable to load profile.")
      }
    }
    void run()
  }, [])

  const initials = useMemo(() => {
    const name = data?.user?.full_name || data?.user?.github_username || "DG"
    return name
      .split(" ")
      .map((s) => s[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2)
  }, [data?.user?.full_name, data?.user?.github_username])

  const repos = data?.github_profile?.repos || []
  const detected = data?.github_analysis?.detected_skills || []
  const declared = data?.resume_analysis?.declared_skills || []
  const missing = data?.career_profile?.missing_skills || []
  const roleMatch = data?.career_profile?.role_match || "Not generated yet"
  const readiness = data?.career_profile?.readiness_score

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-[#d8e2f2] bg-white p-8 text-[#1d2c44] md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-lg">
            <AvatarImage src={data?.user?.avatar_url || undefined} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">{data?.user?.full_name || "Developer Profile"}</h1>
            <div className="flex items-center gap-3 text-[#607a9f]">
              <span className="flex items-center gap-1.5 font-mono text-sm">
                <GithubIcon className="h-4 w-4 text-primary" /> {data?.user?.github_username || "No username"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">Role: {roleMatch}</Badge>
              {typeof readiness === "number" ? (
                <Badge variant="outline" className="border-[#1258e8] text-[#1258e8]">Readiness: {readiness}</Badge>
              ) : null}
            </div>
          </div>
        </div>

        {error ? <p className="text-sm text-[#d92d20]">{error}</p> : null}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative flex flex-col overflow-hidden border border-[#d8e2f2] bg-white text-[#1d2c44]">
            <div className="absolute left-0 top-0 h-1 w-full bg-primary" />
            <CardHeader className="border-b border-[#e5edf8] bg-[#f8fbff] pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GithubIcon className="h-5 w-5 text-primary" /> GitHub Profile
              </CardTitle>
              <CardDescription>Live data from GitHub profile and analyses.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 pt-6">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#607a9f]">
                  <Box className="h-4 w-4" /> Repositories
                </h4>
                <div className="space-y-3">
                  {repos.slice(0, 6).map((repo, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                      <div>
                        <p className="font-mono text-sm font-bold">{repo.name || "Unnamed repo"}</p>
                        <p className="text-xs text-[#607a9f]">{repo.primary_language || "Unknown language"}</p>
                      </div>
                      <Badge variant="outline" className="gap-1 font-mono text-xs">{repo.stargazers_count || 0} stars</Badge>
                    </div>
                  ))}
                  {repos.length === 0 ? <p className="text-sm text-[#607a9f]">No repos synced yet.</p> : null}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Detected Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {detected.map((s, i) => (
                    <Badge key={i} variant="outline" className="border-[#d8e2f2] bg-[#f8fbff] text-[#2f4e76]">
                      {s.skill} ({Math.round((s.confidence || 0) * 100)}%)
                    </Badge>
                  ))}
                  {detected.length === 0 ? <p className="text-sm text-[#607a9f]">No detected skills yet.</p> : null}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative flex flex-col overflow-hidden border border-[#d8e2f2] bg-white text-[#1d2c44]">
            <div className="absolute left-0 top-0 h-1 w-full bg-secondary" />
            <CardHeader className="border-b border-[#e5edf8] bg-[#f8fbff] pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-secondary" /> Resume + Career Profile
              </CardTitle>
              <CardDescription>Live declared profile + career synthesis.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 pt-6">
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Declared Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {declared.map((s, i) => (
                    <Badge key={i} variant="outline" className="border-[#d8e2f2] bg-[#f8fbff] text-[#2f4e76]">{s}</Badge>
                  ))}
                  {declared.length === 0 ? <p className="text-sm text-[#607a9f]">No resume skills extracted yet.</p> : null}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Missing Skills</h4>
                <div className="space-y-2">
                  {missing.map((m, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-2 text-sm">
                      <span className="flex items-center gap-2">{m}</span>
                      <CheckCircle2 className="h-3 w-3 text-secondary" />
                    </div>
                  ))}
                  {missing.length === 0 ? <p className="text-sm text-[#607a9f]">No missing skills identified yet.</p> : null}
                </div>
              </div>

              <div className="rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                <p className="text-xs text-[#607a9f] mb-1">GitHub Followers</p>
                <p className="text-xl font-mono font-bold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  {data?.github_profile?.followers || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
