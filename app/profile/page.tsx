import { AppLayout } from "@/components/layout/app-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mock-data"
import { GitPullRequest, GitCommit, Star, FileText, Briefcase, GraduationCap } from "lucide-react"
import { GithubIcon } from "@/components/icons"

export default function ProfilePage() {
  const { user, github_stats, experience } = MOCK_DATA

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-card border shadow-sm">
          <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <Badge variant="secondary">{user.tier}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GithubIcon className="h-4 w-4" />
              <span>@{user.github_username}</span>
            </div>
            <p className="text-sm max-w-lg">{user.bio}</p>
          </div>
        </div>

        {/* Dual-Signal Breakdown Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Column 1: GitHub Proof-of-Work Stats */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <GithubIcon className="h-5 w-5" /> 70% Proof-of-Work
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <GitCommit className="h-4 w-4" /> Commits (1Y)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{github_stats.commits_last_year}</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <GitPullRequest className="h-4 w-4" /> PRs Merged
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{github_stats.prs_merged}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Top Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {github_stats.top_languages.map((lang, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Top Repositories</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {github_stats.top_repos.map((repo, i) => (
                  <div key={i} className="flex flex-col gap-1 p-3 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-primary">{repo.name}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" /> {repo.stars}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{repo.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Declared Experience */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5" /> 30% Declared Intent
            </h2>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-muted ml-3 space-y-8 pb-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                      <div className="flex flex-col gap-1">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <div className="text-sm text-muted-foreground flex justify-between">
                          <span>{exp.company}</span>
                          <span>{exp.duration}</span>
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold">B.S. Computer Science</h4>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>Tech University</span>
                    <span>2017 - 2021</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}
