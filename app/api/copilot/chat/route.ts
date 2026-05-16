import { NextResponse } from "next/server"

import { apiFetch } from "@/lib/backend"

export async function POST(request: Request) {
  const body = await request.json()
  let response = await apiFetch("/copilot/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  // Backward-compatible fallback for older backend route names.
  if (response.status === 404) {
    response = await apiFetch("/copilot/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    data = { detail: "Invalid backend response." }
  }

  if (response.status === 404) {
    return NextResponse.json(
      {
        detail:
          "Copilot endpoint not found on backend. Restart FastAPI on the latest code (with copilot router enabled).",
      },
      { status: 404 },
    )
  }

  return NextResponse.json(data, { status: response.status })
}
