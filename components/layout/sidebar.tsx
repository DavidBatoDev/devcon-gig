"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, User, MessageSquare, LogOut, Code2, Store } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Gig Matching", href: "/gigs", icon: Briefcase },
  { name: "Profile", href: "/profile", icon: User },
  { name: "AI Copilot", href: "/copilot", icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const isAppLight = ["/dashboard", "/marketplace", "/gigs", "/profile", "/copilot"].includes(pathname)

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r md:flex ${
        isAppLight ? "border-[#d8e2f2] bg-white" : "bg-background"
      }`}
    >
      <div className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ${isAppLight ? "border-[#d8e2f2]" : ""}`}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Code2 className={`h-6 w-6 ${isAppLight ? "text-[#1258e8]" : "text-primary"}`} />
          <span className={isAppLight ? "text-[#1d2c44]" : ""}>DEVCON GIG</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive
                    ? isAppLight
                      ? "bg-[#e9f1ff] text-[#1258e8]"
                      : "bg-muted text-primary"
                    : isAppLight
                      ? "text-[#5f7597] hover:bg-[#f3f7fd]"
                      : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className={`mt-auto border-t p-4 ${isAppLight ? "border-[#d8e2f2]" : ""}`}>
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            isAppLight
              ? "text-[#5f7597] hover:bg-[#f3f7fd] hover:text-[#1258e8]"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Link>
      </div>
    </aside>
  )
}
