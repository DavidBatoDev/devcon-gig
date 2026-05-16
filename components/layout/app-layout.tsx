"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSessionState } from "@/components/providers/session-provider"
import { usePathname } from "next/navigation"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { profile } = useSessionState()
  const isAppLight = ["/dashboard", "/marketplace", "/gigs", "/profile", "/copilot"].includes(pathname)
  const initials = (profile?.full_name || profile?.github_username || "DG")
    .split(" ")
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2)

  return (
    <div className={`flex min-h-screen w-full flex-col ${isAppLight ? "bg-[#eef2f7]" : "bg-muted/40"}`}>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-64">
        <header
          className={`sticky top-0 z-30 flex h-14 items-center gap-4 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ${
            isAppLight ? "border-b border-[#d8e2f2] bg-white" : "border-b bg-background"
          }`}
        >
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* Search or other topbar items can go here */}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:block">
              {profile?.full_name || profile?.github_username || "Developer"}
            </span>
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
