import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MOCK_DATA } from "@/lib/mock-data"
import { Target, AlertTriangle, CheckCircle2, ChevronRight, Activity, GitPullRequest, CircleDot, Star, Users, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { readiness_score, role_match, missing_skills, gigs } = MOCK_DATA.ai_intelligence
  const { pr_count, issue_count, stars_received, followers, last_synced_at, languages } = MOCK_DATA.github_profiles

  const syncDate = new Date(last_synced_at)
  const formattedSync = syncDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric' })

  // Colors for language stack
  const langColors = ["bg-primary", "bg-secondary", "bg-muted-foreground"]

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Your Dual-Signal AI evaluation and career overview.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* AI Score */}
          <Card className="col-span-1 md:col-span-1 glass relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                AI Readiness Score <Activity className="h-4 w-4 text-secondary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted opacity-30" />
                  <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * readiness_score) / 100} className="text-secondary transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-extrabold font-mono text-foreground">{readiness_score}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Score</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* GitHub Stats Panel */}
          <Card className="col-span-1 md:col-span-2 glass flex flex-col">
            <CardHeader className="pb-2 border-b border-border/50">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Target Role: <span className="text-foreground font-bold">{role_match}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-6 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><GitPullRequest className="h-4 w-4 text-primary" /> PRs</span>
                  <span className="text-2xl font-bold font-mono">{pr_count}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><CircleDot className="h-4 w-4 text-primary" /> Issues</span>
                  <span className="text-2xl font-bold font-mono">{issue_count}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Stars</span>
                  <span className="text-2xl font-bold font-mono">{stars_received}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Followers</span>
                  <span className="text-2xl font-bold font-mono">{followers}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-background/20 py-3 flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-mono">Last Synced: {formattedSync}</span>
              <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-primary hover:text-primary hover:bg-primary/10">
                <RefreshCw className="h-3 w-3" /> Sync Profile
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Skill Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass relative overflow-hidden border-primary/30">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Language Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stacked Progress Bar */}
              <div className="h-4 w-full bg-muted rounded-full flex overflow-hidden mb-6">
                {Object.entries(languages).map(([lang, percentage], i) => (
                  <div key={lang} style={{ width: `${percentage}%` }} className={`h-full ${langColors[i % langColors.length]}`} title={`${lang}: ${percentage}%`} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(languages).map(([lang, percentage], i) => (
                  <div key={lang} className="flex justify-between items-center text-sm border border-border/50 rounded-md p-2 bg-background/50">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${langColors[i % langColors.length]}`} />
                      <span className="font-medium">{lang}</span>
                    </div>
                    <span className="font-mono text-muted-foreground">{percentage as number}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass relative overflow-hidden border-destructive/30">
            <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {missing_skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm bg-background/50 p-3 rounded-md border border-border/50">
                    <div className="h-2 w-2 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
              <Link href="/copilot" className="block mt-6">
                <Button variant="outline" size="sm" className="w-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary">
                  Ask Copilot for a Learning Roadmap
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Gigs Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">Top Gig Matches</h2>
            <Link href="/gigs">
              <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary hover:bg-primary/10">
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gigs.slice(0, 3).map((gig) => (
              <Card key={gig.id} className="glass hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">{gig.title}</CardTitle>
                      <CardDescription className="line-clamp-1 font-mono text-xs mt-1">{gig.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`font-mono font-bold ${gig.match_percentage > 85 ? 'border-secondary text-secondary bg-secondary/10' : ''}`}>
                      {gig.match_percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">{gig.type}</Badge>
                  <Link href="/gigs">
                    <Button variant="outline" className="w-full text-xs border-border/50">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
