import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MOCK_DATA } from "@/lib/mock-data"
import { FileText, CheckCircle2, GitCommit, Users, Star, Box } from "lucide-react"
import { GithubIcon } from "@/components/icons"

export default function ProfilePage() {
  const { users, github_profiles } = MOCK_DATA

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 pb-12">
        {/* Header Section */}
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-[#d8e2f2] bg-white p-8 text-[#1d2c44] md:flex-row md:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20" />
          <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-lg">
            <AvatarImage src={users.avatar_url} />
            <AvatarFallback className="text-xl">AB</AvatarFallback>
          </Avatar>
          <div className="space-y-2 relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight">{users.full_name}</h1>
            <div className="flex items-center gap-3 text-[#607a9f]">
              <span className="flex items-center gap-1.5 font-mono text-sm">
                <GithubIcon className="h-4 w-4 text-primary" /> {users.github_username}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Dual-Signal: Code Proof-of-Work */}
          <Card className="relative flex flex-col overflow-hidden border border-[#d8e2f2] bg-white text-[#1d2c44]">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <CardHeader className="border-b border-[#e5edf8] bg-[#f8fbff] pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GithubIcon className="h-5 w-5 text-primary" /> Code Proof-of-Work
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">70% Weight</Badge>
              </div>
              <CardDescription>Verified engineering activity via GitHub API.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 flex-1">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#607a9f]">
                  <Box className="h-4 w-4" /> Top Repositories
                </h4>
                <div className="space-y-3">
                  {github_profiles.repos.map((repo, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded border border-[#d8e2f2] bg-white">
                          <GitCommit className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-bold">{repo.name}</p>
                          <p className="text-xs text-[#607a9f]">{repo.primary_language}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="gap-1 font-mono text-xs">
                        <Star className="h-3 w-3 text-secondary" fill="currentColor" /> {repo.stars}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Core Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                    <p className="mb-1 text-xs text-[#607a9f]">Commits/PRs</p>
                    <p className="text-xl font-mono font-bold">{github_profiles.pr_count}</p>
                  </div>
                  <div className="rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                    <p className="mb-1 text-xs text-[#607a9f]">Followers</p>
                    <p className="text-xl font-mono font-bold">{github_profiles.followers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dual-Signal: Declared Intent */}
          <Card className="relative flex flex-col overflow-hidden border border-[#d8e2f2] bg-white text-[#1d2c44]">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
            <CardHeader className="border-b border-[#e5edf8] bg-[#f8fbff] pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-secondary" /> Declared Intent
                </CardTitle>
                <Badge variant="outline" className="border-secondary text-secondary">30% Weight</Badge>
              </div>
              <CardDescription>Extracted from uploaded resume and manual input.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 flex-1">
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Professional Experience</h4>
                <ul className="space-y-4">
                  <li className="relative ml-2 border-l border-[#d8e2f2] pb-2 pl-6">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-secondary" />
                    <p className="font-bold text-foreground">Software Engineer Intern</p>
                    <p className="mb-1 text-sm font-mono text-[#607a9f]">Tech Startup Inc. | 2025</p>
                    <p className="text-sm text-foreground/80">Developed frontend components and improved API latency by 15%.</p>
                  </li>
                  <li className="relative ml-2 border-l border-transparent pl-6">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-muted-foreground" />
                    <p className="font-bold text-foreground">Computer Science B.S.</p>
                    <p className="mb-1 text-sm font-mono text-[#607a9f]">University of Technology | 2023 - 2027</p>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#607a9f]">Verified vs Declared Skills</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-2 text-sm">
                    <span className="flex items-center gap-2">TypeScript <CheckCircle2 className="h-3 w-3 text-secondary" /></span>
                    <span className="text-xs font-mono text-[#607a9f]">Verified in Code</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-2 text-sm">
                    <span className="flex items-center gap-2">React <CheckCircle2 className="h-3 w-3 text-secondary" /></span>
                    <span className="text-xs font-mono text-[#607a9f]">Verified in Code</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-dashed border-[#d8e2f2] bg-[#f8fbff] p-2 text-sm">
                    <span className="text-[#607a9f]">Docker</span>
                    <span className="text-xs font-mono text-[#607a9f]">Declared Only</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
