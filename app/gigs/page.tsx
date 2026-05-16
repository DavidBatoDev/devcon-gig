"use client"

import Link from "next/link"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSessionState } from "@/components/providers/session-provider"

export default function GigsPage() {
  const { gigMatches } = useSessionState()

  if (gigMatches.length === 0) {
    return (
      <AppLayout>
        <Card className="border-[#d8e2f2] bg-white text-[#1d2c44]">
          <CardHeader>
            <CardTitle>No gig matches yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#607a9f]">Complete onboarding Step 3 to generate matches.</p>
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
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1d2c44]">Top Gig Matches</h1>
        {gigMatches.slice(0, 5).map((match) => (
          <Card key={match.gig_id} className="border-[#d8e2f2] bg-white text-[#1d2c44]">
            <CardHeader>
              <CardTitle>{match.gig.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-[#607a9f]">{match.gig.description}</p>
              <p><span className="font-medium">Match:</span> {match.match_percentage}%</p>
              <p><span className="font-medium">Type:</span> {match.gig.type}</p>
              <p><span className="font-medium">Why:</span> {match.explanation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}
