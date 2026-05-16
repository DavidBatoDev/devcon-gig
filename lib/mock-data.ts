export const MOCK_DATA = {
  user: {
    name: "Alex Builder",
    github_username: "alexdevcon",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    bio: "Full Stack Engineer passionate about building intelligent systems.",
    tier: "Pro Builder"
  },
  readiness_score: 87,
  role_match: "AI Full Stack Engineer",
  strengths: [
    "Strong Next.js + API integration",
    "Active GitHub contributor",
    "Experience building AI-powered applications"
  ],
  missing_skills: [
    "Docker",
    "System Design Fundamentals"
  ],
  recommended_career_path: "AI Engineer (Full Stack + LLM Systems)",
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
    },
    {
      id: "gig_03",
      title: "Senior React Native Dev",
      company: "Mobile AI Inc",
      type: "Full-time",
      match_percentage: 65,
      reasoning: "Solid React background, but lacking Native specific experience. Missing mobile deployment history.",
      warnings: ["Requires React Native experience.", "Needs iOS/Android deployment knowledge."]
    }
  ],
  github_stats: {
    commits_last_year: 1432,
    prs_merged: 56,
    top_languages: [
      { name: "TypeScript", percentage: 65 },
      { name: "Python", percentage: 25 },
      { name: "CSS", percentage: 10 }
    ],
    top_repos: [
      { name: "ai-career-copilot", stars: 120, description: "A copilot for developers to find AI roles." },
      { name: "nextjs-chat-app", stars: 45, description: "Realtime chat using Next.js and Supabase." }
    ]
  },
  experience: [
    {
      id: 1,
      role: "Frontend Engineer",
      company: "TechNova",
      duration: "2022 - Present",
      description: "Building modern web applications using React and Next.js."
    },
    {
      id: 2,
      role: "Intern Developer",
      company: "StartUp Inc",
      duration: "2021 - 2022",
      description: "Assisted in building REST APIs using Node.js and Express."
    }
  ]
};
