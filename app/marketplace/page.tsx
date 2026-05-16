"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type MarketplaceGig = {
  id: string
  title: string
  description: string | null
  type: string
  required_skills: string[]
  nice_to_have_skills: string[]
  min_readiness_score: number
}

export default function MarketplacePage() {
  const [gigs, setGigs] = useState<MarketplaceGig[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/gigs/marketplace")
        const body = (await response.json()) as { gigs?: MarketplaceGig[]; detail?: string }
        if (!response.ok) {
          setError(body.detail || "Failed to load marketplace gigs.")
          return
        }
        setGigs(body.gigs || [])
      } catch {
        setError("Unable to load marketplace gigs.")
      }
    }
    void run()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-bold text-[#1d2c44]">Marketplace</h1>
          <p className="mt-1 text-sm text-[#607a9f]">Browse all available gigs and opportunities.</p>
        </div>

        {error ? <p className="text-sm text-[#d92d20]">{error}</p> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gigs.map((gig) => (
            <Card key={gig.id} className="border-[#d8e2f2] bg-white text-[#1d2c44]">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{gig.title}</CardTitle>
                  <Badge variant="secondary" className="bg-[#e8f0ff] text-[#1258e8]">{gig.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-[#607a9f]">{gig.description || "No description available."}</p>
                <p><span className="font-medium">Min readiness:</span> {gig.min_readiness_score}</p>
                <div>
                  <p className="mb-1 font-medium">Required skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(gig.required_skills || []).map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-[#d8e2f2] bg-[#f8fbff] text-[#2f4e76]">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 font-medium">Nice to have</p>
                  <div className="flex flex-wrap gap-2">
                    {(gig.nice_to_have_skills || []).map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-[#d8e2f2] bg-white text-[#607a9f]">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
