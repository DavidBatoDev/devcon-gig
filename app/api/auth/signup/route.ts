import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { ACCESS_TOKEN_COOKIE, getBackendUrl } from "@/lib/backend"

export async function POST(request: Request) {
  const body = await request.json()
  const response = await fetch(getBackendUrl("/auth/signup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status })
  }

  const accessToken = data?.session?.access_token
  if (accessToken) {
    const store = await cookies()
    store.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return NextResponse.json(data, { status: 200 })
}
