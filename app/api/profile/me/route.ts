import { NextResponse } from "next/server"

import { apiFetch } from "@/lib/backend"

export async function GET() {
  const response = await apiFetch("/profile/me", { method: "GET" })
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
