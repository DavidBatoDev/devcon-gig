import { NextResponse } from "next/server"

import { apiFetch } from "@/lib/backend"

export async function POST() {
  const response = await apiFetch("/gigs/match", { method: "POST" })
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
