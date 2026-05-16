import { NextResponse } from "next/server"

import { apiFetch } from "@/lib/backend"

export async function POST(request: Request) {
  const form = await request.formData()
  const response = await apiFetch("/profile/generate", {
    method: "POST",
    body: form,
  })
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
