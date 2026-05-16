"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import type {
  CareerProfile,
  GigMatch,
  MeResponse,
  ProfileGenerateResponse,
  UserProfile,
} from "@/lib/types"

type SessionState = {
  me: MeResponse["auth"] | null
  profile: UserProfile | null
  onboardingProfile: ProfileGenerateResponse | null
  careerProfile: CareerProfile | null
  gigMatches: GigMatch[]
  loading: boolean
  setOnboardingProfile: (value: ProfileGenerateResponse | null) => void
  setCareerProfile: (value: CareerProfile | null) => void
  setGigMatches: (value: GigMatch[]) => void
  refreshMe: () => Promise<void>
}

const STORAGE_KEY = "devcon_session_state"

const SessionContext = createContext<SessionState | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<MeResponse["auth"] | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [onboardingProfile, setOnboardingProfile] = useState<ProfileGenerateResponse | null>(() => {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as { onboardingProfile?: ProfileGenerateResponse | null }
      return parsed.onboardingProfile ?? null
    } catch {
      return null
    }
  })
  const [careerProfile, setCareerProfile] = useState<CareerProfile | null>(() => {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as { careerProfile?: CareerProfile | null }
      return parsed.careerProfile ?? null
    } catch {
      return null
    }
  })
  const [gigMatches, setGigMatches] = useState<GigMatch[]>(() => {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw) as { gigMatches?: GigMatch[] }
      return parsed.gigMatches ?? []
    } catch {
      return []
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ onboardingProfile, careerProfile, gigMatches }),
    )
  }, [onboardingProfile, careerProfile, gigMatches])

  const refreshMe = async () => {
    const response = await fetch("/api/auth/me")
    if (!response.ok) {
      setMe(null)
      setProfile(null)
      return
    }
    const data = (await response.json()) as MeResponse
    setMe(data.auth)
    setProfile(data.profile)
  }

  useEffect(() => {
    let cancelled = false
    fetch("/api/auth/me")
      .then(async (response) => {
        if (!response.ok) {
          if (!cancelled) {
            setMe(null)
            setProfile(null)
          }
          return
        }
        const data = (await response.json()) as MeResponse
        if (!cancelled) {
          setMe(data.auth)
          setProfile(data.profile)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<SessionState>(
    () => ({
      me,
      profile,
      onboardingProfile,
      careerProfile,
      gigMatches,
      loading,
      setOnboardingProfile,
      setCareerProfile,
      setGigMatches,
      refreshMe,
    }),
    [me, profile, onboardingProfile, careerProfile, gigMatches, loading],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSessionState() {
  const value = useContext(SessionContext)
  if (!value) {
    throw new Error("useSessionState must be used within SessionProvider")
  }
  return value
}
