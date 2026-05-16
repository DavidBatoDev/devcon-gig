import { AppLayout } from "@/components/layout/app-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mock-data"
import { AlertTriangle, Sparkles, Briefcase, ExternalLink, MessageSquare } from "lucide-react"

export default function GigsPage() {
  const { gigs } = MOCK_DATA.ai_intelligence

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Gig Matching</h1>
            <p className="text-muted-foreground mt-2">
              Opportunities tailored to your Dual-Signal profile.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border/50 bg-background/50">Internships</Button>
            <Button variant="outline" size="sm" className="border-border/50 bg-background/50">Open-Source</Button>
            <Button variant="outline" size="sm" className="border-border/50 bg-background/50">Full-Time</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {gigs.map((gig) => (
            <Card key={gig.id} className="glass group overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row">
                
                {/* Left/Top Content */}
                <div className="flex-1 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/50">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {gig.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">{gig.company}</span>
                    </div>
                    <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{gig.title}</CardTitle>
                    <CardDescription className="text-base text-foreground/80 mt-4 leading-relaxed">
                      <span className="flex items-center gap-2 font-medium text-sm text-primary mb-1">
                        <Sparkles className="h-4 w-4" /> AI Match Reasoning
                      </span>
                      {gig.reasoning}
                    </CardDescription>
                  </div>
                  
                  {gig.warnings && gig.warnings.length > 0 && (
                    <div className="mt-6 bg-destructive/10 border border-destructive/20 rounded-md p-4">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-destructive mb-2">
                        <AlertTriangle className="h-4 w-4" /> Missing Requirements
                      </h4>
                      <ul className="space-y-1">
                        {gig.warnings.map((warning, i) => (
                          <li key={i} className="text-sm text-destructive/90 flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right/Bottom Action Area */}
                <div className="w-full md:w-64 bg-background/30 p-6 flex flex-col items-center justify-center gap-6">
                  <div className="text-center">
                    <span className="text-sm uppercase tracking-wider text-muted-foreground font-bold mb-1 block">Match Score</span>
                    <Badge variant="outline" className="text-3xl font-extrabold font-mono py-2 px-4 border-yellow-500/50 text-yellow-600 bg-yellow-500/10 shadow-[0_0_15px_rgba(232,202,4,0.15)]">
                      {gig.match_percentage}%
                    </Badge>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                      Apply Now <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full gap-2 border-border/50 hover:text-primary hover:bg-primary/10">
                      <MessageSquare className="h-4 w-4" /> Discuss with Copilot
                    </Button>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
