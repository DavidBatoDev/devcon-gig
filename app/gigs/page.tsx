import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_DATA } from "@/lib/mock-data"
import { AlertTriangle, Sparkles, Briefcase, ExternalLink, MessageSquare } from "lucide-react"

export default function GigsPage() {
  const { gigs } = MOCK_DATA

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gig Matching Engine</h1>
            <p className="text-muted-foreground mt-2">
              Opportunities ranked by AI based on your Dual-Signal profile.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-8 px-3">All</Badge>
            <Badge variant="secondary" className="h-8 px-3">Internships</Badge>
            <Badge variant="secondary" className="h-8 px-3">Open Source</Badge>
            <Badge variant="secondary" className="h-8 px-3">Full-time</Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {gigs.map((gig) => (
            <Card key={gig.id} className="shadow-sm border-muted overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{gig.title}</CardTitle>
                      <Badge variant="outline">{gig.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{gig.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      <Sparkles className="h-4 w-4" />
                      {gig.match_percentage}% Match
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Match Explanation
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {gig.reasoning}
                    </p>
                  </div>
                  
                  {gig.warnings && gig.warnings.length > 0 && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Missing Requirements Warnings
                      </h4>
                      <ul className="text-sm text-destructive/80 space-y-1 pl-6 list-disc">
                        {gig.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-3 md:border-l md:pl-6 justify-center">
                  <Button className="w-full gap-2">
                    Apply Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    Discuss with Copilot
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
