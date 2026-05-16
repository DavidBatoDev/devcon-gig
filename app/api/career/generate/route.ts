import { NextResponse } from "next/server"

import { apiFetch } from "@/lib/backend"

export async function POST() {
  let response = await apiFetch("/career/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  })

  // Backward-compat fallback for backend instances still using /career/update.
  if (response.status === 404) {
    response = await apiFetch("/career/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
  }

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
