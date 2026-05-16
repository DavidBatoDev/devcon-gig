import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MOCK_DATA } from "@/lib/mock-data"
import { Target, AlertTriangle, CheckCircle2, ChevronRight, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { readiness_score, role_match, strengths, missing_skills, gigs } = MOCK_DATA

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Hub</h1>
          <p className="text-muted-foreground mt-2">
            Your Dual-Signal AI evaluation and career overview.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Readiness Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">{readiness_score}<span className="text-xl text-muted-foreground">/100</span></div>
              <Progress value={readiness_score} className="h-3" />
              <p className="text-xs text-muted-foreground mt-4">
                Based on your GitHub activity (70%) and declared intent (30%).
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Role</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mt-2 leading-tight">{role_match}</div>
              <Badge variant="secondary" className="mt-4">Highest Match Probability</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Skill Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Verified Strengths
              </CardTitle>
              <CardDescription>Signals validated by code contributions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Skill Gaps & Warnings
              </CardTitle>
              <CardDescription>Missing requirements for your target role.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {missing_skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-full mt-6 gap-2">
                Ask Copilot for a Learning Roadmap
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Gigs Preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Top Gig Matches</h2>
            <Link href="/gigs">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {gigs.slice(0, 3).map((gig) => (
              <Card key={gig.id} className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-base line-clamp-1">{gig.title}</CardTitle>
                      <CardDescription className="line-clamp-1">{gig.company}</CardDescription>
                    </div>
                    <Badge variant={gig.match_percentage > 85 ? "default" : "secondary"}>
                      {gig.match_percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-4">{gig.type}</Badge>
                  <Link href="/gigs">
                    <Button variant="secondary" className="w-full text-xs">View Details</Button>
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
