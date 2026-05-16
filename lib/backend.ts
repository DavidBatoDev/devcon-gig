import { cookies } from "next/headers"

export const ACCESS_TOKEN_COOKIE = "devcon_access_token"

function getBackendBaseUrl(): string {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000"
  ).replace(/\/$/, "")
}

export function getBackendUrl(path: string): string {
  return `${getBackendBaseUrl()}${path}`
}

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const store = await cookies()
  const token = store.get(ACCESS_TOKEN_COOKIE)?.value
  const headers = new Headers(init.headers)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  return fetch(getBackendUrl(path), {
    ...init,
    headers,
  })
}
