export type UserProfile = {
  id: string
  email: string | null
  github_username: string | null
  avatar_url: string | null
  full_name: string | null
}

export type MeResponse = {
  auth: {
    id: string
    email: string
  }
  profile: UserProfile | null
}

export type ProfileGenerateResponse = {
  github_analysis_id: string
  resume_analysis_id: string
  narrative: string
  analysis: {
    github: {
      detected_skills?: Array<{ skill: string; confidence: number }>
      engineering_strengths?: string[]
      project_complexity_score?: number
      ai_readiness_signals?: string[]
    }
    resume: {
      declared_skills?: string[]
      education?: Array<{ institution: string; degree: string; year: string }>
      experience?: Array<{ company: string; role: string; duration: string; summary: string }>
      projects?: Array<{ name: string; summary: string }>
    }
  }
}

export type CareerProfile = {
  readiness_score: number
  role_match: string
  strengths: string[]
  missing_skills: string[]
  recommended_career_path: string
  narrative: string
}

export type GigMatch = {
  user_id: string
  gig_id: string
  match_percentage: number
  explanation: string
  missing_requirements: string[]
  gig: {
    id: string
    title: string
    description: string
    type: string
    required_skills: string[]
    nice_to_have_skills: string[]
    min_readiness_score: number
    external_url: string | null
  }
}
