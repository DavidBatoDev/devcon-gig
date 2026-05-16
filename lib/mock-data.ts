export const MOCK_DATA = {
  users: {
    id: "u99-devcon-2026",
    github_username: "alexdevcon",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    full_name: "Alex Builder",
    email: "alex@devcon.org"
  },
  github_profiles: {
    pr_count: 42,
    issue_count: 19,
    stars_received: 124,
    followers: 88,
    last_synced_at: "2026-05-16T14:35:00Z",
    languages: { "TypeScript": 60, "Python": 30, "Rust": 10 },
    repos: [
      { name: "ai-agent-framework", stars: 45, primary_language: "TypeScript" }
    ]
  },
  ai_intelligence: {
    readiness_score: 87,
    role_match: "AI Full Stack Engineer",
    strengths: ["Strong Next.js + API integration", "Active Open-Source Contributor"],
    missing_skills: ["Docker", "System Design Fundamentals"],
    gigs: [
      {
        id: "gig_01",
        title: "AI Engineering Intern",
        company: "SupaLLM Startups",
        type: "Internship",
        match_percentage: 94,
        reasoning: "Your GitHub history displays 4 repositories utilizing OpenAI API calls paired with robust Next.js routing patterns matching 100% of their tech stack requirements.",
        warnings: ["Requires basic Docker understanding for container deployments."]
      },
      {
        id: "gig_02",
        title: "Full Stack Developer",
        company: "OpenSource AI Labs",
        type: "Open-Source",
        match_percentage: 88,
        reasoning: "Strong match on Next.js and TypeScript. Good alignment with their open-source values based on your recent PRs.",
        warnings: []
      }
    ]
  }
};
