"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Mode = "signup" | "signin"

function getErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "Authentication failed."
  const data = payload as { detail?: unknown; message?: unknown }
  if (typeof data.message === "string" && data.message.trim()) return data.message
  if (typeof data.detail === "string" && data.detail.trim()) return data.detail
  if (Array.isArray(data.detail)) {
    const msgs = data.detail
      .map((item) => {
        if (typeof item === "string") return item
        if (item && typeof item === "object" && "msg" in item) {
          const msg = (item as { msg?: unknown }).msg
          return typeof msg === "string" ? msg : ""
        }
        return ""
      })
      .filter(Boolean)
    if (msgs.length > 0) return msgs.join(", ")
  }
  return "Authentication failed."
}

export default function LandingPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [githubUsername, setGithubUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/signin"
      const payload =
        mode === "signup"
          ? { email, password, github_username: githubUsername.trim() }
          : { email, password }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(getErrorMessage(data))
        return
      }
      router.push(mode === "signup" ? "/onboarding" : "/dashboard")
    } catch {
      setError("Unable to reach server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#eef2f7] p-6 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl border border-[#d9e2ef] bg-white shadow-[0_20px_60px_rgba(11,44,102,0.12)]">
        <section className="hidden w-[38%] flex-col justify-between bg-[#1258e8] p-10 text-white lg:flex">
          <div>
            <Image src="/dv_rectangle.png" alt="DEVCON GIG" width={140} height={32} className="h-8 w-auto" />
            <h1 className="mt-12 text-5xl font-bold leading-tight">Turn Contributions Into Opportunities</h1>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/85">
              DEVCON GIG evaluates your real engineering activity and declared experience to match you with internships,
              freelance projects, AI roles, and open-source opportunities.
            </p>
          </div>
          <div className="rounded-xl bg-[#0f4bd0] p-5">
            <p className="text-sm font-semibold">Dual-Signal Career Intelligence</p>
            <p className="mt-2 text-xs text-white/80">
              GitHub proof-of-work (70%) + Resume intent (30%) to build a more accurate developer profile.
            </p>
          </div>
        </section>

        <section className="w-full bg-white p-6 md:p-10 lg:w-[62%]">
          <div className="mx-auto max-w-lg">
            <div className="mb-6 flex items-center gap-2 text-xs text-[#92a5c2]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1258e8]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#d3ddec]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#d3ddec]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1a2433]">Let&apos;s get started</h2>
            <p className="mt-2 text-sm text-[#637996]">
              {mode === "signup"
                ? "Create your account to begin onboarding."
                : "Sign in to continue your onboarding and dashboard."}
            </p>

            <div className="mt-6 grid grid-cols-2 rounded-lg border border-[#dbe5f2] bg-[#f6f9fd] p-1">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  mode === "signup" ? "bg-[#1258e8] text-white shadow-sm" : "text-[#516987]"
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  mode === "signin" ? "bg-[#1258e8] text-white shadow-sm" : "text-[#516987]"
                }`}
              >
                Sign In
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={submit}>
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#516987]">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#cfd9e8] px-3 py-2.5 text-sm text-[#1a2433] outline-none ring-[#1258e8]/25 focus:ring-4"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#516987]">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-[#cfd9e8] px-3 py-2.5 text-sm text-[#1a2433] outline-none ring-[#1258e8]/25 focus:ring-4"
                />
              </div>

              {mode === "signup" ? (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#516987]">GitHub Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DavidBatoDev"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="w-full rounded-md border border-[#cfd9e8] px-3 py-2.5 text-sm text-[#1a2433] outline-none ring-[#1258e8]/25 focus:ring-4"
                  />
                </div>
              ) : null}

              {error ? <p className="text-sm text-[#d92d20]">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-md bg-[#1258e8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f4bd0] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
