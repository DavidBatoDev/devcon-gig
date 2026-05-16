"use client"

import Link from "next/link"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSessionState } from "@/components/providers/session-provider"

export default function DashboardPage() {
  const { careerProfile, gigMatches } = useSessionState()

  if (!careerProfile) {
    return (
      <AppLayout>
        <Card className="border-[#d8e2f2] bg-white text-[#1d2c44]">
          <CardHeader>
            <CardTitle>No career profile yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#607a9f]">Complete onboarding first to view your dashboard.</p>
            <Link href="/onboarding">
              <Button className="mt-4">Go to Onboarding</Button>
            </Link>
          </CardContent>
        </Card>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="border-[#d8e2f2] bg-white text-[#1d2c44]">
          <CardHeader>
            <CardTitle>Career Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">Readiness Score:</span> {careerProfile.readiness_score}</p>
            <p><span className="font-medium">Role Match:</span> {careerProfile.role_match}</p>
            <p className="text-[#607a9f]">{careerProfile.recommended_career_path}</p>
          </CardContent>
        </Card>
        <Card className="border-[#d8e2f2] bg-white text-[#1d2c44]">
          <CardHeader>
            <CardTitle>Top Matched Gigs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gigMatches.slice(0, 3).map((match) => (
              <div key={match.gig_id} className="rounded-md border border-[#d8e2f2] bg-[#f8fbff] p-3">
                <p className="font-medium">{match.gig.title}</p>
                <p className="text-sm text-[#607a9f]">{match.match_percentage}% match</p>
              </div>
            ))}
            <Link href="/gigs">
              <Button variant="outline">View all matches</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
